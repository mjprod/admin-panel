//API Domain Name
import { showConsoleMessage } from "../util/ConsoleMessage";
import { Language } from "./responsePayload/KnowledgeResponse";

// export const apiDomainName = "api-staging.mjproapps.com/api";
// export const BASE_URI = `https://${apiDomainName}`;

export const apiDomainName = "api.mjproapps.com/api";
export const BASE_URI = `https://${apiDomainName}`;

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
  knowledgeContentUpdateReject: `${getBaseUri()}/knowledge-content/update-to-reject/`,
  KnowledgeContentCheckSimilarKnowledge: `${getBaseUri()}/knowledge-content/check-similar-knowledge/`,

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

  Prompt: `${getBaseUri()}/prompt/`,
  PromptPatch: `${getBaseUri()}/prompt/{id}`,
  PromptBathDefaultUpdate: `${getBaseUri()}/prompt/bulk-reset-defaults/`,
};

//API Constants
export const notificationToken = String(
  process.env.REACT_APP_NOTIFICATION_TOKEN
);
export const sha256Salt = String(process.env.REACT_APP_SHA256SALT);
export const secretKey = String(process.env.REACT_APP_SECRET_KEY);
export const apiKey = String(process.env.REACT_APP_API_KEY || "");

export const ragKey = String(process.env.REACT_APP_RAG_API_KEY);
export const ragMemberSecretKey = String(
  process.env.REACT_APP_RAG_MEMBER_SECRET_KEY
);
export const defaultLanguage = Language.ENGLISH;
