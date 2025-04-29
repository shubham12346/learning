import React from 'react';
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
  Theme
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export type CombinedProps = AutocompleteProps<
  any,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;
export interface StyleProps {
  currentThemes: Theme;
}

export const Autocomplete = React.forwardRef<any, CombinedProps>(
  ({ ...props }: CombinedProps, ref: any) => {
    return (
      <MuiAutocomplete popupIcon={<ArrowDropDownIcon />} ref={ref} {...props} />
    );
  }
);
 