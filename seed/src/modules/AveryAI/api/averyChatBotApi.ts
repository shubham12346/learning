import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiDelete, apiGet, apiPut } from 'src/shared/utils/api-request';

// get details regulations
export const getChatBotAiResponse = async (input, payload) => {
  const res = await apiPut(APIEndPoint.chatBot.chatBot, input, {
    params: { ...payload }
  });
  return res.data ?? [];
};
type copilotParamType = {
  copilot: 'avery' | 'fusion-one';
};
// get list of chat bot session
export const getLeftSidePanel = async (param: copilotParamType) => {
  const res = await apiGet(APIEndPoint.chatBot.session, { params: param });
  return res.data ?? [];
};

// edit session title
export const editSessionTitle = async (sessionId, newTitle) => {
  const res = await apiPut(
    `${APIEndPoint.chatBot.session}/${sessionId}`,
    newTitle
  );
  return res.data ?? [];
};

// delete a chat  session
export const deleteSession = async (sessionId) => {
  const res = await apiDelete(`${APIEndPoint.chatBot.session}/${sessionId}`);
  return res.data ?? [];
};

// get lst of chat bot's session message

export const getChatBotSession = async (sessionId) => {
  const res = await apiGet(`${APIEndPoint.chatBot.chat}/${sessionId}`);
  return res.data ?? [];
};

// stream api integration

export const getChatBotResponseInStreams = async (inputText, sessionId) => {
  let query = {
    input: inputText,
    sessionId: sessionId || null
  };
  const res = await apiGet(`${APIEndPoint.chatBot.chatBotStreamResponse}`, {
    params: { ...query }
  });
  return res.data ?? [];
};

// chat bot response api

export const getChatbotFeedback = async ({
  chatbotAccessHistoryId,
  isLike
}) => {
  const res = await apiPut(
    `${APIEndPoint.chatBot.chatBotFeedback}${chatbotAccessHistoryId}/${APIEndPoint.chatBot.feedback}/${isLike}`
  );
  return res?.data || [];
};
