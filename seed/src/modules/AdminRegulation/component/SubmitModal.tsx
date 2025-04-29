import { Box, Typography } from '@mui/material';
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import { Button } from 'src/shared/components/button/Button';
import { submitModalType } from '../model';

const SubmitModal = (props: submitModalType) => {
  const {
    handleClose,
    handleSubmit,
    showModal,
    cancelText = 'Cancel',
    submitText = 'Continue',
    description1 = 'Confirming will move the regulation to the library tab',
    title = 'SUBMIT',
    extraButtonText = '',
    extraButtonAction = () => {},
    showExtraButton = false
  } = props;

  return (
    <SimpleDialog
      model_title={
        <Box sx={{ mb: '1.25rem' }} className="w-100">
          <Box className="textalign">
            <Typography variant="h3" className="textweight">
              {title}
            </Typography>
          </Box>
        </Box>
      }
      model_content={
        <Box
          sx={{
            pb: 15
          }}
        >
          <Box
            className={'text-center textItalic'}
            sx={{
              px: 8,
              pb: 5,
              minWidth: '670px'
            }}
          >
            <Typography variant="h4">{description1}</Typography>
          </Box>
        </Box>
      }
      model_actions={
        <Box className="flex-basic-center w-100">
          <Button
            onClick={() => {
              handleClose('submit');
            }}
            variant="outlined"
            btnText={cancelText}
            sx={{ py: '0.62rem', px: '2rem' }}
          />

          {showExtraButton && (
            <Button
              onClick={extraButtonAction}
              variant="contained"
              btnText={extraButtonText}
              sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
            />
          )}

          <Button
            onClick={handleSubmit}
            variant="contained"
            btnText={submitText}
            disabled={false}
            sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
          />
        </Box>
      }
      open={showModal}
      onClose={handleClose}
      modelSize={'md'}
    />
  );
};

export default SubmitModal;
