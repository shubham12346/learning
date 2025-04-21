import { ChipProps as MulChipProps } from '@mui/material';
import { ReactElement } from 'react';

export interface ChipProps extends MulChipProps {
  lable: string;
  avatar?: ReactElement<SVGRectElement | string>;
  deleteIcon?: ReactElement<SVGRectElement>;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
  onDelete?: () => void;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}
