import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { RegulationAcceptanceStatusEnum } from '../utils/utils';

export const getCountryList = async () => {
  const res = await apiGet(APIEndPoint.onboarding.country);
  return res.data ?? [];
};

export const getStateList = async (country) => {
  const res = await apiGet(
    APIEndPoint.onboarding.country +
      '/' +
      country +
      APIEndPoint.onboarding.state
  );
  return res.data ?? [];
};

export const getBusinessType = async () => {
  const res = await apiGet(APIEndPoint.onboarding.businessType);
  return res.data ?? [];
};

export const getBusinessTypeDetail = async (businessType, sectionType) => {
  const res = await apiGet(
    APIEndPoint.onboarding.businessTypeDetail +
      businessType +
      '?sectionType=' +
      sectionType
  );
  return res.data ?? [];
};

export const getlistofregulatoryOrganization = async (organization) => {
  const res = await apiGet(
    APIEndPoint.regulations.organization +
      APIEndPoint.regulations.listOfRegulatoryOrganization
  );
  return res.data ?? [];
};

export const getRegulationDetails = async (
  organization,
  regulatoryOrganizationId
) => {
  const res = await apiGet(
    APIEndPoint.regulations.organization +
      APIEndPoint.regulations.regulationDetailsGet +
      regulatoryOrganizationId,
    {
      params: {
        regulationAcceptanceStatus: RegulationAcceptanceStatusEnum.SUGGESTED
      }
    }
  );
  return res.data ?? [];
};

export const acceptRegulation = async (organization) => {
  const res = await apiPost(
    APIEndPoint.regulations.organization +
      organization +
      APIEndPoint.regulations.regulationDetails
  );
  return res.data ?? [];
};

export const deleteRegulationDetails = async (
  organization,
  regulatoryOrganizationId,
  updateStatus
) => {
  const res = await apiPatch(
    APIEndPoint.regulations.organization +
      organization +
      APIEndPoint.regulations.regulationDetails +
      '/' +
      regulatoryOrganizationId,
    updateStatus
  );
  return res.data ?? [];
};

export const saveOrganizationDetails = async (
  organizationObj,
  organizationId
) => {
  const res = await apiPut(
    APIEndPoint.onboarding.organization.startwith +
      organizationId +
      APIEndPoint.onboarding.organization.endWith,
    organizationObj
  );
  return res.data ?? null;
};

//Save Business Details API Call
export const saveBusinessDetails = async (organizationObj, organizationId) => {
  const res = await apiPost(
    APIEndPoint.onboarding.organization.startwith +
      organizationId +
      APIEndPoint.onboarding.organization.endWith +
      APIEndPoint.onboarding.organization.onboardingState,
    organizationObj
  );
  return res.data ?? null;
};

export const fetchBusinessDetails = async (organizationId) => {
  const res = await apiGet(
    APIEndPoint.onboarding.organization.startwith +
      organizationId +
      APIEndPoint.onboarding.organization.endWith +
      APIEndPoint.onboarding.organization.onboardingState
  );
  return res.data ?? [];
};

// regulation search api
export const getAllSearchedRegulation = async (searchKeyword) => {
  const res = await apiGet(APIEndPoint.currentRegulations.searchRegulation, {
    params: { global: true, searchKeyword: searchKeyword }
  });
  return res.data ?? [];
};

export const verifyCrdNumber = async (crdNumber: string, queryParam) => {
  const res = await apiPost(
    `${APIEndPoint.onboarding.verifyCrd}${crdNumber}/${APIEndPoint.onboarding.verify}`,
    {},
    { params: { businessType: queryParam } }
  );
  return res.data || [];
};

export const cancelCrdNumber = async (crdNumber: string) => {
  const res = await apiDelete(
    `${APIEndPoint.onboarding.cancelCrd.startWith}${crdNumber}${APIEndPoint.onboarding.cancelCrd.endWith}`
  );
  return res.data || [];
};
