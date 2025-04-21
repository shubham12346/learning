import React from 'react';
import {
  Select as MuiSelect,
  SelectProps,
  InputLabelProps,
  OutlinedInputProps
} from '@mui/material';

export type TcustomListComponentProps = {
  option: any;
  itemText: string;
  itemValue: string;
};
interface CustomSelectProps {
  options: object[];
  label: string;
  isMultiple?: boolean;
  defaultValue?: string | number;
  value?: string | number | string[];
  isObject?: boolean;
  itemValue: string;
  itemText: string;
  showRequired?: boolean;
  showInfoIcon?: boolean;
  tooltipTitle?: string;
  helperText?: string;
  isCustomListComponent?: boolean;
  CustomListComponent?: React.FC<TcustomListComponentProps>;
}

export type CombinedProps = CustomSelectProps &
  SelectProps &
  InputLabelProps &
  OutlinedInputProps;
