import { KnowledgeType } from "../../util/KnowledgeType";

export interface BrainItem {
  id: number;
  section_heading: string;
  chunk_text: string;
  knowledge_content: number;
  knowledge_type: KnowledgeType
}

export interface BrainResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: BrainItem[];
}