import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Button,
  SimpleDialog,
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/index';

import { deleteTask } from '../api/actionplanApi';

interface DeleteTaskModalProps {
  handleClose: () => void;
  getUpdatedActionPlanDetails?: () => void;
  modalTitle: string;
  open: boolean;
  selectedItem: any;
  taskName?: string;
  actionPlanVersionUid?: string;
}

export const DeleteTaskModal = ({
  handleClose,
  modalTitle,
  open,
  selectedItem,
  actionPlanVersionUid,
  getUpdatedActionPlanDetails,
  taskName
}: DeleteTaskModalProps) => {
  //constant
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  //methods
  async function handleDeleteTask() {
    try {
      const respData = await deleteTask(
        actionPlanVersionUid,
        selectedItem?.taskUid
      );
      if (respData?.message == t('taskDeletedSuccess')) {
        handleClose();
        showSuccessMessage(respData?.message, '', {
          position: 'top-right'
        });
        getUpdatedActionPlanDetails();
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    }
  }
  return (
    <SimpleDialog
      model_title={
        <Box sx={{ mb: 5 }} className="w-100">
          <Box className="textalign">
            <Typography variant="h3" className="textweight">
              {modalTitle}
            </Typography>
          </Box>
        </Box>
      }
      model_content={
        <Box
          sx={{
            p: 8,
            minWidth: smallDevice ? '360px' : '670px'
          }}
          className="flex-basic-center"
        >
          <Box>
            <Typography variant="h4" className="textItalic">
              {t('deleteTaskMessage')}
              <span className="textweight ml-4">
                {selectedItem?.taskName || taskName}
              </span>{' '}
              ?
            </Typography>
          </Box>
        </Box>
      }
      model_actions={
        <Box className="flex-basic-center w-100 mt-20">
          <Button
            onClick={handleClose}
            variant="outlined"
            btnText="Cancel"
            sx={{ py: 2.2, px: 8 }}
          />

          <Button
            onClick={handleDeleteTask}
            variant="contained"
            btnText="Delete"
            sx={{ py: 2.2, px: 8, ml: 6 }}
          />
        </Box>
      }
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
