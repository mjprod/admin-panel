//API Domain Name
import { showConsoleMessage } from "../util/ConsoleMessage";
export const apiDomainName = "api-staging.mjproapps.com/api";
//export const apiDomainName = "localhost:8000/api";
//export const apiDomainName = "13.236.193.147:8000/api";
export const BASE_URI = `https://${apiDomainName}`;

export const getBaseUri = () => {
  showConsoleMessage("Using Default API URL:", BASE_URI);
  return BASE_URI;
};

export const Endpoint = {
  Knowledge: `${getBaseUri()}/knowledge`,
  KnowledgeContent: `${getBaseUri()}/knowledge-content/{id}/`,
  KnowledgeContentBulkUpdate: `${getBaseUri()}/knowledge-content/bulk-update-status/`,
  BrainKnowledgeBulkUpdate: `${getBaseUri()}/brain/bulk-add-to-brain/`,
  KnowledgeContentBulkDelete: `${getBaseUri()}/knowledge-content/bulk-delete/`,
  KnowledgeSummary: `${getBaseUri()}/knowledge-summary/`,

  Category: `${getBaseUri()}/categories/`,
  SubCategory: `${getBaseUri()}/subcategories/`,
  CreateKnowledge: `${getBaseUri()}/knowledge-content/`,
};

//API Constants
export const notificationToken = String(
  process.env.REACT_APP_NOTIFICATION_TOKEN
);
export const sha256Salt = String(process.env.REACT_APP_SHA256SALT);
export const secretKey = String(process.env.REACT_APP_SECRET_KEY);
export const apiKey = String(process.env.REACT_APP_API_KEY || "");

export const DEFAULT_LANGUAGE_CODE = "cn";
export const DEFAULT_LANGUAGE_ID = 3;
