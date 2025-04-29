export type Tcategory = {
  categoryName: string;
  total: number;
  uploaded: number;
  id: number | string;
  handleSelectedCategory: (category: any) => void;
  selectedCategory: any;
  category: any;
};

export type TsidePanel = {
  handleSelectedCategory: (category: any) => void;
  selectedCategory: Tcategory;
  sideNavList: any[];
  sideNavLoading: boolean;
};

export type TFileContainerHeader = {
  title?: string;
  isCreateNewButoon?: boolean;
  handleCreateNewName?: () => void;
  isRunGapAnalysisButton?: boolean;
  handleRunGapAnalysis?: (value: boolean) => void;
  isViewGapAssessmentButton?: boolean;
  handleViewGapAssessment?: () => void;
  isRunGapAnalysisButtonDisabled?: boolean;
  createNewCategoryButtonDisable?: boolean;
};

export type TfileComponent = {
  handleSelected: (item: any) => void;
  name?: string;
  fileName?: string;
  lastModifiedDate?: string;
  uploadedAt?: string;
  key?: any;
  item?: any;
  selectedItem?: any;
  handleClose?: any;
  handleDeleteFile: any;
  categoryName?: string;
};

export type TfileUploadComponent = {
  category: any;
  subCategory: {
    name: string;
    id: string;
  };
  totalFile: any[];
  handleDeleteFile?: any;
  fileLoader: boolean;
  selectedSubCategoryTitle: string;
  setSelectedSubCategory: any;
  handleUploadFile: any;
  handleSubCategoryDelete?: (subCategoryTitle) => void;
  regulationStatus?:
    | 'gapAssessmentDone'
    | 'gapAssessmentInProgress'
    | 'fileUploaded'
    | 'fileNotUploaded';
  isMultiple?: boolean;
};

export type TexpandCollapseComponent = {
  selectedCategory: any;
  callTheSideNavToUpdate: () => void;
  showGapAnalysisModal: boolean;
  handleGapAnalysisModal: (value: boolean) => void;
  noOfFilesInQueueForGapAnalysis: number;
  updateUploadedFilesCount: () => void;
  handleRunGapAnalysis: () => void;
  loader: boolean;
  gapAnalysisCategoryData: any;
  handleSelectedCategory: () => void;
};
