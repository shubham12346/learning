export type gapActivityListViewType = {
  gapAssessmentId?: string;
  status?: 'present' | 'absent';
  agency?: string;
  searchKeyword?: string;
  limit?: number;
  page?: number;
};

export type FilterOptionsType = {
  name: 'string';
  id: 'string';
  value: 'string';
  label: 'string';
};

export type gapActivityDetailsType = {
  gapAssessmentId: string;
  gapAssessmentName: string;
};

export type gapActivityDetailedViewFilterHeaderProps = {
  agencyFilterOptions: FilterOptionsType[];
  statusFilterOptions: FilterOptionsType[];
  gapActivityDetails: gapActivityDetailsType;
  onFilterChange?: (filter: any) => void;
  isDisabled: boolean;
};

export type Policy = {
  averyPolicy: string;
  firmPolicy: string;
  gap: string;
};

export type gapActvityRegulationsType = {
  businessRegulationPolicyId: string;
  gapAssessmentId: string;
  gapAssessmentName: string;
  agency: string;
  regulationName: string;
  version: string;
  dateOfAnalysis: string;
  gapStatus: string;
  policy: Policy;
};

export type filtersType = {
  agency?: FilterOptionsType[];
  status?: FilterOptionsType[];
};
