import { apiGet, apiPost } from 'src/shared/utils/api-request';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';

//get list of regulatory body
export const getAllListofRegulatoryAccepted = async (params?) => {
  const res = await apiGet(
    APIEndPoint.currentRegulations.organization +
      APIEndPoint.currentRegulations.listOfRegulatoryBody,
    { params }
  );
  return res.data ?? [];
};

//get list of each regulatory
export const getListOfEachRegulatoryAct = async (params) => {
  const res = await apiGet(
    APIEndPoint.currentRegulations.organization +
      APIEndPoint.currentRegulations.regulation,
    { params }
  );
  return res.data ?? [];
};

//get details of regulation
export const getRegulationDetails = async (regulationId) => {
  const res = await apiGet(
    APIEndPoint.currentRegulations.organization +
      APIEndPoint.currentRegulations.regulationDetail +
      regulationId
  );
  return res.data ?? {};
};

// generate Action Plan
export const generateActionPlanForRegulation = async (regulationId) => {
  const res = await apiPost(
    APIEndPoint.generateActionPlan.actionPlan +
      APIEndPoint.generateActionPlan.generate +
      regulationId
  );
  return res.data ?? [];
};

// regulation search api
export const getAllSearchedRegulation = async (searchKeyword) => {
  const res = await apiGet(
    APIEndPoint.currentRegulations.searchRegulation + '=' + searchKeyword
  );
  return res.data ?? [];
};

//Proposed regualtion
export const getAllListProposeRegulations = async (params) => {
  const res = await apiGet(
    `${APIEndPoint.proposedRegulations.regulation}${APIEndPoint.proposedRegulations.proposed}`,
    { params }
  );
  return res.data ?? [];
};

//get details of proposed regulation
export const getProposedRegulationDetails = async (regulationId) => {
  const res = await apiGet(
    `${APIEndPoint.proposedRegulations.regulation}${APIEndPoint.proposedRegulations.proposedRegulation}${regulationId}`
  );
  return res.data ?? {};
};

//get search proposed regulation
export const getAllSearchedProposedRegulation = async (params) => {
  const res = await apiGet(
    `${APIEndPoint.proposedRegulations.regulation}${APIEndPoint.proposedRegulations.proposed}`,
    { params }
  );
  return res.data ?? [];
};

//add firm regualtion policy
export const saveFirmPolicyDetails = async (businessRegulationId, params) => {
  const res = await apiPost(
    `${APIEndPoint.regulationPolicy.businessRegulation}${APIEndPoint.regulationPolicy.policy}/${businessRegulationId}`,
    params
  );
  return res.data ?? [];
};

//add gap analysis regualtion policy
export const saveGapAnalysisDetails = async (businessRegulationId, params) => {
  const res = await apiPost(
    `${APIEndPoint.regulationPolicy.businessRegulation}${APIEndPoint.regulationPolicy.gap}/${businessRegulationId}`,
    params
  );
  return res.data ?? [];
};

// get details of selected regulation on libray tab
export const getListOfRegulationInLibraryTab = async (url, payload) => {
  const res = await apiGet(url, { params: { ...payload } });
  return res.data ?? [];
};

// get list  list of regulatory organization with count in library tab
export const geListOfRegulatoryOrganizationInLibraryTab = async (payload) => {
  const res = await apiGet(
    `${APIEndPoint.libraryRegulations.listOfRegulationOrganization}`,
    {
      params: { ...payload }
    }
  );
  return res.data ?? [];
};

// get details of particular selected regulation in library tab
export const getDetailOfAParticularRegulationInLibraryTab = async (
  regulationId: string
) => {
  const res = await apiGet(
    `${APIEndPoint.libraryRegulations.particularRegulation}${regulationId}`
  );
  return res.data ?? [];
};

// add a regulation from library to current tab
export const addRegulationFromLibrayToCurrentRegulation = async (
  regulationId: string
) => {
  const res = await apiPost(
    `${APIEndPoint.libraryRegulations.addRegulationToCurrent}${regulationId}`
  );
  return res.data ?? [];
};

// get Gap actiity status dropdonw data
export const getGapActivityStatusOptions = async (params) => {
  const res = await apiGet(
    `${APIEndPoint.regulations.gapAssessment.getActivityStatusDropdown}`,
    {
      params: { ...params }
    }
  );

  return res?.data;
};

//get API to get data of the gap assessment activity table
export const getGapAssessmentActivityTableData = async (params) => {
  const res = await apiGet(
    `${APIEndPoint.regulations.gapAssessment.getGapAssessmentActivityList}`,
    {
      params: { ...params }
    }
  );
  
  return res?.data;
};
