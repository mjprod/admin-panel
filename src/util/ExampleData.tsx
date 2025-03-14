import { LanguageProps } from "../components/language/Language";
import { TagColor } from "../components/tags/Tag";

export interface LanguageData {
  en: string;
  ms: string;
  cn: string;
}

export interface LanguageArrayData {
  en: string[];
  ms: string[];
  cn: string[];
}

export interface Question {
  text: string;
  variations: string[];
  intent: string;
  languages: LanguageData;
}

export interface Answer {
  detailed: LanguageData;
  conditions: string[];
}

export interface Metadata {
  category: string[];
  subCategory: string;
  difficulty: number;
  confidence: number;
  dateCreated: string;
  lastUpdated: string;
  version: string;
  source: string;
  status: string;
}

export interface Context {
  relatedTopics: string[];
  prerequisites: string[];
  followUpQuestions: LanguageArrayData;
}

export interface Usage {
  searchFrequency: number;
  successRate: number;
  lastQueried: string | null;
}

export interface Conversation {
  id: string;
  review_status: string[];
  question: Question;
  answer: Answer;
  metadata: Metadata;
  context: Context;
  usage: Usage;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  description?: string;
  colorCode: TagColor;
  colorDetails?: ColorTagDetails;
}

export interface ColorTagDetails {
  borderColor: string;
  lightColor: string;
  darkColor: string;
}

export const categoryOptions = [
  {
    value: "Thrdparty",
    label: "3rd Party",
  },
  {
    value: "FourDLotto",
    label: "4D Lotto",
  },
  {
    value: "Account",
    label: "Account",
  },
  {
    value: "Feedback",
    label: "Feedback",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "PointsShop",
    label: "Points Shop",
  },
  {
    value: "Referral",
    label: "Referral",
  },
  {
    value: "Security",
    label: "Security",
  },
  {
    value: "Technology",
    label: "Technology",
  },
];

export interface SubCategory {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
}

