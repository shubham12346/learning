import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet, apiPost } from 'src/shared/utils/api-request';
import {
  TauditGenerateReportPayload,
  TgapGenerateReportPayload,
  trailReportsArgsType
} from '../model/reportsModel';

export const getAllAuditTrailReportsDetails = async (
  payload?: trailReportsArgsType
) => {
  const res = await apiGet(
    `${APIEndPoint.reports.activityLog}${APIEndPoint.reports.auditTrail}`,
    { params: { ...payload } }
  );
  return res.data ?? [];
};

export const getListOfRegulations = async () => {
  const res = await apiGet(
    `${APIEndPoint.regulations.organization}${APIEndPoint.regulations.regulationDetailsGet}`
  );
  return res.data ?? [];
};

export const generateAnualpolicyReport = async (params) => {
  const res = await apiPost(`${APIEndPoint.reports.annualPolicy}`, null, {
    params
  });
  return res.data ?? [];
};

export const getListOfAnnualPolicy = async (payload) => {
  const res = await apiGet(APIEndPoint.reports.annualPolicy, {
    params: { ...payload }
  });
  return res.data ?? [];
};

export const getListOfGapAssesment = async (payload) => {
  const res = await apiGet(`${APIEndPoint.reports.gapAssesmentReport}`, {
    params: { ...payload }
  });
  return res.data ?? [];
};

export const generateGapAssesmentReoprt = async (
  payload: TgapGenerateReportPayload
) => {
  const res = await apiPost(
    `${APIEndPoint.reports.generateGapAssessmentReport}`,
    {},
    { params: { ...payload } }
  );
  return res.data ?? [];
};

export const getListOfGeneratedGapAssessmentReport = async (payload) => {
  const res = await apiGet(
    `${APIEndPoint.reports.generateGapAssessmentReport}`,
    { params: { ...payload } }
  );

  return res.data ?? [];
};

export const genrerateAuditTrailReport = async (
  payload: TauditGenerateReportPayload
) => {
  const res = await apiPost(
    `${APIEndPoint.reports.generateAuditTrailReport}`,
    {},
    { params: payload }
  );
  return res.data ?? [];
};

export const getlistOfGeneartedReportList = async (payload) => {
  const res = await apiGet(`${APIEndPoint.reports.generateAuditTrailReport}`, {
    params: { ...payload }
  });
  return res?.data || [];
};
