import {
  BadgeProps as MulBadgeProps,
  BadgeOrigin,
  BadgeClasses
} from '@mui/material';
import { ReactNode } from 'react';

export interface BadgeProps extends MulBadgeProps {
  className: string;
  badgeContent: string;
  anchorOrigin: BadgeOrigin;
}
