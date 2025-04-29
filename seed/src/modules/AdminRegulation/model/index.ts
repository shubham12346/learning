import { SelectChangeEvent } from '@mui/material';
import { RegulatoryList } from 'src/modules/Regulations/model/RegulationsInterface';
import { ModalType } from '../hooks/useRegulation';

export interface RegulatoryOrganization {
  regulatoryBodyId: string;
  regulatoryBodyName: string;
  regulationCount: number;
}
export type Regulation = {
  id: string;
  name: string;
  organization: string;
  organizationId: string;
  shortSummary: string;
  version: number;
  sourceLink: string | null;
  regulationType: string;
  procedure: string;
  policy: string;
};

type Task = {
  id: string;
  title: string;
  targetDate: Date;
};

export type RegulationDetailType = {
  regulationId: string;
  regulationName: string;
  regulatoryBody: string;
  regulatoryOrganizationId: string;
  regulationEnforcementDate: Date;
  regulationNoticeDate: Date;
  summary: string;
  regulationType: 'final' | 'proposed' | 'library';
  sourceDocumentLink: string;
  tasks: regulationObligationType[];
  averyPolicy: string;
  averyProcedure: string;
  version: number;
};

export type adminRegulationState = {
  regulatoryOrganization: RegulatoryList[] | [];
  regOrgLoading: boolean;
  regulationListLoading: boolean;
  regulationList: Regulation[];
  regulationListBasedOnOrganization: Regulation[];
  regulationDetailLoading: boolean;
  regulationDetail: RegulationDetailType;
  regulationBody: string;
  regulationTypeDropdown: regulationDropdownType[] | [];
  regulationOrgDropdown: regBodyType[] | [];
  regulationTypeDropdownLoader: boolean;
  regulationOrgDropdownLoader: boolean;
};

export type selectRegulationOrgType = {
  handleRegulatoryBodyChange?: (
    event: SelectChangeEvent<unknown>,
    inputName?: string
  ) => void;
  selectOptions?: { id: string; name: string }[] | [];
  selectedRegBody?: string;
};
export type regulationSearchedType = {
  id?: string;
  name?: string;
  organization?: string;
  organizationId?: string;
  shortSummary?: string;
  version?: null | string;
};

export type regulationObligationType = {
  id: number | string;
  title: string;
  targetDate: string | Date;
};

export type regulationTitleHeaderType = {
  inputName: string;
  regulatoryBodyName?: string;
  regulationName?: string;
  regulationType?: string;
  selectRegulation?: selectRegulationOrgType;
  tabType?: 'evaluateRegulation' | 'libraryRegulation';
  handleEditFields?: () => void;
  isFieldEditable?: boolean;
};
export type dates = {
  dateOfRegulationNotice: null | Date;
  dateOfEnforcement: null | Date;
};
export type editRegulationFormDetailsType = {
  regulationSummary: string;
  regulationPolicy: string;
  regulationProcedure: string;
  sourceUrlLink: string;
  regulatoryBody: string;
};

export type editRegulationFormErrorType = {
  dateOfRegulationNotice: string;
  dateOfEnforcement: string;
  regulationSummary: string;
  regulationPolicy: string;
  regulationProcedure: string;
  regulationObligations?: boolean[];
  sourceUrlLink: string;
};

export type handleObligationChangeType = (
  index: number,
  text: string,
  date: string | Date,
  keyboardInputValue?: string
) => void;

export type handleObligationDeleteType = (index: number) => void;
type ButtonType = 'PREV' | 'NEXT' | 'SUBMIT' | 'UPDATE';

type Button = {
  isShow: boolean;
  isDisable: boolean;
  buttonType: ButtonType;
};

export type UIButtonComponent = {
  prevButton: Button;
  nextButton: Button;
  submitButton: Button;
  onUpdate: Button;
};
export type handleButtonActionsType = (
  event: any,
  buttonType: string,
  regulationDetail?: RegulationDetailType,
  editRegulationField?: editRegulationFormDetailsType
) => void;

export type handleReadMoreType = (
  inputName: string,
  title: string,
  regulationDetail: RegulationDetailType
) => void;

export type handleOnChangeType = (event?: any, inputName?: string) => void;
export type handleDateChangeType = (
  inputName: string,
  date: any,
  keyboardInputValue?: string
) => void;

export type editRegulationType = {
  buttons: UIButtonComponent;
  regulationDetail: RegulationDetailType;
  selectRegulationOrg: selectRegulationOrgType;
  editRegulationField: editRegulationFormDetailsType;
  regulationObligations: regulationObligationType[];
  dates: dates;
  handleDateChange: handleDateChangeType;
  handleOnChange: handleOnChangeType;
  handleReadMore: handleReadMoreType;
  handleButtonActions: handleButtonActionsType;
  errorObj?: editRegulationFormErrorType;
  handleObligation: {
    handleObligationChange: handleObligationChangeType;
    handleObligationDelete: handleObligationDeleteType;
    handleObligationAdd: handleObligationDeleteType;
  };
  handleModalChange: (modalType: ModalType) => void;
  tabType?: 'evaluateRegulation' | 'libraryRegulation';
};

export type regulationBottomActionsType = {
  regulationDetail?: RegulationDetailType;
  buttons: UIButtonComponent;
  editRegulationField: editRegulationFormDetailsType;
  handleButtonActions: handleButtonActionsType;
};

export type RegulationCalendarType = {
  dateOfRegulationNoticeError?: string;
  dateOfEnforcementError?: string;
  errorObj?: editRegulationFormErrorType;
  dates: dates;
  sourceUrlLink: string;
  handleDateChange: (
    inputName: string,
    date: any,
    keyboardInputValue?: string
  ) => void;
  handleOnChange: (event?: any, inputName?: string) => void;
  isFieldEditable?: boolean;
};

export type editRegStateType = {
  inputName: string;
  title: string;
  RegulatoryBody: string;
  RegulationName: string;
  openModal: boolean;
  text: string;
};
export type submitRegulationType = {
  openModal: boolean;
};

export interface TextAreaWithReadMoreProps {
  title: string;
  limit: number;
  text: string;
  value: string;
  textAreaRows?: number;
  handleOnChange: (event: any, inputName: string) => void;
  handleReadMore: handleReadMoreType;
  inputName: string;
  regulationDetail?: RegulationDetailType;
  errorText?: string;
  placeholder?: string;
}

export interface EditRegulationModalPropsType {
  regulationDetail?: RegulationDetailType;
  inputName: string;
  title: string;
  RegulatoryBody: string;
  RegulationName: string;
  openModal: boolean;
  text: string;
  handleSave: handleButtonActionsType;
  handleOnChange: (event: any, inputName: string) => void;
  handleModalClose: (modalType: string) => void;
}
export interface RegulationObligationListProps {
  regulationsData: regulationObligationType[];
  heading?: string;
  buttonText?: string;
  inputName: string;
  handleObligationChange: handleObligationChangeType;
  handleObligationDelete: handleObligationDeleteType;
  handleObligationAdd: handleObligationDeleteType;
  isEditable?: boolean;
}

export type submitModalType = {
  title?: string;
  description1?: string;
  description2?: string;
  submitText: string;
  cancelText: string;
  showModal: boolean;
  handleSubmit: (e) => void;
  handleClose: (actionType: string) => void;
  extraButtonText?: string;
  extraButtonAction?: (e) => void;
  showExtraButton?: boolean;
};

export type regulationDropdownType = {
  name: string;
  displayName: string;
};

export type regBodyType = {
  id: string;
  name: string;
};
