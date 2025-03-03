//API Domain Name
import { showConsoleMessage } from "../util/ConsoleMessage";
export const apiDomainName = "api-staging.mjproapps.com/api";
//export const apiDomainName = "127.0.0.1:8000/api";

export const BASE_URI = `https://${apiDomainName}`;

export const getBaseUri = () => {
  showConsoleMessage("Using Default API URL:", BASE_URI);
  return BASE_URI;
};

export const Endpoint = {
  ListReviewUpdateBrain: `${getBaseUri()}/list_review_update_brain/`,
  AddLanguageReviewed: `${getBaseUri()}/update_review_status/`,

  //API Endpoints not used in the project
  DeleteSessionId: `${getBaseUri()}/delete_conversation/{id}`,
  FinaliseConversation: `${getBaseUri()}/finalise_conversation/`,
  FinaliseAllConversation: `${getBaseUri()}/finalise_all_conversation/`,
  CategorizeConversation: `${getBaseUri()}/categorize_conversation/`,
  UpdateKnowledge: `${getBaseUri()}/update_knowledge/`,
  DashboardCount: `${getBaseUri()}/dashboard_counts/`,
};

//API Constants
export const notificationToken = String(
  process.env.REACT_APP_NOTIFICATION_TOKEN
);
export const sha256Salt = String(process.env.REACT_APP_SHA256SALT);
export const secretKey = String(process.env.REACT_APP_SECRET_KEY);
export const apiKey = String(process.env.REACT_APP_API_KEY || "");
