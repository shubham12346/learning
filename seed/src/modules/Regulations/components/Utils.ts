import * as ROUTES from 'src/shared/constants/routes';

export enum REGULATION_PATH {
  REGULATION = 'regulation',
  REGULATION_WITH_ID = 'regulationViewWithId',
  ACTION_PALN_VIEW = 'actionPlanView',
  ADDTASK = 'addTask',
  VIEWTASK = 'viewtask',
  EDIT_TASK = 'edit'
}

export const getRegulationPath = (
  path: string,
  idObj?: any,
  queryParams?: string
) => {
  const basePath = `/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/`;

  switch (path) {
    case REGULATION_PATH.REGULATION:
      return `${basePath}`;

    case REGULATION_PATH.REGULATION_WITH_ID:
      return `${basePath}${idObj?.regId}`;

    case REGULATION_PATH.ACTION_PALN_VIEW:
      return `${basePath}${idObj?.regId}/${ROUTES.ACTION}/${idObj?.actionId}`;

    case REGULATION_PATH.ADDTASK:
      return `${basePath}${idObj?.regId}/${ROUTES.ACTION}/${idObj?.actionId}/task/add`;

    case REGULATION_PATH.VIEWTASK:
      return `${basePath}${idObj?.regId}/${ROUTES.ACTION}/${idObj?.actionId}/task/view?${queryParams}`;
    case REGULATION_PATH.EDIT_TASK:
      return `${basePath}${idObj?.regId}/${ROUTES.ACTION}/${idObj?.actionId}/task/edit?${queryParams}`;
    default:
      break;
  }
};
