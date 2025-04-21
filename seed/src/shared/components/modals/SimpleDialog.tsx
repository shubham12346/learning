import DialogTitle from '@mui/material/DialogTitle';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { MuiDialog } from './services/modalInterface';

export const SimpleDialog = ({ ...props }: MuiDialog) => {
  const {
    onClose,
    selectedValue,
    open,
    model_title,
    model_content,
    model_actions,
    modelSize
  } = props;

  const handleClose = () => {
    //onClose(selectedValue, 'backdropClick');
  };

  return (
    <Dialog
      maxWidth={modelSize}
      onClose={handleClose}
      open={open}
      data-testid="modalcomponent"
      className="customDailogStyle"
    >
      <DialogTitle>{model_title}</DialogTitle>
      <DialogContent>{model_content}</DialogContent>
      <DialogActions className="justify-content-center">
        {model_actions}
      </DialogActions>
    </Dialog>
  );
};
