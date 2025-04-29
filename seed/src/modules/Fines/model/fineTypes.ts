export interface GraphFilterProps {
  selectedYear: any;
  handleSelectedYear: (e: any) => void;
  yearOptions: any[];
  selectedAgency: any;
  handleSelectedAgency: (e: any) => void;
  agencyOptions: any[];
}

export type FilterOptions = {
  agency?: {
    name: string;
    id: string;
    value: string;
    label: string;
  }[];
  fineRange?: {
    id: number;
    label: string;
    value: number;
    name: string;
  }[];
};


export interface TableFilterProps {
  agenciesList: any[];
  fineAmountList: any[];
  yearList: any[];
  searchKeyword: string;
  handleSearch: (e: any) => void;
  selectedYear: any;
  handleSelectedYear: (e: any) => void;
  onFilterChange: (filter: FilterOptions,resetFlag?:boolean) => void;
}

export interface EnforcementTablePropsTypes {
  getNextPagination?: (nextPage: any) => void;
  pager?: any;
  tableListData?: any[];
  loader: boolean;
  setDirectionOnChangeSort?: (event: any) => void;
}
export interface EnforcementTaskModelType {
  handleClose: () => void;
  open: boolean;
  selectedRow: any;
}

export interface FineDonutGraphProps {
  graphData: any;
  handleSelectedDonutSection: (seriesPoint, labelName, dataIndex) => void;
  selectedSection: { seriesPoint: ''; labelName: ''; dataIndex: number };
  labelName: string[];
  seriesData: number[];
}
export interface FineGraphsInnerCardTypes {
  title: any;
  descriptions: string;
}

export interface FinehorizontalBraGraphTye {
  series?: { data: number[] }[];
  colrs?: string[];
  xAxisCategories?: string[];
  yAxisTitle?: string;
  xAxisTitle?: string;
  width?: number | any;
  height?: number | any;
}

export interface BarGraphDataType {
  labelName: string[];
  seriesData: number[];
  maxFine: number;
}

export interface DonutGraphDataTyps {
  seriesData: number[];
  labelsName: string[];
  graphsCardData: {
    allAgencyFine: string;
    averageFine: string;
    totalEnforcementAction: string;
  };
}
export interface FineGraphsComponentTypes {
  donutGraphData: DonutGraphDataTyps;
  horizonatlGraphData: any;
  donutGraphLoader: boolean;
  barGraphLoader: boolean;
  handleSelectedDonutSection: (a: any, b: any, c: any) => void;
  selectedSection: { seriesPoint: ''; labelName: ''; dataIndex: number };
  selectedAgency: string;
}

export interface DonutGraphType {
  regulatoryOrganization: any;
  graphsCardData: {
    allAgencyFine: string;
    averageFine: string;
    totalEnforcementAction: string;
  };
}
export type AgncyType = {
  allAgencyFine: string;
  averageFine: string;
  finePercent: string;
  regulatoryOrganizationName: string;
  totalEnforcementAction: string;
};

export type DonutGraphDataTypes = {
  seriesData: number[];
  labelsName: string[];
  graphsCardData: {
    allAgencyFine: string;
    averageFine: string;
    totalEnforcementAction: string;
  };
};

export interface EnforcementActionAPIArguments {
  searchKeyword?: string;
  agency?: string;
  year: string;
  page: number;
  limit: number;
  fineAmount?: string;
  sortOrder?: string;
}

export interface BarGraph {
  year?: string;
  agency?: string;
}
