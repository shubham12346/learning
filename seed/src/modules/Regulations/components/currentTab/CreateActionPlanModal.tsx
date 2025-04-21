import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import { generateActionPlanForRegulation } from '../../apis/RegulationsApi';
import { showErrorMessage } from 'src/shared/components/toaster/Toast';

interface CreateActionPlanModalProps {
  modalTitle: string;
  handleClose: () => void;
  goToActionPlanClick: (regulationId) => void;
  open: boolean;
  regulationId: string;
}

function CreateActionPlanModal({
  modalTitle,
  handleClose,
  open,
  goToActionPlanClick,
  regulationId
}: Readonly<CreateActionPlanModalProps>) {
  const { t } = useTranslation('regulations');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  //methods
  const getGenerateActionPlan = async () => {
    try {
      let respData = await generateActionPlanForRegulation(regulationId);
      if (respData.message === 'Action plan created successfully') {
        goToActionPlanClick(regulationId);
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    }
  };

  return (
    <SimpleDialog
      model_title={
        <Box sx={{ mb: '1.25rem' }} className="w-100">
          <Box className="textalign">
            <Typography variant="h3" className="textweight">
              {modalTitle}
            </Typography>
          </Box>
          <Box>
            <Tooltip title={t('closeTitle')} arrow>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className="close-icon-modal"
                sx={{ position: 'absolute', right: 24, top: 20 }}
                disableRipple={true}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      }
      model_content={
        <Box className="mt-48" sx={{ minWidth: smallDevice ? '' : '704px' }}>
          <Box className="flex-basic-center mb-40">
            <Box>
              <Button
                variant="contained"
                type="submit"
                btnText="Generate Action Plan"
                onClick={() => {
                  getGenerateActionPlan();
                }}
                sx={{ py: '0.62rem', px: '2rem', minWidth: '282px' }}
              />
            </Box>
            <Box className="d-flex" sx={{ ml: 4 }}>
              <Tooltip
                title={t('generateActionPlanTooltipText')}
                arrow
                placement="right"
              >
                <Box className="icon-info iconStyle cursorPointer"></Box>
              </Tooltip>
            </Box>
          </Box>
          {/* <Box className="flex-basic-center mb-14 mt-14">
              <Box>
                <Typography variant="h5" className="textWeightMedium">
                  or
                </Typography>
              </Box>
            </Box>
            <Box className="flex-basic-center">
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  btnText="Upload Existing Action Plan"
                  onClick={() => {}}
                  sx={{ py: '0.62rem', px: '2rem' }}
                />
              </Box>
              <Box className="d-flex" sx={{ ml: 4 }}>
                <Tooltip
                  title={t('uploadExistingActionPlanTooltipText')}
                  arrow
                  placement="right"
                >
                  <Box className="icon-info iconStyle cursorPointer"></Box>
                </Tooltip>
              </Box>
            </Box>
            <Box
              sx={{ pr: 7 }}
              className="flex-basic-center supportedText mt-16"
            >
              {t('supportedText')}
            </Box> */}
        </Box>
      }
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
}

export default CreateActionPlanModal;
