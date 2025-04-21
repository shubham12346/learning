import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiGet,
  apiPost
} from 'src/shared/utils/api-request';

export const callFusionOneAPI = async (apiUrl, params) => {
    const res = await apiPost(apiUrl, params);
    return res.data ?? [];
  };

export const getOrgDetails = async (orgUid)=>{
  const apiUrl = `${APIEndPoint.dashboard.organization}`+orgUid;
  const res = await apiGet(apiUrl);
  return res.data ?? [];
};