import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';
import { taskListApiArgs } from '../model/taskModel';
export type agencyArgs = {
  getNone?: boolean;
};

export const getAgencyList = async (agencyArgs: agencyArgs) => {
  const res = await apiGet(
    `${APIEndPoint.task.organization}${APIEndPoint.task.regulatoryOrg}`,
    {
      params: { ...agencyArgs }
    }
  );
  return res.data ?? [];
};

export const getTaskStatusOptions = async () => {
  const res = await apiGet(`${APIEndPoint.task.taskStatus}`);
  return res.data ?? [];
};

export const getTasksList = async (params?: taskListApiArgs) => {
  const res = await apiGet(`${APIEndPoint.task.task}`, {
    params: {
      ...params
    }
  });
  return res.data ?? [];
};

export interface taskParams {
  taskName: string;
  description: string;
  targetDate: string;
  taskStatusId: string;
  ownerUid: string;
}
export const editTask = async (
  taskId: string,
  taskOccurrenceUid: string,
  editAllInstance: boolean,
  bodyParams: taskParams
) => {
  console.log('task occurrence id in API',taskOccurrenceUid)
  const res = await apiPut(
    `${APIEndPoint.task.task}/${taskId}/${APIEndPoint.task.taskOccurrence}/${taskOccurrenceUid}`,
    {
      ...bodyParams
    },
    {
      params: {
        editAllInstance: editAllInstance
      }
    }
  );
  return res.data ?? [];
};

export const deleteTask = async (
  taskId: string,
  taskOccurrenceUid: string,
  deleteAllInstance: boolean
) => {
  const res = await apiDelete(APIEndPoint.task.task, {
    params: {
      taskOccurrenceUid: taskOccurrenceUid,
      taskUid: taskId,
      deleteAllInstance: deleteAllInstance
    }
  });
  return res.data ?? [];
};

export const getTaskDetail = async (
  taskId: string,
  taskOccurrenceId: string
) => {
  const res = await apiGet(
    `${APIEndPoint.task.task}/${taskId}/${APIEndPoint.task.taskOccurrence}/${taskOccurrenceId}`
  );
  return res.data ?? [];
};

export const sendAuthCodeToBackend = async (code: string) => {
  const res = await apiPost(
    `${APIEndPoint.calendarSync.sendAuthCodeToBackendUrl}`,
    {
      code: code
    }
  );
  return res.data ?? [];
};

export const syncCalendarWithOutlook = async (flag = true) => {
  const res = await apiPost(
    `${APIEndPoint.calendarSync.syncCalendarTask}/${flag}`
  );
  return res.data ?? [];
};

export const getCalendarSyncStatus = async () => {
  const res = await apiGet(`${APIEndPoint.calendarSync.calendarSyncStatus}`);
  return res.data ?? [];
};

export const getCalendarTimezoneList = async () => {
  const res = await apiGet(`${APIEndPoint.calendarSync.timezoneList}`);
  return res?.data ?? [];
};

export const saveSelectedTimeZoneOption = async (
  selectedTimezoneId: string
) => {
  const res = await apiPost(`${APIEndPoint.calendarSync.selectedTimezone}`, {
    timezone: selectedTimezoneId
  });

  return res?.data || [];
};

export const taskTypeDropDownOptions = async () => {
  const res = await apiGet(APIEndPoint.task.taskTypeDropDownOptions);
  return res?.data || [];
};

export const getCadenceDropDownOptions = async () => {
  const res = await apiGet(APIEndPoint.task.cadenceDropDownOptions);
  return res?.data || [];
};

export const createManualTask = async (reqBody) => {
  const res = await apiPost(`${APIEndPoint.task.createTask}`, { ...reqBody });
  return res?.data ?? [];
};
