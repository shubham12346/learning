import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';

// get details generate action plan
export const getGenerateActionPlanForRegulation = async (
  regulationId,
  param = {}
) => {
  const res = await apiGet(
    APIEndPoint.getGeneratedActionPlan.organization +
      APIEndPoint.getGeneratedActionPlan.regulation +
      regulationId +
      APIEndPoint.getGeneratedActionPlan.actionPlan,
    { params: { ...param } }
  );
  return res.data ?? [];
};

// get summary list
export const geTaskStatusList = async () => {
  const res = await apiGet(
    APIEndPoint.geTaskStatusList.task + APIEndPoint.geTaskStatusList.status
  );
  return res.data ?? [];
};

// add new task
export const addTask = async (params) => {
  const res = await apiPost(`${APIEndPoint.taskApi.addTask}`, params);
  return res.data ?? [];
};

// Edit task
export const editTask = async (
  taskUid,
  taskRecurenceId,
  params,
  editAllInstance = false
) => {
  console.log('taskRecurenceId', taskRecurenceId);
  const res = await apiPut(
    `${APIEndPoint.taskApi.taskById}${taskUid}${APIEndPoint.taskApi.taskRecurenceId}${taskRecurenceId}`,
    params,
    {
      params: { editAllInstance }
    }
  );
  return res.data ?? [];
};

// view task
export const getTaskDetails = async (taskUid, taskRecurenceId) => {
  const res = await apiGet(
    `${APIEndPoint.taskApi.taskById}${taskUid}${APIEndPoint.taskApi.taskRecurenceId}${taskRecurenceId}`
  );
  return res.data ?? [];
};

//save the action plan
export const saveActionPlan = async (actionPlanId: string) => {
  const res = await apiPost(
    `${APIEndPoint.getGeneratedActionPlan.actionPlan}/${actionPlanId}/${APIEndPoint.getGeneratedActionPlan.accept}`,
    {}
  );
  return res.data ?? [];
};

export const deleteActionPlan = async (actionPlanId: string) => {
  const res = await apiDelete(
    `${APIEndPoint.getGeneratedActionPlan.actionPlan}/${actionPlanId}`
  );
  return res.data ?? [];
};

// delete task
export const deleteTask = async (
  taskRecurenceId,
  taskUid,
  deleteAllInstance = false
) => {
  const res = await apiDelete(
    `${APIEndPoint.taskApi.taskById}${taskUid}${APIEndPoint.taskApi.taskRecurenceId}${taskRecurenceId}`,
    {
      params: { deleteAllInstance }
    }
  );
  return res.data ?? [];
};

// update date status
export const updateStatusOfTask = async (
  taskId: string,
  taskStatusName: string
) => {
  const rest = await apiPut(
    `${APIEndPoint.getTaskDetails.task}${taskId}/${taskStatusName}`
  );
  return rest.data ?? [];
};

// get file types drop down options

export const getFileTypeDropOptions = async () => {
  const res = await apiGet(`${APIEndPoint.generateActionPlan.fileTypeList}`);
  return res.data ?? [];
};

// get attachments for a action plan

export const getActionFilesAttachment = async (actionPlanId, payload) => {
  const res = await apiGet(
    `${APIEndPoint.generateActionPlan.actionPlan}${actionPlanId}/${APIEndPoint.generateActionPlan.attachment}`,
    { params: { ...payload } }
  );
  return res.data ?? [];
};

// delete attachment for a task
export const deleteAttachmentForATask = async (uid, payload) => {
  const res = await apiPatch(
    `${APIEndPoint.deleteFile.actionPlan}${APIEndPoint.deleteFile.attachment}${uid}${APIEndPoint.deleteFile.remove}`,
    { ...payload }
  );
  return res.data ?? [];
};
