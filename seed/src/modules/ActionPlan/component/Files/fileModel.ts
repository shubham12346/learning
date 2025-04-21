export interface FilterPropsType {
  showFilters?: boolean;
  showButton?: boolean;
  onFilterChange?: any;
  handleSearch?: (e: any) => void;
  searchKeyword?: string;
}

export type tableFilterData = {
  actions?: any;
  handleUpdateDeleteId?: (taskUid: string) => void;
  tableListData?: any[];
  pager?: {
    currentPage: number;
    limit: number;
    startIndex: number;
    totalItems: number;
    totalPages: number;
  };
  getNextPagination?: (pageData: any) => Promise<void>;
  loader?: boolean;
  deleteSingelTask?: (e) => void;
  handleDeleteAttachment?: (payload) => void;
};
