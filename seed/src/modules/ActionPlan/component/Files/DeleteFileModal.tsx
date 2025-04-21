import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, SimpleDialog } from 'src/shared/components/index';

interface DeleteTaskModalProps {
  handleClose: () => void;
  handleDelete: () => void;
  modalTitle: string;
  open: boolean;
  selectedItem?: any;
  subText?: string;
  subTextEnd?: string;
  btnPrimaryText?: string;
}

export const DeleteFileModal = ({
  handleClose,
  handleDelete,
  modalTitle,
  open = false,
  selectedItem,
  subText,
  btnPrimaryText,
  subTextEnd
}: DeleteTaskModalProps) => {
  //constant
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  //methods
  const handleDeleteTask = () => {
    handleDelete();
  };

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
          <Typography variant="h4" className="textItalic text-center d-flex">
            <Box>
              <label>{subText + ' '}</label>
              <label className="textweight  fileNameWidth cursorPointer">
                {selectedItem?.fileName || selectedItem?.name}
              </label>
              <label>{subTextEnd}</label>
              <label>{'?'}</label>
            </Box>
          </Typography>
        </Box>
      }
      model_actions={
        <Box className="flex-basic-center w-100 mt-20">
          <Button
            onClick={handleClose}
            variant="outlined"
            btnText={t('cancel')}
            sx={{ py: 2.2, px: 8 }}
          />

          <Button
            onClick={handleDeleteTask}
            variant="contained"
            btnText={btnPrimaryText}
            sx={{ py: 2.2, px: 8, ml: 6 }}
          />
        </Box>
      }
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
