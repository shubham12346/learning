import {
  Box,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { customInternationDate } from 'src/shared/utils/utils';

interface CreateActionPlanModalProps {
  modalTitle: any;
  modalContent: string;
  handleClose: () => void;
  open: boolean;
  regulationDateChange: string;
  regulationSourceLink: string;
}

function RegulationLatestChangesInfoModal({
  modalTitle,
  handleClose,
  modalContent,
  regulationDateChange,
  regulationSourceLink,
  open
}: Readonly<CreateActionPlanModalProps>) {
  const { t } = useTranslation('regulations');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <SimpleDialog
      model_title={
        <Box className="w-100">
          <Box className="textalign">
            <Typography variant="h3" className="textweight">
              {modalTitle}
            </Typography>
          </Box>
          <Box className="textalign" sx={{ mt: 1 }}>
            <Typography
              variant="h5"
              sx={{ color: '#3F4159' }}
              className="textWeightRegular textItalic"
            >
              {t('regulationDateChange')}
              {customInternationDate(regulationDateChange)}
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
        <Box className="mt-32" sx={{ minWidth: smallDevice ? '' : '704px' }}>
          <Box className="regulationLatestChanges" sx={{ py: 8 }}>
            <Box sx={{ px: 10 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5">
                  {t('changesToRegulationsTitle')}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1">{modalContent}</Typography>
              </Box>
            </Box>
            <Divider
              sx={{
                my: 4,
                backgroundColor: 'rgba(180, 181, 192, 0.50)',
                height: '1px'
              }}
            />
            <Box sx={{ px: 10 }}>
              <Box className="regulationSource">
                <Box className="d-flex">
                  <Box sx={{ mr: 4 }} className="flex-basic-center">
                    <Box className="flex-basic-center imgBox">
                      <Box className="icon-source-link"></Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ mb: 1 }} className="enforcementLabel">
                      <Typography variant="body2" className="mt-3">
                        {t('regulationSource')}
                      </Typography>
                    </Box>
                    <Box className="regulationSourceLink text-ellipsis">
                      <Link href={regulationSourceLink} target="_blank">
                        {regulationSourceLink}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      }
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
}

export default RegulationLatestChangesInfoModal;
