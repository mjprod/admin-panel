import { ChatDialogProps } from "../../components/popUp/popUpChatHistory/ChatDialog";
import { Category, SubCategory } from "../../util/ExampleData";

//api response
export interface KnowledgeContent {
  id: number;
  status: number;
  is_edited: boolean;
  in_brain: boolean;
  language: number;
  date_created: string;
  last_updated: string;
  question: string | null;
  answer: string;
  content: string | null;
  knowledge: number;
}

export interface ContextItem {
  id: number;
  context: string;
  date_created: string;
  status: number;
}

export interface KnowledgeItem {
  id: number;
  knowledge_uuid: string;
  category: Category | null;
  subcategory: SubCategory | null;
  type: number;
  context: ContextItem | null;
  knowledge_content: KnowledgeContent[];
}

export interface KnowledgeResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: KnowledgeItem[];
}

export interface ChatResponse {
  ChatId: number;
  UserMsg: string;
  RobotMsg: string;
  AdminReply: string;
  ReplyChatId: number;
  ImgUrl: string;
  CreateDate: string;
  ConversationId: string;
  IsService: boolean;
  AdminAction: number;
}


//view model
export interface KnowledgeContext {
  conversationId: string;
  date_time: string;
  chat_data: ChatDialogProps[];
}

export interface ConversationKnowledge {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  data: KnowledgeCard[]
}

export interface KnowledgeCard {
  knowledgeId: number;
  id: number;
  dateTime: string;
  conversationId: string;
  category: Category | null;
  subcategories: SubCategory | null;
  question: string | null;
  answer: string;
  status: KnowledgeStatus;
  isEdited?: boolean;
  inBrain?: boolean;
  isSelected?: boolean;
  onSelected?: (conversationId: string, checked: boolean) => void;
  context: KnowledgeContext | null;
}

export enum KnowledgeStatus {
  NeedReview = 1,
  PreApproved = 2,
  Approved = 3,
  Rejected = 4
}

export interface LanguageCode {
  label: string;
  id: number;
  code: string;
}

export const Language = {
  ENGLISH: { label: "English", id: 1, code: "en" },
  MALAYSIAN: { label: "Malaysian", id: 2, code: "ms" },
  CHINESE: { label: "Chinese", id: 3, code: "cn" },
} as const;

export interface KnowledgeSummary {
  categories: CategorySummary[]
}

export interface CategorySummary {
  id: number,
  name: string,
  knowledge_count: number
}

//context
export interface ContextResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: ContextItem[];
}

export interface TopicItem {
  id: number
  question: string
  answer: string
  category_id: number
  subcategory_id: number
}

export interface ContextAIResponse {
  topics: TopicItem[]
}

export interface EditablePair extends TopicItem {
  selected: boolean;
  question: string;
  answer: string;
  category_id: number;
  subcategory_id: number;
}
