import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import React from 'react';
import { CheckBox } from '../index';
import { CheckboxGroupProps } from './service/checkboxGroupIntreface';

export const CheckboxGroup = ({
  options,
  field,
  legendTitle,
  itemValueKey,
  itemLabelKey,
  helperText,
  directionRow = false
}: CheckboxGroupProps) => {
  return (
    <>
      <FormLabel>{legendTitle}</FormLabel>
      <FormGroup row={directionRow}>
        {options?.map((option) => (
          <FormControlLabel
            key={option[itemValueKey]}
            control={
              <CheckBox
                {...field}
                checked={field?.value?.includes(option[itemValueKey]) || false}
                value={option[itemValueKey] || ''}
              />
            }
            label={option[itemLabelKey]}
          />
        ))}
      </FormGroup>
      <FormHelperText sx={{ ml: 0 }} className="formFieldErrorState">
        {helperText}
      </FormHelperText>
    </>
  );
};

export default CheckboxGroup;
