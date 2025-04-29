import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Button, SimpleDialog } from 'src/shared/components/index';
import { useTranslation } from 'react-i18next';

interface saveReportFileModal {
  open: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  text: {
    title: string;
    description: string;
    cancelText: string;
    saveText: string;
    inputFileTemp?: string;
  };
  handleOnChange?: (e: any) => void;
  fileName?: string;
  widthClass?: string;
  disableSaveButton?: boolean;
  showErrorMessage?: boolean;
  checkLengthOfAText?: (text: string) => string;
  placeHolder?: string;
}

const SaveFileReportModal = (props: saveReportFileModal) => {
  const {
    open,
    handleCancel,
    handleSave,
    text,
    fileName,
    handleOnChange,
    widthClass = 'w-50',
    disableSaveButton = false,
    showErrorMessage = false,
    checkLengthOfAText,
    placeHolder = 'Enter File Name'
  } = props;
  const theme = useTheme();
  const { t } = useTranslation('regulations');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className="actionPlanDiscardModel">
      <SimpleDialog
        model_title={
          <>
            <Box sx={{ mb: '1.25rem' }} className="w-100">
              <Box className="textalign">
                <Typography variant="h3" className="textweight">
                  {text.title}
                </Typography>
              </Box>
            </Box>
          </>
        }
        model_content={
          <Box sx={{ pb: 10 }}>
            <Box
              className={'text-center '}
              sx={{
                px: 8,
                minWidth: smallDevice ? '360px' : '670px'
              }}
            >
              <Typography variant="h4" className="textItalic">
                {text.description}
              </Typography>
              <Box className=" d-flex justify-content-center">
                <Box className={`mt-30 ${widthClass}`}>
                  <TextField
                    value={fileName}
                    onChange={handleOnChange}
                    className="text-font-24"
                    placeholder={placeHolder}
                    inputProps={{ maxLength: showErrorMessage ? 50 : 100 }}
                  />
                  {showErrorMessage &&
                    checkLengthOfAText &&
                    checkLengthOfAText(fileName) &&
                    fileName && (
                      <Typography
                        className="mt-5 errorState"
                        variant="subtitle2"
                      >
                        {checkLengthOfAText(fileName)}
                      </Typography>
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        }
        model_actions={
          <Box className="flex-basic-center w-100">
            <Button
              onClick={handleCancel}
              variant="outlined"
              btnText={text.cancelText || 'cancel'}
              sx={{ py: '0.62rem', px: '2rem' }}
            />

            <Button
              onClick={handleSave}
              disabled={disableSaveButton}
              variant="contained"
              btnText={text.saveText || 'save'}
              sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
            />
          </Box>
        }
        open={open}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
    </Box>
  );
};

export default SaveFileReportModal;
