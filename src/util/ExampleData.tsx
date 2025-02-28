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
