import { LanguageProps } from "../../components/language/Language";
import { Category, SubCategory } from "../../util/ExampleData";

export interface KnowledgeContent {
  id: number;
  status: number;
  is_edited: boolean;
  in_brain: boolean;
  language: number;
  date_created: string;
  last_updated: string;
  question: string;
  answer: string;
  content: string | null;
  knowledge: number;
}

export interface KnowledgeItem {
  id: number;
  knowledge_uuid: string;
  category: Category | null;
  subcategory: SubCategory | null;
  type: string;
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


export interface ConversationKnowledge {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  data: KnowledgeCard[]
}

export interface KnowledgeCard {
  knowledgeId: number,
  id: number;
  dateTime: string;
  conversationId: string;
  category: Category | null;
  languages: LanguageProps[];
  currentlang: LanguageProps;
  subcategories: SubCategory | null;
  question: string;
  answer: string;
  status: KnowledgeStatus;
  isEdited?: boolean;
  inBrain?: boolean;
  isSelected?: boolean;
  onSelected?: (conversationId: string, checked: boolean) => void;
}

export enum KnowledgeStatus {
  NeedReview = 1,
  PreApproved = 2,
  Approved = 3,
  Rejected = 4
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