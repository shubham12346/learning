import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ErrorHelperText from 'src/shared/components/common/ErrorHelperText';

export type sourceUrlInputType = {
  iconClassName: string;
  value: string;
  handleOnChange: (event?: any, inputName?: string) => void;
  inputName: string;
  errorText?: string;
  isFieldEditable?: boolean;
};

const SourceUrlInput = (props: sourceUrlInputType) => {
  const {
    handleOnChange,
    iconClassName,
    value,
    inputName,
    errorText,
    isFieldEditable = true
  } = props;
  const { t } = useTranslation('adminRegulation');

  return (
    <Box className="enforcement">
      <Box className="d-flex enforcementSection ">
        <Box className="flex-basic-center">
          <Box sx={{ mr: 5 }} className="iconBox flex-basic-center">
            <Box className={iconClassName}></Box>
          </Box>
        </Box>
        <Box className="flex-column-start w-100">
          <Typography className="enforcementLabel" align="left">
            {'Source Link'}
          </Typography>
          <Tooltip title={value?.trim()?.length === 0 ? '' : value}>
            {isFieldEditable ? (
              <TextField
                className="sourceInput "
                margin="normal"
                required
                fullWidth
                name={inputName}
                type={'text'}
                id="password"
                value={value}
                placeholder={t('sourceUrlLink')}
                onChange={(e) => {
                  handleOnChange(e, inputName);
                }}
              />
            ) : (
              <Typography>
                {value.length > 30 ? value.slice(0, 30) + '...' : value}
              </Typography>
            )}
          </Tooltip>
          {errorText && <ErrorHelperText message={errorText} />}
        </Box>
      </Box>
    </Box>
  );
};

export default SourceUrlInput;
