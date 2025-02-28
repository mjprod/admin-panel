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

export const ListReviewUpdateBrain = async (
  prompt: string
): Promise<Record<string, any>[] | null> => {
  const basePayload = {
    prompt: prompt,
  };

  return await apiGetRequest<Record<string, any>[]>(
    Endpoint.ListReviewUpdateBrain,
    basePayload
  );
};

export const AllConversation = async (): //prompt: string
Promise<Conversation[] | null> => {
  const basePayload = {
    //prompt: prompt,
  };
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
