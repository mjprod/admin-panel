import {
  KnowledegeStatus,
  KnowledgeCard,
} from "../api/responsePayload/KnowledgeResponse";
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

export const languages: LanguageProps[] = [
  {
    lang: "MY",
    isSolid: true,
  },
  {
    lang: "CN",
  },
  {
    lang: "EN",
    isCompleted: true,
  },
];

export interface Category {
  id: number;
  title: string;
  colorCode: TagColor;
}

export interface SubCategory {
  id: number;
  title: string;
  description?: string;
  categoryId: number;
}

export const needApprovalConvs: KnowledgeCard[] = [
  {
    knowledgeId: 1,
    id: 1,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda1",
    category: { id: 1, title: "Account", colorCode: TagColor.PURPLE },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 1, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.NeedReview,
    inBrain: false,
  },
  {
    knowledgeId: 2,
    id: 2,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda2",
    category: { id: 2, title: "Technology", colorCode: TagColor.GOLDISH },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 2, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.NeedReview,
    inBrain: false,
  },
  {
    knowledgeId: 3,
    id: 3,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda3",
    category: { id: 3, title: "4D", colorCode: TagColor.PINK },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 3, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.NeedReview,
    inBrain: false,
  },
];

export const approvedConvs: KnowledgeCard[] = [
  {
    knowledgeId: 4,
    id: 1,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda4",
    category: { id: 1, title: "Account", colorCode: TagColor.PURPLE },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 1, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.PreApproved,
    isEdited: true,
    inBrain: false,
  },
  {
    knowledgeId: 5,
    id: 2,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda5",
    category: { id: 2, title: "Technology", colorCode: TagColor.GOLDISH },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 2, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.PreApproved,
  },
  {
    knowledgeId: 6,
    id: 3,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda6",
    category: { id: 3, title: "4D", colorCode: TagColor.PINK },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 3, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.PreApproved,
  },
];

export const rejectedConvs: KnowledgeCard[] = [
  {
    knowledgeId: 7,
    id: 1,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda7",
    category: { id: 1, title: "Account", colorCode: TagColor.PURPLE },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 1, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.Rejected,
  },
  {
    knowledgeId: 8,
    id: 2,
    dateTime: "2025-03-03T03:24:31Z",
    conversationId: "12345789489s89asda8",
    category: { id: 2, title: "Technology", colorCode: TagColor.GOLDISH },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 2, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.Rejected,
  },
  {
    knowledgeId: 9,
    id: 3,
    dateTime: "2025-03-03T03:24:31Z",

    conversationId: "12345789489s89asda9",
    category: { id: 3, title: "4D", colorCode: TagColor.PINK },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: { id: 3, title: "Sub catgeory", categoryId: 1 },
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: KnowledegeStatus.Rejected,
  },
];
