import { apiGet, apiPost } from 'src/shared/utils/api-request';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';

export const getTokenStatus = async (token) => {
  const res = await apiGet(`${APIEndPoint.auth.tokenStatus}${token}`);
  return res.data ?? [];
};


export const tokenExchangesApi = async (payload) => {
  const res = await apiPost(APIEndPoint.auth.tokenExchange, payload);
  return res.data ?? [];
};


export const loginAsApi = async (payload:any) => {
  const res = await apiPost(APIEndPoint.auth.impersonet, payload);
  return res.data ?? {};  
}

export const getOriginalTokenApi = async () => {
  const res = await apiPost(APIEndPoint.auth.originalToken);
  return res.data ?? {};  
}
