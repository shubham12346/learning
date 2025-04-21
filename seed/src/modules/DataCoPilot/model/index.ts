export interface ChatBotQuestions {
  id: string;
  category: string;
  type: string;
  question: {
    id: string;
    question: string;
  }[];
  created_at: string;
  updated_at: string;
  expaned?: boolean;
}

export type DataCopilotAnswer = {
  id: string;
  question: string;
  answer: string;
  sessionId: string;
  responseType: 'table' | 'text';
  description?: string;
  sources?: string;
  summary?: string;
};
