import { Conversation } from "../util/ExampleData";
import { Endpoint } from "./contants";
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

export const AllConversation = async (): Promise<Conversation[] | null> => {
  const basePayload = {};
  const isMock = false;
  if (isMock) {
    const response = await fetch("/assets/conversations.json");
    if (!response.ok) {
      throw new Error("Failed to load mock data");
    }
    return await response.json();
  } else {
    return await apiGetRequest<Conversation[]>(
      Endpoint.ListReviewUpdateBrain,
      basePayload
    );
  }
};

export const AddLanguageReviewed = async (
  docId: string,
  reviewLanguage: string
): Promise<string | null> => {
  const basePayload = {
    doc_id: docId,
    review_status: reviewLanguage,
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
