import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '../../../shared/components/text-field/TextField';
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Tooltip
} from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
import { DATE_FORMATS } from 'src/shared/constants/constants';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RegulationObligationListProps } from '../model';
import ErrorHelperText from 'src/shared/components/common/ErrorHelperText';
import { useTranslation } from 'react-i18next';
import ReadMore from 'src/shared/components/read-more/ReadMore';

const RegulationObligationList = (props: RegulationObligationListProps) => {
  const {
    handleObligationChange,
    handleObligationDelete,
    handleObligationAdd,
    regulationsData,
    isEditable = true
  } = props;

  const { t } = useTranslation('adminRegulation');

  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const openDate = (event: any, index: number) => {
    setSelectedDateIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDate = () => {
    setSelectedDateIndex(null);
  };

  return (
    <Box>
      <Typography variant="h4" className="mb-15">
        {props.heading}
        {regulationsData.length === 0 && (
          <ErrorHelperText message={t('addRegulationObligationError')} />
        )}
      </Typography>
      <Box>
        {regulationsData?.map((regulation, index) => (
          <Box key={`${props.heading}-${index}`}>
            <Box className="d-flex" sx={{ gap: '10px' }}>
              <Box className="datePickerContainer p-relative">
                <DatePicker
                  disabled={!isEditable}
                  open={selectedDateIndex === index}
                  onClose={handleCloseDate}
                  inputFormat={DATE_FORMATS.MONTH_DATE_YEAR}
                  disableMaskedInput
                  value={regulation?.targetDate || ''}
                  autoFocus={true}
                  onChange={(date, keyboardInputValue) => {
                    handleObligationChange(
                      index,
                      regulation?.title,
                      date || '',
                      keyboardInputValue
                    );
                  }}
                  PopperProps={{
                    placement: 'auto',
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
                                openDate(e, index);
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
              </Box>
              {isEditable ? (
                <TextField
                  disabled={!isEditable}
                  value={regulationsData[index]?.title}
                  onChange={(e) => {
                    handleObligationChange(
                      index,
                      e.target.value,
                      regulation?.targetDate
                    );
                  }}
                />
              ) : (
                <Box className="w-80 p-10">
                  <ReadMore
                    text={regulationsData[index]?.title}
                    maxCharacters={100}
                    typographyVariant={'body2'}
                    charsToShow={100}
                  />
                </Box>
              )}
              {isEditable && (
                <Tooltip title={'Delete'} arrow>
                  <IconButton
                    aria-label="close"
                    onClick={() => handleObligationDelete(index)}
                    className="close-icon-modal "
                    disableRipple={true}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Box>
              {(!regulation.title || !regulation.targetDate) && (
                <ErrorHelperText message={t('thisFieldIsMandatoryError')} />
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ paddingTop: '15px' }}>
        <Button
          disabled={!isEditable}
          onClick={() => {
            handleObligationAdd(regulationsData?.length);
          }}
          btnText={props.buttonText}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default RegulationObligationList;
