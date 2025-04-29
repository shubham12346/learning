import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material';

export interface NumberFormatCustomProps {
  onChange: (event: { target: { value: string } }) => void;
}
export type TextFieldProps =
  | StandardTextFieldProps
  | FilledTextFieldProps
  | OutlinedTextFieldProps;
