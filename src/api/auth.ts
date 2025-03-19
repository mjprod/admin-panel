import { AxiosResponse } from "axios";
import { LanguageProps } from "../components/language/Language";
import { Category, SubCategory } from "../util/ExampleData";
import {
  getLanguageByCode,
  getLanguageById,
  hexToHsla,
  updateHslaValues,
} from "../util/ExtensionFunction";
import {
  DEFAULT_LANGUAGE_CODE,
  DEFAULT_LANGUAGE_ID,
  Endpoint,
} from "./contants";
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
import { ChatDialogProps, ChatType } from "../components/popUp/ChatDialog";

export const AllConversation = async (
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
      return mapKnowledgeConversationData(data);
    } else {
      const apiResponse = await apiGetRequest<KnowledgeResponse>(
        endpoint,
        pathVariables,
        queryParams
      );

      if (!apiResponse) {
        throw new Error("Failed to fetch data from the API.");
      }

      return mapKnowledgeConversationData(apiResponse);
    }
  } catch (error) {
    console.error("Error in AllConversation:", error);
    return null;
  }
};

const mapKnowledgeConversationData = (
  response: KnowledgeResponse
): ConversationKnowledge => {
  const knowledgeinfo: KnowledgeCard[] = [];
  response.results.map((item) => {
    const knowledgeContent = item.knowledge_content.find(
      (con) => con.language == getLanguageByCode(DEFAULT_LANGUAGE_CODE).id
    );

    const langStatus: LanguageProps[] = item.knowledge_content.map((lang) => ({
      id: lang.language,
      lang: getLanguageById(lang.language).code,
      langLabel: getLanguageById(lang.language).label,
      isSolid: lang.language == getLanguageByCode(DEFAULT_LANGUAGE_CODE).id,
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
        lang: getLanguageById(knowledgeContent.language).code,
        langLabel: getLanguageById(knowledgeContent.language).label,
        isSolid:
          knowledgeContent.language ==
          getLanguageByCode(DEFAULT_LANGUAGE_CODE).id,
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
        .replace(/'/g, '"')
        .replace(/\bTrue\b/g, "true")
        .replace(/\bFalse\b/g, "false");

      let contextJsonArray: ChatResponse[] = [];
      try {
        contextJsonArray = JSON.parse(cleanedStr);
      } catch (error) {
        console.error(
          "JSON parse error:",
          error,
          "Original string:",
          cleanedStr
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
  status: number,
  updatedQuestion: string = "",
  updatedAnswer: string = ""
): Promise<AxiosResponse | null> => {
  const basePayload = {
    status: status,
    ...(updatedQuestion && { question: updatedQuestion }),
    ...(updatedAnswer && { answer: updatedAnswer }),
  };
  const payload = createPayload(basePayload);
  return await apiPatchRequest(Endpoint.KnowledgeContent, { id: id }, payload);
};

export const KowledgeContentBulkUpdate = async (
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
      Endpoint.KnowledgeContentBulkUpdate,
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

export const getAllCategories = async (): Promise<Category[] | null> => {
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
    return null;
  }
};

export const getSubCategories = async (
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<SubCategory[] | null> => {
  try {
    return await apiGetRequest<SubCategory[]>(
      Endpoint.SubCategory,
      pathVariables,
      queryParams
    );
  } catch (error) {
    console.error("Error in All Categories:", error);
    return null;
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
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<KnowledgeSummary | null> => {
  const query = {
    in_brain: false,
    ...{ queryParams },
    ...{ language: DEFAULT_LANGUAGE_ID },
  };
  return await apiGetRequest<KnowledgeSummary>(
    Endpoint.KnowledgeSummary,
    pathVariables,
    query
  );
};
