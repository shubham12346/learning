import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';

// getLoggedInUserDetail
export const getLoggedInUserDetail = async (userUid?) => {
  const res = await apiGet(
    `${APIEndPoint.settings.user}${userUid}${APIEndPoint.settings.detail}`
  );
  return res.data ?? [];
};

// getUpdateUserName
export const getUpdateUserName = async (userEmailId, parmas) => {
  const res = await apiPut(
    `${APIEndPoint.settings.user}${userEmailId}`,
    parmas
  );
  return res.data ?? [];
};

// get MFA settings
export const getMFASettings = async (email) => {
  const res = await apiGet(`${APIEndPoint.mfa.getMfa}${email}`);
  return res.data ?? [];
};

// Update MFA Settings
export const updateMFASettings = async (payload) => {
  const res = await apiPost(APIEndPoint.mfa.updateMfa, payload);
  return res.data ?? {};
};

//get chatbot list details
export const getChatbotList = async (instanceId=undefined) => {
  const res = await apiGet(
    `${APIEndPoint.settings.chatbot}${APIEndPoint.settings.chatbotConfig}`,{
      params : {instanceId}
    }
  );
  return res.data ?? [];
};

//delete chatbot
export const deleteChatbot = async (chatbotId, payload) => {
  const res = await apiDelete(`${APIEndPoint.settings.chatbot}${chatbotId}`, {
    params: { ...payload }
  });
  return res?.data ?? '';
};

//Add chatbot
export const addChatbot = async (payload) => {
  const res = await apiPost(`${APIEndPoint.settings.chatbot}${APIEndPoint.settings.chatbotInstance}`,payload)
  return res?.data ?? '';
};
