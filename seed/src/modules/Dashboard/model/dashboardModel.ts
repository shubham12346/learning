export interface DashboardPriorityTasksEnforcementPropsTypes {
  listofRegulatoryOrganization: any;
  enforcementData: any;
  taskPriorityData: any;
  isCollapsed: boolean;
}

export interface DashboardTaskEnforcementListPropsTypes {
  dateLabel: string;
  enforcementData?: any;
  taskListData?: any;
  isCollapsed: boolean;
  gotTaskList?: () => void;
}

export interface DashboardRegulatoryEventsProps {
  regulatoryEventDetails: any;
  isLoaderActive: boolean;
  selectedTimesOptionsValue: (e) => void;
}
