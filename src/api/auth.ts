import { AxiosResponse } from "axios";
import { LanguageProps } from "../components/language/Language";
import { Category, SubCategory } from "../util/ExampleData";
import {
  getLanguageByCode,
  getLanguageById,
  hexToHsla,
  updateHslaValues,
} from "../util/ExtensionFunction";
import { Endpoint } from "./contants";
import {
  ConversationKnowledge,
  KnowledgeStatus,
  KnowledgeCard,
  KnowledgeResponse,
  KnowledgeSummary,
  ChatResponse,
  KnowledgeContext,
} from "./responsePayload/KnowledgeResponse";
import {
  apiDeleteRequest,
  apiGetRequest,
  apiPatchRequest,
  apiPostRequest,
  createPayload,
} from "./util/apiUtils";
import { AuthResponse, UserResponse } from "./responsePayload/AuthResponse";
import {
  ChatDialogProps,
  ChatType,
} from "../components/popUp/popUpChatHistory/ChatDialog";
/* eslint-disable complexity */

export const AllConversation = async (
  languageCode: string,
  endpoint: string | undefined = Endpoint.Knowledge,
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<ConversationKnowledge | null> => {
  const isMock = false;

  try {
    if (isMock) {
      const response = await fetch("/assets/conversations.json");

      if (!response.ok) {
        throw new Error("Failed to load mock data: " + response.statusText);
      }
      const data = await response.json();
      return mapKnowledgeConversationData(languageCode, data);
    } else {
      const apiResponse = await apiGetRequest<KnowledgeResponse>(
        endpoint,
        pathVariables,
        queryParams
      );

      if (!apiResponse) {
        throw new Error("Failed to fetch data from the API.");
      }

      return mapKnowledgeConversationData(languageCode, apiResponse);
    }
  } catch (error) {
    console.error("Error in AllConversation:", error);
    return null;
  }
};

const mapKnowledgeConversationData = (
  languageCode: string,
  response: KnowledgeResponse
): ConversationKnowledge => {
  const knowledgeinfo: KnowledgeCard[] = [];
  response.results.map((item) => {
    const knowledgeContent = item.knowledge_content.find(
      (con) => con.language == getLanguageByCode(languageCode).id
    );

    const langStatus: LanguageProps[] = item.knowledge_content.map((lang) => ({
      id: lang.language,
      lang: getLanguageById(lang.language),
      langLabel: getLanguageById(lang.language).label,
      isSolid: lang.language == getLanguageByCode(languageCode).id,
      isCompleted: lang.status == KnowledgeStatus.Approved,
      status: KnowledgeStatus[lang.status],
    }));

    if (knowledgeContent != null) {
      const status: KnowledgeStatus = (() => {
        switch (knowledgeContent.status) {
          case 1:
            return KnowledgeStatus.NeedReview;
          case 2:
            return KnowledgeStatus.PreApproved;
          case 3:
            return KnowledgeStatus.Approved;
          case 4:
            return KnowledgeStatus.Rejected;
          default:
            return KnowledgeStatus.Approved;
        }
      })();

      const lang: LanguageProps = {
        id: knowledgeContent.language,
        lang: getLanguageById(knowledgeContent.language),
        langLabel: getLanguageById(knowledgeContent.language).label,
        isSolid:
          knowledgeContent.language == getLanguageByCode(languageCode).id,
        isCompleted: knowledgeContent.status == KnowledgeStatus.Approved,
        status: KnowledgeStatus[knowledgeContent.status],
      };

      const categories: Category | null = item.category
        ? {
            id: item.category.id,
            name: item.category.name,
            color: item.category.color,
            description: item.category.description,
            colorDetails: {
              borderColor: updateHslaValues(
                hexToHsla(item.category.color),
                25,
                90
              ),
              lightColor: hexToHsla(item.category.color),
              darkColor: updateHslaValues(
                hexToHsla(item.category.color),
                86,
                30
              ),
            },
          }
        : null;

      const cleanedStr = (item.context?.context ?? "")
        .replace(/'(\w+)'(?=\s*:)/g, '"$1"')
        .replace(/:\s*'([^']*)'/g, ': "$1"')
        .replace(
          /"(\w+)": \\"([^"]*?)\\"/g,
          (_, key, value) => `"${key}": "${value}"`
        )
        .replace(/\bTrue\b/g, "true")
        .replace(/\bFalse\b/g, "false");

      let contextJsonArray: ChatResponse[] = [];
      try {
        contextJsonArray =
          !cleanedStr || cleanedStr.trim() === "" || cleanedStr === "[]"
            ? []
            : JSON.parse(cleanedStr);
      } catch (error) {
        console.error(
          "JSON parse error:",
          error,
          "\n\nCleaned string\n\n",
          cleanedStr,
          "\n\nOriginal string:\n\n",
          item.context?.context
        );
        contextJsonArray = [];
      }
      const chatData: ChatDialogProps[] = contextJsonArray.map((chat) => {
        const message = chat.IsService
          ? chat.AdminAction == 2
            ? chat.RobotMsg
            : chat.AdminReply
          : chat.UserMsg;
        return {
          id: chat.ChatId,
          type: chat.IsService ? ChatType.CustomerSupport : ChatType.User,
          datetime: chat.CreateDate,
          message: message,
          isActive: chat.IsService
            ? knowledgeContent.answer == message
            : knowledgeContent.question == message,
        };
      });

      const context: KnowledgeContext = {
        conversationId:
          contextJsonArray.length > 0 ? contextJsonArray[0].ConversationId : "",
        date_time:
          contextJsonArray.length > 0 ? contextJsonArray[0].CreateDate : "",
        chat_data: chatData,
      };

      knowledgeinfo.push({
        knowledgeId: item.id,
        conversationId: item.knowledge_uuid,
        category: categories ? categories : null,
        subcategories: item.subcategory ? item.subcategory : null,
        id: knowledgeContent.id,
        dateTime: knowledgeContent.last_updated,
        languages: langStatus,
        currentlang: lang,
        question: knowledgeContent.question,
        answer: knowledgeContent.answer,
        isEdited: knowledgeContent.is_edited,
        inBrain: knowledgeContent.in_brain,
        status: status,
        context: contextJsonArray.length > 0 ? context : null,
      });
    }
  });

  return {
    count: response.count,
    total_pages: response.total_pages,
    current_page: response.current_page,
    next: response.next,
    previous: response.previous,
    data: knowledgeinfo,
  };
};

export const KowledgeContentStatusPatch = async (
  id: number,
  updatedQuestion: string = "",
  updatedAnswer: string = ""
): Promise<AxiosResponse | null> => {
  const basePayload = {
    ...(updatedQuestion && { question: updatedQuestion }),
    ...(updatedAnswer && { answer: updatedAnswer }),
  };
  const payload = createPayload(basePayload);
  return await apiPatchRequest(Endpoint.KnowledgeContent, { id: id }, payload);
};

export const KowledgeContentBulkUpdateStatus = async (
  ids: number[],
  status: number
): Promise<AxiosResponse | null> => {
  const basePayload = {
    knowledge_content_ids: ids,
    new_status: status,
  };

  const payload = createPayload(basePayload);
  try {
    const res: AxiosResponse | null = await apiPostRequest(
      Endpoint.KnowledgeContentBulkUpdateStatus,
      payload
    );

    if (status == 3) {
      await UpdateBrainKnowledge(ids);
    }
    return res;
  } catch (error) {
    console.error("Error during bulk update:", error);

    return null;
  }
};

export const UpdateBrainKnowledge = async (
  ids: number[]
): Promise<AxiosResponse | null> => {
  const basePayload = {
    knowledge_content_ids: ids,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest(Endpoint.BrainKnowledgeBulkUpdate, payload);
};

export const KowledgeContentDelete = async (
  id: number
): Promise<AxiosResponse | null> => {
  return await apiDeleteRequest(Endpoint.KnowledgeContent, { id: id });
};

export const KowledgeContentBulkDelete = async (
  ids: number[]
): Promise<AxiosResponse | null> => {
  const basePayload = {
    ids: ids,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest(Endpoint.KnowledgeContentBulkDelete, payload);
};

export const getAllCategories = async (): Promise<Category[] | undefined> => {
  try {
    const res = await apiGetRequest<Category[]>(Endpoint.Category);
    res?.map((data) => {
      if (data.color) {
        data.colorDetails = {
          borderColor: updateHslaValues(hexToHsla(data.color), 25, 90),
          lightColor: hexToHsla(data.color),
          darkColor: updateHslaValues(hexToHsla(data.color), 86, 30),
        };
      }
    });
    return res;
  } catch (error) {
    console.error("Error in All Categories:", error);
    return undefined;
  }
};

export const getSubCategories = async (
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<SubCategory[] | undefined> => {
  try {
    return await apiGetRequest<SubCategory[]>(
      Endpoint.SubCategory,
      pathVariables,
      queryParams
    );
  } catch (error) {
    console.error("Error in All Categories:", error);
    return undefined;
  }
};

export const CreateKnowledge = async (
  categoryId: number,
  subCategoryId: number,
  language: number,
  question: string,
  answer: string
): Promise<AxiosResponse | null> => {
  const basePayload = {
    category: categoryId,
    subcategory: subCategoryId,
    language: language,
    question: question,
    answer: answer,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest(Endpoint.CreateKnowledge, payload);
};

export const KowledgeSummary = async (
  languageId: number,
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<KnowledgeSummary | undefined> => {
  const query = {
    in_brain: false,
    ...{ queryParams },
    ...{ language: languageId },
  };
  return await apiGetRequest<KnowledgeSummary>(
    Endpoint.KnowledgeSummary,
    pathVariables,
    query
  );
};

export const Login = async (
  username: string,
  password: string
): Promise<AuthResponse | null> => {
  const basePayload = {
    username: username,
    password: password,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest<AuthResponse>(Endpoint.Login, payload);
};

export const GetUser = async (

): Promise<UserResponse | undefined> => {
  return await apiGetRequest<UserResponse>(Endpoint.User);
};

export const Logout = async (
  refreshToken: string,
): Promise<AxiosResponse | null> => {
  const basePayload = {
    refresh: refreshToken,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest(Endpoint.Logout, payload);
};
