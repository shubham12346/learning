import React, { useState } from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  FormHelperText,
  Box
} from '@mui/material';
import { CombinedProps } from './services/selectInterface';
import Typography from '../typography/Typography';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip } from '../tooltip/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
  menuitem: {
    direction: 'rtl'
  },
  menuitemhidden: {
    display: 'none'
  }
}));
export const Select = ({
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
  onClose,
  onBlur,
  onChange,
  showRequired = false,
  showInfoIcon = false,
  tooltipTitle = '',
  CustomListComponent = undefined,
  isCustomListComponent = false,
  ...props
}: CombinedProps) => {
  const classes = useStyles();

  const renderOption = (option: any) => (
    <MenuItem
      key={option[itemValue]}
      disabled={option['disabled'] || false}
      value={option[itemValue]}
    >
      <>
        {isCustomListComponent ? (
          <CustomListComponent
            option={option}
            itemValue={option[itemValue]}
            itemText={option[itemText]}
          />
        ) : (
          option[itemText]
        )}
      </>
    </MenuItem>
  );
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleIconClick = () => {
    // Toggle the tooltip when the icon is clicked
    setTooltipOpen(!isTooltipOpen);
  };

  return (
    <FormControl
      data-testid="selectinput"
      className="selectformcontrol w-100"
      error={error}
    >
      <Typography variant="body2" sx={{ mb: '6px' }} align="left">
        <Box className="d-flex">
          <Box>
            {label}
            {showRequired && <span style={{ color: '#E73A35' }}>*</span>}
          </Box>
          <Box sx={{ ml: 2 }}>
            {showInfoIcon && (
              <Tooltip
                open={isTooltipOpen}
                title={tooltipTitle}
                onClose={() => handleIconClick()}
              >
                {
                  <Box
                    className="icon-info cursorPointer"
                    onClick={() => handleIconClick()}
                  />
                }
              </Tooltip>
            )}
          </Box>
        </Box>
      </Typography>
      <MuiSelect
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        name={name}
        id={id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        IconComponent={ExpandMoreIcon}
        onBlur={onBlur}
        onClose={onClose}
        placeholder={placeholder}
        multiple={isMultiple}
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

          '& .MuiSvgIcon-root ': {
            fill: '#121433',
            top: '12px'
          }
        }}
        MenuProps={{
          PaperProps: {
            className: 'customSelect',
            style: {
              maxHeight: '15rem',
              maxWidth: '25rem'
            }
          }
        }}
        renderValue={
          value == 'none' || null || undefined
            ? () => (
                <p
                  style={{
                    color: '#121433',
                    opacity: 0.699999988079071
                  }}
                >
                  {placeholder}
                </p>
              )
            : undefined
        }
      >
        {options.map((option) => renderOption(option))}
      </MuiSelect>
      <FormHelperText className="formFieldErrorState">
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};
