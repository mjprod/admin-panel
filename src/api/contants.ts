//API Domain Name
import { showConsoleMessage } from "../util/ConsoleMessage";
import { Language } from "./responsePayload/KnowledgeResponse";

// export const apiDomainName = "api-staging.mjproapps.com/api";
// export const BASE_URI = `https://${apiDomainName}`;

export const apiDomainName = "localhost:8000/api";
export const BASE_URI = `http://${apiDomainName}`;

export const getBaseUri = () => {
  showConsoleMessage("Using Default API URL:", BASE_URI);
  return BASE_URI;
};

export const Endpoint = {
  Knowledge: `${getBaseUri()}/knowledge`,

  KnowledgeContent: `${getBaseUri()}/knowledge-content/{id}/`,
  KnowledgeContentBulkUpdateStatus: `${getBaseUri()}/knowledge-content/bulk-update-status/`,
  KnowledgeContentBulkDelete: `${getBaseUri()}/knowledge-content/bulk-delete/`,
  KowledgeContentBulkCreate: `${getBaseUri()}/knowledge-content/bulk-create/`,

  Brain: `${getBaseUri()}/brain/{id}`,
  BrainSearch: `${getBaseUri()}/brain/search/`,
  BrainKnowledgeBulkUpdate: `${getBaseUri()}/brain/bulk-add-to-brain/`,
  BrainBulkRemove: `${getBaseUri()}/brain/bulk-remove-from-brain/`,

  KnowledgeSummary: `${getBaseUri()}/knowledge-summary/`,
  Context: `${getBaseUri()}/context/`,
  ContextDelete: `${getBaseUri()}/context/{id}/`,
  ContextAI: `${getBaseUri()}/context-ai/{id}/`,

  Category: `${getBaseUri()}/categories/`,
  SubCategory: `${getBaseUri()}/subcategories/`,
  CreateKnowledge: `${getBaseUri()}/knowledge-content/`,

  Ragchat: `${getBaseUri()}/rag-chat/`,

  Login: `${getBaseUri()}/login/`,
  Refresh: `${getBaseUri()}/refresh/`,
  User: `${getBaseUri()}/user/`,
  Logout: `${getBaseUri()}/logout/`,
};

//API Constants
export const notificationToken = String(
  process.env.REACT_APP_NOTIFICATION_TOKEN
);
export const sha256Salt = String(process.env.REACT_APP_SHA256SALT);
export const secretKey = String(process.env.REACT_APP_SECRET_KEY);
export const apiKey = String(process.env.REACT_APP_API_KEY || "");

export const defaultLanguage = Language.ENGLISH;
