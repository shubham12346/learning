export type tabsType = 'Task' | 'List' | 'Calender';

export type filters = {
  agency: any[];
  status: any[];
};
export interface FilterPropsType {
  showFilters?: boolean;
  showButton?: boolean;
  onFilterChange?: any;
  handleSearch: (e: any) => void;
  searchKeyword: string;
  view?: string;
  handleViewChange?: (event: any, value: any) => void;
  calendarDropDownProps?: DropDownProps;
}
export interface DropDownProps {
  anchorEl: any;
  handleCloseDownDown: () => void;
  handleMenuClick: (event: any) => void;
  handleMenuItemClick: (item: any) => void;
  lastSyncedDate: any;
}
export interface taskHeaderProps {
  view: string;
  handleViewChange: (event: any, value: any) => void;
  handelFilters: (selectedFilters: any) => void;
  handleSearch: (e: any) => void;
  searchKeyword: string;
  calendarDropDownProps?: DropDownProps;
}
export interface tabViewProps {
  view: string;
  handleViewChange: (event: any, value: any) => void;
}

export type Pager = {
  currentPage: number;
  limit: number;
  startIndex: number;
  totalItems: number;
  totalPages: number;
};
export type tableFilterData = {
  actions: any;
  handleUpdateDeleteId?: (taskUid: string) => void;
  tableListData: { mainRows: any[]; nestedRowsMap: any[] };
  pager?: Pager;
  getNextPagination?: (pageData: any) => void | any;
  loader: boolean;
  deleteSingelTask?: (e) => void;
  view?: string;
  regulationInfo?: any;
};

export interface taskListApiArgs {
  searchKeyword?: string;
  agency?: any;
  taskStatusName?: any;
  page?: number;
  limit?: number;
  taskType?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface calenderEventInterface {
  id: number;
  eventTitle: string;
  description: string;
  start: Date;
  end: Date;
  desc?: string;
}

export interface calenderEvents {
  events: calenderEventInterface[];
}
export interface DeleteTaskModalProps {
  handleClose: () => void;
  open: boolean;
  taskName?: string;
  handleDelete: () => void;
  selectedRow?: any;
}

export interface taskheaderProps {
  taskDetails?: any;
  setIsEdit?: any;
  isEdit?: any;
  taskStatus?: string;
  setDeleteModalOpen?: any;
  handleSelectedValue?: (value) => void;
  actions?: any;
  isTaskTitlePlaceholder?: string;
  checkTaskStatus?: (value) => void;
  setInitialValue?: (value) => void;
}

export type getTasks = (
  filters: filters,
  pager: Pager,
  searchKeyword: string,
  isFilter: boolean
) => Promise<void>;

export type TaskTableMainRow = {
  id: string;
  agency: string;
  regulation: string;
  taskTitle: string;
  actionPlanId: string | null;
  taskType: string;
  taskId: string;
  gapAssessmentId: string | null;
};

export type TaskTableNestedRow = {
  id: string;
  owner: string;
  taskname: string;
  status: string;
  targetdate: string; // ISO date string
  taskCadence: string;
  createdDate?: string | null;
};

export type TaskTableNestedRowsMap = {
  [taskUid: string]: TaskTableNestedRow[];
};

export type FormattedTaskTableData = {
  mainRows: TaskTableMainRow[];
  nestedRowsMap: TaskTableNestedRowsMap;
};
