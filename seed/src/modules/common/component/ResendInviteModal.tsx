import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { SimpleDialog } from 'src/shared/components/index';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

interface textsTypes {
  title: string;
  description: string;
  userName: string;
  imageURL: string;
}
interface ResendModalTypes {
  open: boolean;
  handleClose: any;
  text: textsTypes;
}

const ResendInviteModal = (props: ResendModalTypes) => {
  const { open, handleClose, text } = props;
  const theme = useTheme();
  const { t } = useTranslation('regulations');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SimpleDialog
      model_title={<></>}
      model_content={
        <Box sx={{ pb: 10 }} className="d-flex">
          <Box
            className={'text-center '}
            sx={{
              px: 8,
              minWidth: smallDevice ? '360px' : '670px'
            }}
          >
            <Box sx={{ mb: 8 }} className="flex-column-center">
              <img width={144} src={text.imageURL} />
            </Box>

            <Typography variant="h4" className="textweight text-center">
              {text.title}
            </Typography>
            <Typography
              variant="h4"
              className="textWeightMedium mt-8 text-center textItalic"
            >
              {text.description + '' + text.userName + ' .'}
            </Typography>
          </Box>
          <Box>
            <Box className="fineModelClose">
              <Tooltip title={t('closeTitle')} arrow>
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
          </Box>
        </Box>
      }
      model_actions={<></>}
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};

export default ResendInviteModal;
