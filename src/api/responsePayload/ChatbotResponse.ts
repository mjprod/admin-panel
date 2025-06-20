export interface ChatbotResponse {
  reply: string;
  retrieved_context: string[];
  rewrite_question: string;
}