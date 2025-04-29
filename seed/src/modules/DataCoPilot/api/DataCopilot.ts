import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet, apiPost } from 'src/shared/utils/api-request';
import { ChatBotQuestions } from '../model';

export const askChatBotQuestion = async ({
  query,
  userId,
  sessionId
}: {
  query: string;
  userId: string;
  sessionId: string;
}) => {
  const res = await apiPost(`${APIEndPoint.dataCopilot.chat}`, {
    query,
    userUid: userId,
    sessionId: sessionId
  });
  return res.data || [];
};

export const getChatBotQuestions = async (): Promise<ChatBotQuestions[]> => {
  const res = await apiGet(`${APIEndPoint.dataCopilot.categoryQuestions}`);
  return res.data || [];
};
