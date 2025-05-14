import { AxiosResponse } from "axios";
import { Category, SubCategory } from "../util/ExampleData";
import { hexToHsla, updateHslaValues } from "../util/ExtensionFunction";
import { Endpoint } from "./contants";
import {
  ConversationKnowledge,
  KnowledgeResponse,
  KnowledgeSummary,
  ContextResponse,
  ContextAIResponse,
  TopicItem,
  EditablePair,
} from "./responsePayload/KnowledgeResponse";
import {
  apiDeleteRequest,
  apiGetRequest,
  apiPatchRequest,
  apiPostRequest,
  createPayload,
} from "./util/apiUtils";
import { AuthResponse, UserResponse } from "./responsePayload/AuthResponse";
import { mapKnowledgeConversationData } from "./util/responseMap";
import { BrainItem, BrainResponse } from "./responsePayload/BrainResponse";
import { ChatbotResponse } from "./responsePayload/ChatbotResponse";
/* eslint-disable complexity */

export const AllConversation = async (
  languageCode: string,
  endpoint: string | undefined = Endpoint.Knowledge,
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<ConversationKnowledge | null> => {
  const apiResponse = await apiGetRequest<KnowledgeResponse>(
    endpoint,
    pathVariables,
    queryParams
  );

  if (!apiResponse) {
    throw new Error("Failed to fetch data from the API.");
  }

  return mapKnowledgeConversationData(languageCode, apiResponse);
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

export const KowledgeContentBulkCreate = async (data: {
  [key: number]: EditablePair[];
}): Promise<AxiosResponse | null> => {
  const result = Object.entries(data).flatMap(([contextId, items]) =>
    items
      .filter((item) => item.selected)
      .map((item) => ({
        context: Number(contextId),
        category: item.category_id,
        subcategory: item.subcategory_id,
        type: 1,
        question: item.question,
        answer: item.answer,
        content: "",
      }))
  );
  const basePayload = {
    knowledge_content_list: result,
  };

  const payload = createPayload(basePayload);
  try {
    const res: AxiosResponse | null = await apiPostRequest(
      Endpoint.KowledgeContentBulkCreate,
      payload
    );

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

export const GetUser = async (): Promise<UserResponse | undefined> => {
  return await apiGetRequest<UserResponse>(Endpoint.User);
};

export const Logout = async (
  refreshToken: string
): Promise<AxiosResponse | null> => {
  const basePayload = {
    refresh: refreshToken,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest(Endpoint.Logout, payload);
};

export const GetContext = async (
  endpoint: string | undefined = Endpoint.Context
): Promise<ContextResponse | undefined> => {
  return await apiGetRequest<ContextResponse>(endpoint, { status: 1 });
};

export const DeleteContext = async (
  contextId: number
): Promise<AxiosResponse | null> => {
  return await apiDeleteRequest(Endpoint.ContextDelete, {
    id: contextId,
  });
};

export const GetContextAI = async (
  contextId: number
): Promise<TopicItem[] | undefined> => {
  const res = await apiGetRequest<ContextAIResponse>(Endpoint.ContextAI, {
    id: contextId,
  });
  return res?.topics;
};

export const GetBrain = async (
  endpoint: string | undefined = Endpoint.Brain,
  brainId: number | undefined = undefined
): Promise<BrainResponse | undefined> => {
  return await apiGetRequest<BrainResponse>(endpoint, {
    id: brainId,
  });
};

export const GetBrainId = async (
  brainId: number | undefined = undefined
): Promise<BrainItem | undefined> => {
  try {
    return await apiGetRequest<BrainItem>(Endpoint.Brain, {
      id: brainId,
    });
  } catch {
    return undefined;
  }
};

export const RagChat = async (
  message: string,
  threadId: string,
  memberId: string,
  teamId: string
): Promise<ChatbotResponse | null> => {
  const basePayload = {
    message: message,
    thread_id: threadId,
    member_id: memberId,
    team_id: teamId,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest<ChatbotResponse>(Endpoint.Ragchat, payload);
};

export const SearchBrain = async (
  endpoint: string | undefined = Endpoint.BrainSearch,
  queryParams: Record<string, any> = {}
): Promise<BrainResponse | undefined> => {
  return await apiGetRequest<BrainResponse>(endpoint, {}, queryParams);
};

export const BrainBulkDelete = async (
  ids: number[]
): Promise<AxiosResponse | null> => {
  const basePayload = {
    knowledge_content_ids: ids,
  };

  const payload = createPayload(basePayload);
  return await apiPostRequest(Endpoint.BrainBulkRemove, payload);
};
