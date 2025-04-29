import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import ErrorHelperText from 'src/shared/components/common/ErrorHelperText';
import { DATE_FORMATS } from 'src/shared/constants/constants';

interface EnforcementDetailsProps {
  dateError?: string;
  iconUrl?: string;
  enforcementLabel?: string;
  enforcementValue?: string | number;
  iconClassName?: string;
  isEditable?: boolean;
  enforcementDateProps?: {
    inputName: string;
    enforcementDate: Date | null;
    handleEnforcementDate: (
      inputName: string,
      date: any,
      keyboardInputValue?: string
    ) => void;
  };
}

function EnforcementDetails({
  iconClassName,
  enforcementLabel,
  enforcementValue,
  enforcementDateProps,
  isEditable = false,
  dateError
}: EnforcementDetailsProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenEnforcementDate, setIsOpenEnforcementDate] = useState(false);

  const openEnforcementDate = (event: any) => {
    setIsOpenEnforcementDate(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box className="enforcement">
      <Box className="d-flex enforcementSection">
        <Box className="flex-basic-center">
          <Box sx={{ mr: 5 }} className="iconBox flex-basic-center">
            <Box className={iconClassName}></Box>
          </Box>
        </Box>
        <Box>
          <Box sx={{ mb: 1 }} className="enforcementLabel">
            {enforcementLabel}
          </Box>
          {isEditable ? (
            <Box className="datePickerContainer p-relative">
              <DatePicker
                open={isOpenEnforcementDate}
                onClose={() => {
                  setIsOpenEnforcementDate(false);
                }}
                inputFormat={DATE_FORMATS.MONTH_DATE_YEAR}
                disableMaskedInput
                value={enforcementDateProps.enforcementDate || null}
                autoFocus={true}
                onChange={(date, keyboardInputValue) => {
                  enforcementDateProps.handleEnforcementDate(
                    enforcementDateProps.inputName,
                    date,
                    keyboardInputValue
                  );
                }}
                PopperProps={{
                  placement: 'bottom-end',
                  anchorEl: anchorEl,
                  className: 'datePickerPopover'
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={(e) => {
                              openEnforcementDate(e);
                            }}
                          >
                            <Box className="icon-date-picker" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {dateError && <ErrorHelperText message={dateError} />}
            </Box>
          ) : (
            <Box className="enforcementValue enforcementLabel textWeightMedium">
              {enforcementValue}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EnforcementDetails;
