import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';

// get details regulations
export const getAllRegulationDetails = async (params?) => {
  const res = await apiGet(
    APIEndPoint.dashboard.organization +
      APIEndPoint.dashboard.dashboard +
      APIEndPoint.dashboard.regulation,
    { params }
  );
  return res.data ?? [];
};

// get details Task
export const getAllTaskDetails = async (params?) => {
  const res = await apiGet(
    APIEndPoint.dashboard.organization +
      APIEndPoint.dashboard.dashboard +
      APIEndPoint.dashboard.task,
    { params }
  );
  return res.data ?? [];
};

// get all regulatory event details
export const getAllRegulatoryEventDetails = async (params?) => {
  const res = await apiGet(
    APIEndPoint.dashboard.organization +
      APIEndPoint.dashboard.dashboard +
      APIEndPoint.dashboard.regulatoryEvent,
    { params }
  );
  return res.data ?? [];
};

// get enforcementDate wise data
export const getEnforcementDateWiseRegulationsDetails = async () => {
  const res = await apiGet(
    `${
      APIEndPoint.dashboard.organization + APIEndPoint.dashboard.regulation
    }?sortBy=${'enforcementDate'}&sortOrder=${'ASC'}`
  );
  return res.data ?? [];
};

// get taskPriority wise data
export const getTaskPriorityWiseRegulationsDetails = async () => {
  const params = {
    sortBy: 'targetDate',
    sortOrder: 'ASC',
    isPriorityTasks: 'true',
    limit: 5
  };
  const res = await apiGet(APIEndPoint.dashboard.task, { params: params });
  return res.data ?? [];
};

// get compliance-score
export const getComplianceScoreDetails = async () => {
  const res = await apiGet(
    APIEndPoint.dashboard.organization +
      APIEndPoint.dashboard.dashboard +
      APIEndPoint.dashboard.complianceScore
  );
  return res.data ?? [];
};
