import { AxiosResponse } from "axios";
import { Category, SubCategory } from "../util/ExampleData";
import { hexToHsla, updateHslaValues } from "../util/ExtensionFunction";
import { Endpoint } from "./contants";
import {
  ConversationKnowledge,
  KnowledgeResponse,
  KnowledgeSummary,
  KnowledgeContext,
  ContextItem,
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
  mapKnowledgeConversationData,
  mapToKnowledgeContext,
} from "./util/responseMaps";
import store from "../store/store";
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
    return null;
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
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<KnowledgeSummary | undefined> => {
  const language = store.getState().language.language
  const query = {
    in_brain: false,
    ...{ queryParams },
    ...{ language: language.id },
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

export const GetContext = async (): Promise<KnowledgeContext[]> => {
  const response = await apiGetRequest<ContextItem[]>(Endpoint.Context);
  if (!response) {
    return [];
  }
  return response
    .map((item) => mapToKnowledgeContext(item.context, "", ""))
    .filter((item): item is KnowledgeContext => item !== null);
};
