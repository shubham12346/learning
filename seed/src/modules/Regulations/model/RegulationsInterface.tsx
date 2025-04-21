export type RegulatoryList = {
  id: string;
  name: string;
  totalRegulations?: TotalRegulationsList;
  totalCount?: number;
};
export type TotalRegulationsList = {
  accepted: number;
  rejected: number;
  selected: number;
  suggested: number;
  proposed: number;
  library: number;
};

export type RegulationSummaryType = {
  isActionPlanExists: boolean;
  regulationId: string;
  regulatoryBody: string;
  regulationName: string;
  regulationEnforcementDate: string;
  regulationNoticeDate: string;
  numberOfEnforcement: number;
  sourceDocumentLink: string;
  latestSummaryChange: LatestSummaryChange;
  summary: string;
};

export type ActionPlanOverviewType = {
  actionPlanId: string;
  actionPlanVersionUid: string;
  tasksList: TaskListType;
  actionPlanTargetDate: string;
  versions: any;
  totalNumberOfTasks: number;
  taskStatusCounts: TaskStatusCountsType;
  regulationInfo: {
    summary: SummariesType;
    regulationNoticeDate: string;
    regulationEnforcementDate: string;
    regulationId: string;
    regulationName: string;
    regulatoryBody: string;
    numberOfEnforcement: number;
    latestSummaryChange: LatestSummaryChange;
  };
};

export type TaskStatusCountsType = {
  approved: number;
  cancelled: number;
  created: number;
  inProgress: number;
  overdue: number;
  pendingApproval: number;
  pendingApprovalOverdue: number;
};

export type LatestSummaryChange = {
  date: string;
  description: string;
};

export type SummariesType = {
  id: string;
  summaryId: string;
  summaryUid: string;
  displayId: string;
  summary: string;
};

export type TaskStatusType = { id: string; name: string; displayName: string };
export type OwnerListType = {
  email: string;
  fullName: string;
  groups: [];
  onboardedOn: string;
  status: string;
  userUid: string;
};

export type AddNewTaskType = {
  taskName: string;
  summaryId: string;
  description: string;
  targetDate: string;
  taskStatusId: string;
  ownerUid: string;
  actionPlanUid?: string;
  questionId?: string;
  files?: any[];
  controlTest?: string;
  testResult?: string;
  recommendedChanges?: string;
  tag?: any[];
  regulationId?: string;
  regulatoryOrganizationId?: string;
  taskCadenceId?: string;
};

export type TaskListType = {
  taskId: string;
  taskName: string;
  taskUid: string;
  taskDisplayId: string;
  taskCreatedAt: string;
  targetDate: string;
  owner: OwnerListType;
  taskStatus: TaskStatusType;
  attachment: any;
};

export interface LinearProgressDataType {
  createdDate: string;
  enforcementDate: string;
  totalTime: number;
  timeUsed: number;
}
export interface ActionPlanSummaryProps {
  goToActionPlan?: (active) => void;
  regulationId: string;
  isActionPlanExists: boolean;
  actions?: string[];
}

export interface TaskPropType {
  targetDate: string;
  titleText: string;
  taskStatus: string;
  taskPath?: {
    path?: string;
    idObj?: any;
    queryParam?: string;
  };
}

export interface taskListPropType {
  tasks: any;
  showViewAllAfter: number;
  handleViewAll: React.MouseEventHandler<HTMLButtonElement>;
  taskLoader?: boolean;
  idObj?: {
    regId: string;
    actionId: string;
  };
}

export interface GraphPropDataType {
  totalNumberOfTasks: number;
  taskStatusCounts: {
    approved: number;
    cancelled: number;
    inProgress: number;
    overdue: number;
    pendingApproval: number;
    pendingApprovalOverdue: number;
  };
  series: number[];
  colors: string[];
  labels: string[];
}

export interface TaskGraphPropType {
  series: number[];
  colors: string[];
  labels: string[];
  taskStatusCounts: {
    approved: number;
    cancelled: number;
    inProgress: number;
    overdue: number;
    pendingApproval: number;
    pendingApprovalOverdue: number;
  };
  graphButtomTitle: string;
  totalNumberOfTask: number;
}
