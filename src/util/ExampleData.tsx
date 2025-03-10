import { LanguageProps } from "../components/language/Language";
import { TagColor } from "../components/tags/Tag";
import { QuestionCardProps } from "../pages/newManager/components/QuestionCard";
import { QuestionStatus } from "./QuestionStatus";

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

export const needApprovalConvs: QuestionCardProps[] = [
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 1, title: "Account", colorCode: TagColor.PURPLE },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.NeedApproval,
  },
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 2, title: "Technology", colorCode: TagColor.GOLDISH },

    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.NeedApproval,
  },
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 3, title: "4D", colorCode: TagColor.PINK },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.NeedApproval,
  },
];

export const approvedConvs: QuestionCardProps[] = [
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 1, title: "Account", colorCode: TagColor.PURPLE },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.PreApproved,
    isEdited: true
  },
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 2, title: "Technology", colorCode: TagColor.GOLDISH },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.PreApproved,
  },
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 3, title: "4D", colorCode: TagColor.PINK },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.PreApproved,
  },
];

export const rejectedConvs: QuestionCardProps[] = [
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 1, title: "Account", colorCode: TagColor.PURPLE },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.Rejected,
  },
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 2, title: "Technology", colorCode: TagColor.GOLDISH },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.Rejected,
  },
  {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: { id: 3, title: "4D", colorCode: TagColor.PINK },
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
      isSolid: true,
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionStatus.Rejected,
  },
];
