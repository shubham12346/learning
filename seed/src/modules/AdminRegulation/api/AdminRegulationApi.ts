import { apiGet, apiPut } from 'src/shared/utils/api-request';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { regulationObligationType } from '../model';

export type getListOfRegulationPayloadType =
  | {
      searchRegulation?: string;
      searchAgency?: string;
      regulationEditType?: string;
      paginationDto?: {};
    }
  | '';

type regulationPayload = {
  shortSummary: string;
  summary: string;
  policy: string;
  procedure: string;
  sourceLink: string;
  enforcementDate: Date;
  noticeDate: Date;
  regulatoryBodyName?: string;
  tasks: regulationObligationType[];
};

export type updateOrSubmitAParticularRegulationType = {
  payload: regulationPayload;
  isSubmitted: boolean;
  regulationId: string;
};

export type getRegulatoryOrganizationBodyListForAdminRegulationWithCountProps = {
  regulationEditType?: string;
} | ''

export const getRegulatoryOrganizationBodyListForAdminRegulation = async (
  payload?:getRegulatoryOrganizationBodyListForAdminRegulationWithCountProps
) => {
  const res = await apiGet(
    APIEndPoint.adminRegulation.regBodyOrganizationsCount,
    {
      params:{...payload}
    }
  );
  return res.data || [];
};

export const getListOfRegulation = async (
  payload?: getListOfRegulationPayloadType
) => {
  const res = await apiGet(
    `${APIEndPoint.adminRegulation.regulationList}/all`,
    {
      params: { ...payload }
    }
  );
  return res.data || [];
};

export const getRegulationsById = async (regulationId: string) => {
  const res = await apiGet(
    `${APIEndPoint.adminRegulation.regulation}/${regulationId}/${APIEndPoint.adminRegulation.evaluate}`
  );
  return res.data || [];
};

export const getRegulationTypeDropdown = async () => {
  const res = await apiGet(APIEndPoint.adminRegulation.regulationType);
  return res.data || [];
};

export const getRegulatoryBodyType = async () => {
  const res = await apiGet(APIEndPoint.adminRegulation.regulationOrganizations);
  return res.data || [];
};

export const updateOrSubmitAParticularRegulation = async (
  args: updateOrSubmitAParticularRegulationType
) => {
  const res = await apiPut(
    `${APIEndPoint.adminRegulation.regulation}/${args.regulationId}/${APIEndPoint.adminRegulation.evaluate}/${args.isSubmitted}`,
    { ...args.payload }
  );

  return res.data || [];
};

//reviewed Regulations tab API's

//API to get count of regulation 
export const getReviewedRegulatoryOrganizationBodyListForAdminRegulation = async () => {
  const res = await apiGet(
    APIEndPoint.adminRegulation.reviewedregBodyOrganizationsCount
  );
  return res.data || [];
};

//Get regulation by Id
export const getReviewedRegulationsById = async (regulationId: string) => {
  const res = await apiGet(
    `${APIEndPoint.adminRegulation.reviewedRegulationById}/${regulationId}`
  );
  return res.data || [];
};

//Get regulations list
export const getReviewedListOfRegulation = async (
  payload?: getListOfRegulationPayloadType
) => {
  const res = await apiGet(
    `${APIEndPoint.adminRegulation.reviewedRegulationList}`,
    {
      params: { ...payload }
    }
  );
  return res.data || [];
};

//API to submit the regulation
export const updateOrSubmitAParticularReviewedRegulation = async (
  args: updateOrSubmitAParticularRegulationType
) => {
  const res = await apiPut(
    `${APIEndPoint.adminRegulation.reviewedRegulationSave}/${args.regulationId}/${APIEndPoint.adminRegulation.evaluate}/${args.isSubmitted}`,
    { ...args.payload }
  );

  return res.data || [];
};