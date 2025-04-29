import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Button, SimpleDialog } from 'src/shared/components/index';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

interface textsTypes {
  title: string;
  description: string;
  acceptTitle: string;
  discardTitle: string;
}

interface DiscardModalTypes {
  open: boolean;
  handleStayPage: any;
  handleLeavePage: any;
  text: textsTypes;
  handleClose?: () => void;
  showCloseButton?: boolean;
}

const DiscardModal = (props: DiscardModalTypes) => {
  const {
    open,
    handleStayPage,
    handleLeavePage,
    text,
    handleClose,
    showCloseButton = false
  } = props;
  const theme = useTheme();
  const { t } = useTranslation('regulations');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className="actionPlanDiscardModel">
      <SimpleDialog
        model_title={
          <Box sx={{ mb: '1.25rem' }} className="w-100">
            {showCloseButton ? (
              <Box>
                <Box className="flex-basic-end ">
                  <Tooltip title={'Close'} arrow>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      className="close-icon-modal "
                      disableRipple={true}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box className="textalign  ">
                  <Typography variant="h3" className="textweight">
                    {text.title}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box className="textalign">
                <Typography variant="h3" className="textweight">
                  {text.title}
                </Typography>
              </Box>
            )}
          </Box>
        }
        model_content={
          <Box sx={{ pb: 10 }}>
            <Box
              className={'text-center textItalic'}
              sx={{
                px: 8,
                minWidth: smallDevice ? '360px' : '670px'
              }}
            >
              <Typography variant="h4">{text.description} </Typography>
            </Box>
          </Box>
        }
        model_actions={
          <Box className="flex-basic-center w-100">
            <Button
              onClick={handleLeavePage}
              variant="outlined"
              btnText={text.discardTitle}
              sx={{ py: '0.62rem', px: '2rem' }}
            />

            <Button
              onClick={handleStayPage}
              variant="contained"
              btnText={text.acceptTitle}
              sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
            />
          </Box>
        }
        open={open}
        modelSize={smallDevice ? 'sm' : 'md'}
        onClose={handleClose}
      />
    </Box>
  );
};

export default DiscardModal;
