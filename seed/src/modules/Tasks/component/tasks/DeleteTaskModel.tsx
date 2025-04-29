import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, SimpleDialog } from 'src/shared/components/index';
import { DeleteTaskModalProps } from '../../model/taskModel';

export const DeleteTaskModal = ({
  handleClose,
  open,
  handleDelete,
  selectedRow
}: DeleteTaskModalProps) => {
  //constant
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const title =
    selectedRow?.taskname || selectedRow?.taskName || selectedRow?.eventTitle;
  return (
    <SimpleDialog
      model_title={
        <Box sx={{ mb: '1.25rem' }} className="w-100">
          <Box className="textalign">
            <Typography variant="h3" className="textweight">
              {t('deleteTaskTitle')}
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
              <span className="textweight ml-3">{title}</span>?
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
            sx={{ py: 2.5, px: 8 }}
          />

          <Button
            onClick={handleDelete}
            variant="contained"
            btnText="Delete"
            sx={{ py: 2.5, px: 8, ml: 6 }}
          />
        </Box>
      }
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
