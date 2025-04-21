import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet, apiPost, apiUpload } from 'src/shared/utils/api-request';

//get all user list
export interface payloadType {
  page?: number;
  limit?: number;
  groupName?: string;
  roleType?: string;
}
export const getUserList = async (payload: payloadType) => {
  const res = await apiGet(APIEndPoint.user.getAllUsers.startwith, {
    params: { ...payload }
  });
  return res.data ?? null;
};

//get group
export const getGroup = async () => {
  const res = await apiGet(APIEndPoint.user.getAllGroup.startwith);
  return res.data ?? null;
};

//add new user
export const addNewUserApi = async (addUserObj) => {
  const res = await apiPost(APIEndPoint.user.getAllUsers.startwith, addUserObj);
  return res.data ?? null;
};

//file upload for task
export const uploadNewFile = async (taskId, doc, isActionPlan = false) => {
  const finalEndpoint = isActionPlan
    ? APIEndPoint.uploadFile.actionPlan
    : APIEndPoint.uploadFile.task;

  const res = await apiUpload(
    `${finalEndpoint}${taskId}${APIEndPoint.uploadFile.attachment}${APIEndPoint.uploadFile.upload}`,
    doc
  );
  return res.data || [];
};

// resend invitation to user , organization , partner
export const resendInvitation = async (userEmail: string) => {
  const res = await apiGet(
    `${APIEndPoint.user.resendOrganization}${userEmail}/${APIEndPoint.user.resendInvitation}`
  );
  return res.data || [];
};

export const getUserRolesExclidingPrimaryAdminRole = async () => {
  const params = {
    excludePrimayAdminRole: 'true'
  };
  const res = await apiGet(APIEndPoint.user.getAllGroup.startwith, { params: params });

  return res.data ?? [];
}