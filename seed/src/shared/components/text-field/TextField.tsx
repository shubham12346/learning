import { useState } from 'react';
import { TextField as MuiTextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Tooltip } from 'src/shared/components/index';

export const TextField = (props) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleIconClick = () => {
    // Toggle the tooltip when the icon is clicked
    setTooltipOpen(!isTooltipOpen);
  };
  const {
    required = false,
    id = 'validation-outlined-input',
    label,
    name,
    type = 'text',
    value = '',
    variant = 'outlined',
    error = false,
    helperText = '',
    disabled = false,
    InputProps,
    inputProps,
    onBlur,
    placeholder = 'Enter here',
    onChange,
    showRequired = false,
    showInfoIcon = false,
    tooltipTitle = '',
    textareaRows = 0,
    multiline = false,
    isBold = false,
  } = props;

  return (
    <Box className={`${multiline ? 'multilineInput' : ''} textFields`}>
      <Typography variant="body2" sx={{ mb: '6px' }} align="left">
        <Box className="d-flex">
          <Box>
            {isBold ? (
              <span className="onboardingQuestion"> {label}</span>
            ) : (
              label
            )}
            {showRequired && <span style={{ color: '#E73A35' }}>*</span>}
          </Box>
          <Box sx={{ ml: 2 }}>
            {showInfoIcon && (
              <Tooltip
                open={isTooltipOpen}
                title={tooltipTitle}
                onClose={() => handleIconClick()}
                className="tooltipText"
              >
                <Box
                  className="icon-info cursorPointer"
                  onClick={() => handleIconClick()}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      </Typography>
      <MuiTextField
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        variant={variant}
        disabled={disabled}
        id={id}
        multiline={multiline}
        type={type}
        rows={textareaRows}
        error={error}
        helperText={helperText}
        inputProps={{ ...inputProps }}
        InputProps={{
          ...InputProps
        }}
        onFocus={(event) => {
          //adding this line to remove browser autofill
          event.target.setAttribute('autocomplete', 'new-password');
        }}
      />
    </Box>
  );
};
