export type FormFieldType = {
  id?: string;
  name: string;
  type: FieldType;
  label?: string;
  options?: any[];
  itemValueKey?: string;
  itemLabelKey?: string;
  isDisabled?: boolean;
  isDirectionRow?: boolean;
  textareaRows?: number | string;
  placeholder?: string;
  isMultiple?: boolean;
  showRequired?: boolean;
  validations?: FieldValidations;
  errorMessages?: FieldValidationsErrorMessages;
  uniqueData?: any[];
  uniqueDataKey?: string;
  value?: any;
  showInfoIcon?: boolean;
  multiline?: boolean;
  tooltipTitle?: any;
  minDate?: string | any;
  maxDate?: string;
  helperText?: any;
  inputFormat?: any;
  textareaRowsLine?: number | string;
  handleFieldChange?: (event, field, value?) => void;
  isReadOnly?: boolean;
  isBold?: boolean;
};

export type FieldType =
  | 'text'
  | 'radio'
  | 'email'
  | 'select'
  | 'password'
  | 'checkbox'
  | 'textarea'
  | 'number_only'
  | 'autocomplete'
  | 'checkbox_group'
  | 'integer_only'
  | 'switch'
  | 'multi-select'
  | 'regex'
  | 'date';

export type FieldValidations = {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  regex?: RegExp;
  email?: boolean;
  uniqueDataValidation?: boolean;
  minLength?: number;
  maxLength?: number;
  password?: boolean;
  json?: boolean;
};

export type FieldValidationsErrorMessages = {
  requiredErrMsg?: string;
  minValueErrMsg?: string;
  maxValueErrMsg?: string;
  regexErrMsg?: string;
  emailErrMsg?: string;
  uniqueFieldDataErrMsg?: string;
  minLengthErrMsg?: string;
  maxLenghtErrMsg?: string;
  passwordErrMsg?: string;
  jsonErrMsg?: string;
};
