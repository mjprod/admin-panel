import { AxiosResponse } from "axios";
import {
  showConsoleError,
  showConsoleMessage,
} from "../../util/ConsoleMessage";
import { Request } from "../axios-config";

export const createPayload = <T>(basePayload: T): string => {
  const payload = { ...basePayload };
  return JSON.stringify(payload);
};

export const apiPostRequest = async <T>(
  endpoint: string,
  payload: string,
  headers?: Record<string, string>
): Promise<T | null> => {
  try {
    const mergedHeaders = {
      ...headers,
    };

    const response = await Request.post(endpoint, payload, {
      headers: mergedHeaders,
    });
    return response.data as T;
  } catch (error: any) {
    showConsoleError("Axios Error: ", error.data.error);
    return Promise.reject(error);
  }
};

export const apiGetRequest = async <T>(
  endpoint: string,
  pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}
): Promise<T | undefined> => {
  Object.keys(pathVariables).forEach((key) => {
    endpoint = endpoint.replace(
      `{${key}}`,
      pathVariables[key] ? encodeURIComponent(pathVariables[key]) : ""
    );
  });

  try {
    const response = await Request.get(endpoint, { params: queryParams });
    showConsoleMessage("Axios response: ", response.data);

    return response.data as T;
  } catch (error: any) {
    showConsoleMessage(
      "Axios Error: ",
      error.response?.data?.error || error.message
    );
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

export const apiPatchRequest = async (
  endpoint: string,
  pathVariables: Record<string, any> = {},
  payload: string
): Promise<AxiosResponse | null> => {
  Object.keys(pathVariables).forEach((key) => {
    endpoint = endpoint.replace(
      `{${key}}`,
      encodeURIComponent(pathVariables[key])
    );
  });

  try {
    const response = await Request.patch(endpoint, payload);
    return response;
  } catch (error: any) {
    showConsoleError("Axios Patch Error: ", error);
    return Promise.reject(error);
  }
};
