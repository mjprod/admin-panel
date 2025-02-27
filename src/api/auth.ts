import { Endpoint } from "./contants";
import {
  apiPostRequest,
  createPayload,
  apiGetRequest,
  apiDeleteRequest,
} from "./util/apiUtils";


export const UpdateKnowledge = async (
  id: string,
): Promise<string | null> => {
  const basePayload = {
    "conversation_id": id,
  }
  const payload = createPayload(
    basePayload
  );

  return await apiPostRequest<string>(Endpoint.UpdateKnowledge, payload);
};


export const AllConversationIds = async (
  prompt: string,
): Promise<Record<string, any>[] | null> => {
  const basePayload = {
    "prompt": prompt,
  }

  return await apiGetRequest<Record<string, any>[]>(Endpoint.AllConversationIds, basePayload);
};


export const DeleteSessionId = async (
  id: string,
): Promise<Record<string, any>[] | null> => {
  const basePayload = {
    "id": id,
  }

  return await apiDeleteRequest<Record<string, any>[]>(Endpoint.DeleteSessionId, basePayload);
};