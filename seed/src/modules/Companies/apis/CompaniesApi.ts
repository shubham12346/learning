import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet, apiPost } from 'src/shared/utils/api-request';

export const getCompaniesList = async (payload) => {
  const res = await apiGet(APIEndPoint.tenants.listOfCompanies, {
    params: { ...payload }
  });
  return res.data ?? null;
};

export const addCompany = async (payload) => {
  const response = await apiPost(APIEndPoint.tenants.addCompany, payload);
  return response;
};

export interface PartnerListPayload {
  page?: number;
  limit?: number;
  sortBy?: 'onboardedOn';
  sortOrder?: 'ASC' | 'DESC';
}
export const getPartnersList = async (payload: PartnerListPayload) => {
  const res = await apiGet(APIEndPoint.tenants.partnersList, {
    params: { ...payload }
  });
  return res.data ?? null;
};
export const addPartners = async (payload) => {
  const response = await apiPost(APIEndPoint.tenants.addPartner, payload);
  return response;
};
