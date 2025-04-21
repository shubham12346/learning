import React from 'react';
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps
} from '@mui/material';

type Variant =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'primary'
  | 'secondary'
  | 'inherit';

export interface CircularProgressProps extends MuiCircularProgressProps {
  color?: Variant;
  size?: number;
  thickness?: number;
}
