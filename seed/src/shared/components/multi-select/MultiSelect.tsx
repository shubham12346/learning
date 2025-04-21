import React, { useState, useEffect } from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  FormHelperText,
  Box,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '../typography/Typography';
import { CombinedProps } from '../select/services/selectInterface';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import { slice } from 'lodash';
export interface MultiSelectProps extends CombinedProps {
  handleUpdateValue: (value: any) => void;
  fieldVal: any;
  form: any;
}
export const MultiSelect = ({
  isMultiple = false,
  defaultValue,
  options,
  id = 'validation-outlined-input',
  isObject,
  helperText,
  itemValue,
  itemText,
  label,
  placeholder,
  disabled = false,
  value,
  error = false,
  name,
  onBlur,
  onChange,
  fieldVal,
  form,
  handleUpdateValue,
  ...props
}: MultiSelectProps) => {
  const [selectedChips, setSelectedChips] = useState<any>([]);
  const { t } = useTranslation('english');
  const handleChipDelete = (chipToDelete) => () => {
    let updatedChips = Object.values(value).filter(
      (chip) => chip !== chipToDelete
    );
    setSelectedChips(updatedChips);
    handleUpdateValue({ updatedChips, fieldVal, form });
  };

  useEffect(() => {
    setSelectedChips(value);
  }, [value]);
  const renderCheckboxes = (option: any) => (
    <MenuItem key={option[itemValue]} value={option[itemText]}>
      <Checkbox
        icon={<Box className="check-box-mui-select"></Box>}
        checked={
          typeof value != 'number' && value.indexOf(option[itemText]) > -1
        }
      />
      <ListItemText primary={option[itemText]} />
    </MenuItem>
  );

  return (
    <FormControl
      data-testid="selectinput"
      className="selectformcontrol multiSelectBox"
      error={error}
    >
      <Typography variant="body2" sx={{ mb: '6px' }} align="left">
        {label}
      </Typography>
      <MuiSelect
        displayEmpty
        disabled={disabled}
        defaultValue={defaultValue}
        value={selectedChips}
        name={name}
        id={id}
        onBlur={onBlur}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        placeholder={placeholder}
        IconComponent={ExpandMoreIcon}
        multiple={true}
        sx={{
          height: '48px',
          backgroundColor: '#F5F7FD',
          '.MuiOutlinedInput-notchedOutline': {
            border: !error ? '0' : '1px solid'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3F4159',
            borderStyle: 'solid',
            borderWidth: '1px'
          },
          // '&:hover .MuiOutlinedInput-notchedOutline': {
          //   borderColor: 'rgba(228, 219, 233, 0.25)'
          // }
          '& .MuiSvgIcon-root ': {
            fill: '#3F4159',
            top: '12px'
          }
        }}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: '15rem' },
            className: 'multiselectList'
          }
        }}
        renderValue={(selected) => {
          if (typeof selected === 'object' && selected.length === 0) {
            return (
              <p style={{ color: '#121433', opacity: 0.699999988079071 }}>
                {placeholder}
              </p>
            );
          }
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {typeof selected === 'object' &&
                selected.slice(0, 2).map((value, index) => (
                  <Chip
                    sx={{
                      '& .MuiChip-deleteIcon': {
                        color: `#4E2788`,
                        fontSize: '18px'
                      },
                      backgroundColor: '#E9E9F8',
                      borderRadius: '0.5rem',
                      border: '1px solid #D2C3D6',
                      color: '#4E2788',
                      mx: 1
                    }}
                    deleteIcon={
                      <ClearIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    key={value}
                    label={value}
                    onDelete={handleChipDelete(value)}
                  />
                ))}
              {typeof selected === 'object' && selected.length > 2 && (
                <Box className="flex-basic-center">
                  &nbsp;+{selected.length - 2}&nbsp;
                  <Typography variant={'body2'}>{t('more')}</Typography>
                </Box>
              )}
            </Box>
          );
        }}
      >
        {options.map((option) => renderCheckboxes(option))}
      </MuiSelect>
      <FormHelperText className="formFieldErrorState">
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};
