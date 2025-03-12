import { Endpoint } from "./contants";
import { KnowledgeResponse } from "./responsePayload/KnowledgeResponse";
import {
  apiDeleteRequest,
  apiGetRequest,
  apiPostRequest,
  createPayload,
} from "./util/apiUtils";

export const UpdateKnowledge = async (id: string): Promise<string | null> => {
  const basePayload = {
    conversation_id: id,
  };
  const payload = createPayload(basePayload);

  return await apiPostRequest<string>(Endpoint.UpdateKnowledge, payload);
};

export const AllConversation = async (
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<KnowledgeResponse | null> => {
  const isMock = true;

  if (isMock) {
    const response = await fetch("/assets/conversations.json");
    if (!response.ok) {
      throw new Error("Failed to load mock data");
    }
    return await response.json();
  } else {
    return await apiGetRequest<KnowledgeResponse>(
      Endpoint.Knowledge,
      pathVariables,
      queryParams 
    );
  }
};

export const AddLanguageReviewed = async (
  docId: string,
  reviewLanguage: string,
  reviewText: string
): Promise<string | null> => {
  const basePayload = {
    doc_id: docId,
    review_status: reviewLanguage,
    review_text: reviewText,
  };

  const payload = createPayload(basePayload);

  return await apiPostRequest<string>(Endpoint.AddLanguageReviewed, payload);
};

export const DeleteSessionId = async (
  id: string
): Promise<Record<string, any>[] | null> => {
  const basePayload = {
    id: id,
  };

  return await apiDeleteRequest<Record<string, any>[]>(
    Endpoint.DeleteSessionId,
    basePayload
  );
};
