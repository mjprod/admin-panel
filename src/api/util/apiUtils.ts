import { showConsoleError } from "../../util/ConsoleMessage";
import { Request } from "../axios-config";

// export interface APIResponse<T> {
//   ResponseCode: number;
//   ResponseData: T;
//   session_id: string;
// }

export const createPayload = <T>(basePayload: T): string => {
  const payload = { ...basePayload };
  return JSON.stringify(payload);
};

export const apiPostRequest = async <T>(
  endpoint: string,
  payload: string
): Promise<T | null> => {
  try {
    const response = await Request.post(endpoint, payload);
    return response.data as T;
  } catch (error: any) {
    showConsoleError("Axios Error: ", error.data.error);
    return Promise.reject(error);
  }
};

export const apiGetRequest = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T | null> => {
  try {
    const response = await Request.get(endpoint, { params });
    return response.data as T;
  } catch (error: any) {
    showConsoleError("Axios Error: ", error.data.error);
    return Promise.reject(error);
  }
};

export const apiDeleteRequest = async <T>(
  endpoint: string,
  pathVariables: Record<string, any> = {},
  payload: string | null = null
): Promise<T | null> => {
  Object.keys(pathVariables).forEach((key) => {
    endpoint = endpoint.replace(
      `{${key}}`,
      encodeURIComponent(pathVariables[key])
    );
  });
  try {
    const response = await Request.delete(endpoint, { params: payload });
    return response.data as T;
  } catch (error: any) {
    showConsoleError("Axios Error: ", error.data.error);
    return Promise.reject(error);
  }
};
