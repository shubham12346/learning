import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';
import { gapActionTaskListType } from '../hooks/useFilters';
import { saveEditGapTaskDetailsType } from '../models';

export const gapActionPlanOverviewApi = async (gapTaskId: string) => {
  const res = await apiGet(
    `${APIEndPoint.gapActionPlan.gapAssessmentOverview.gap}${gapTaskId}${APIEndPoint.gapActionPlan.gapAssessmentOverview.overview}`
  );
  return res.data || [];
};

export const gapActionTasks = async (
  id: string,
  filters: gapActionTaskListType
) => {
  const res = await apiGet(
    `${APIEndPoint.gapActionPlan.tasksList.gap}${id}${APIEndPoint.gapActionPlan.tasksList.detail}`,
    { params: { ...filters } }
  );
  return res?.data || [];
};

export const saveActionPlan = async (gapId: string) => {
  const res = await apiPost(
    `${APIEndPoint.gapActionPlan.saveActionPlan.gap}${gapId}`
  );
  return res?.data || [];
};
export const discardActionPlan = (id: string) => {};

export const riskStatusLevelDropdown = async () => {
  const res = await apiGet(APIEndPoint.gapActionPlan.riskLevelStatusDropdown);
  return res?.data ?? [];
};

export const regulationListDropdown = async (gapId: string) => {
  const res = await apiGet(
    `${APIEndPoint.gapActionPlan.regulationDropdown.gap}${gapId}${APIEndPoint.gapActionPlan.regulationDropdown.reg}`
  );

  return res.data || [];
};

export const deleteTask = async (gapId: string, taskUid: string) => {
  const res = await apiDelete(
    `${APIEndPoint.gapActionPlan.deleteTask.gap}${gapId}${APIEndPoint.gapActionPlan.deleteTask.task}${taskUid}`
  );
  return res.data || [];
};

export const getGapTaskDetails = async (gapId: string, taskUid: string) => {
  const res = await apiGet(
    `${APIEndPoint.gapActionPlan.deleteTask.gap}${gapId}${APIEndPoint.gapActionPlan.deleteTask.task}${taskUid}`
  );
  return res.data || [];
};

export const saveEditGapTaskDetails = async (
  gapAssessmentId: string,
  taskId: string,
  payload: saveEditGapTaskDetailsType
) => {
  const res = await apiPut(
    `${APIEndPoint.gapActionPlan.deleteTask.gap}${gapAssessmentId}${APIEndPoint.gapActionPlan.deleteTask.task}${taskId}`,
    { ...payload }
  );
  return res.data || [];
};
