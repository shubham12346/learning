import { CURRENT_DATE } from './../../../shared/constants/constants';
import { Dispatch, SetStateAction } from 'react';

export interface auditTrailListApiArgs {
  searchKeyword?: string;
  agency?: any;
  taskStatusName?: any;
  currentPage?: number;
  limit?: number;
}

export interface trailReportsArgsType {
  fromDate?: string;
  toDate?: string;
  agency?: string;
  regulation?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export interface auditTrailReportHeaderPropsTypes {
  showAddCompany?: () => void;
  showFilters: boolean;
  onFilterChange?: any;
  listOfAgency?: any;
  listOfRegulations?: [];
  onStartDateChange?: any;
  onEndDateChange?: any;
  hideAgency?: boolean;
  isGenerateButtonDisabled?: boolean;
  handleGenerateButton?: () => void;
  isVisiableGenerateBtn?: boolean;
  CurrentDate?: Date;
}

export interface ReportsDefaultViewPropsTypes {
  goToReportDetails?: (e, name) => void;
}

export interface ReportsDetailsPropsTypes {
  goBackToReports?: (e, name) => void;
  listOfAgency?: any;
  auditTrailReportData?: any;
  annualReportData?: any;
  getNextPaginationData: any;
  pagerList: any;
  isloader: boolean;
  listOfRegulations: any;
  handleStartDate: any;
  handleEndDate: any;
  hanldeFilters: any;
  isFilterApplied: any;
}

export interface AuditTrailReportListPropsTypes {
  actions?: string[];
  goBackToReports?: (isActive: any, reportName: any) => void;
  listOfAgency?: any;
  auditTrailReportData?: any;
  annualReportData?: any;
  getNextPaginationData?: any;
  pagerList?: any;
  isloader?: boolean;
  listOfRegulations?: any;
  handleStartDate?: any;
  handleEndDate?: any;
  hanldeFilters?: any;
  isFilterApplied?: any;
  isCustomBottom?: boolean;
  handleCancel?: () => void;
  handleSave?: () => void;
  isGenerateButtonDisabled?: boolean;
  handleGenerateButton?: () => void;
  handleTabChange?: Dispatch<SetStateAction<number>>;
}

export type Tpager = {
  page: number;
  limit: number;
  startIndex: number;
  totalItems: number;
  totalPages: number;
};

export type TgapAssessmentHeader = {
  showFilters?: any;
  onFilterChange?: any;
  listOfAgency?: any;
  listOfRegulations?: any;
  hideAgency?: any;
  isGenerateButtonDisabled?: any;
  isVisiableGenerateBtn?: any;
  handleGenerateButton?: any;
  showRefreshButton?: boolean;
  showGapAssesment?: boolean;
  gapOptions?: any[];
  handleGapOptions?: any;
  selectedGapOptions?: any;
};

export type TGapAssesmentReport = {
  setSelectedMoreInfo?: any;
  onFilterChange?: any;
  listOfAgency?: any;
  listOfRegulations?: any;
  handleGenerateButton?: any;
  gapOptions?: any[];
  handleGapOptions?: any;
  selectedGapOptions?: any;
  gaplReportListData?: any[];
  isloader?: boolean;
  isGenerateButtonDisabled?: boolean;
  isCustomButtom?: boolean;
  handleCancel?: () => void;
  handleSave?: () => void;
  getNextPaginationData?: (nextPage: any) => void;
  pagerList?: Tpager;
  actions?: string[];
};

export type TgapGenerateReportPayload = {
  page?: number;
  limit?: number;
  reportFileName?: string;
  startDate?: string;
  endDate?: string;
  agency?: string;
  regulation?: string;
  isGapPresent?: 'yes' | 'no';
};

export type TauditGenerateReportPayload = {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  agency?: string;
  regulation?: string;
  reportFileName?: string;
};
export type TgetlistOfGeneartedReportListPayload = {
  page?: number;
  limit?: number;
};
