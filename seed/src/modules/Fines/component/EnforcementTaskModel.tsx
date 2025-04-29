import CloseIcon from '@mui/icons-material/Close';
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
import { useTranslation } from 'react-i18next';
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import {
  currencyFormatter
} from 'src/shared/constants/constants';
import { customInternationDate } from 'src/shared/utils/utils';
import { EnforcementTaskModelType } from '../model/fineTypes';

function EnforcementTaskModel({
  handleClose,
  open,
  selectedRow
}: Readonly<EnforcementTaskModelType>) {
  const { t } = useTranslation('fines');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box className="fineModalWrapper">
      <SimpleDialog
        model_title={
          <Box className="w-100 mb-32">
            <Box className="d-flex flex-basic-space-between">
              <Box>
                <Typography variant="h3" className="mb-10 textweight">
                  {selectedRow?.agency}
                </Typography>
                <Typography
                  variant="h5"
                  className="textWeightRegular textItalic"
                >
                  {'Date of enforcement action:'}
                  <span className="textweight">
                    {customInternationDate(selectedRow?.date)}
                  </span>
                </Typography>
              </Box>
              <Box className="flex-basic-space-between align-items-center">
                <Box className="mr-25 fineTag " sx={{ p: 5 }}>
                  <Typography
                    variant="subtitle2"
                    className="mb-10 textWeightMedium"
                  >
                    {'Fine Amount'}
                  </Typography>
                  {selectedRow?.fineAmount && (
                    <Typography variant="subtitle2" className="textweight">
                      {currencyFormatter(selectedRow?.fineAmount)}
                    </Typography>
                  )}
                </Box>
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
          </Box>
        }
        model_content={
          <Box
            className="flex-column-start fineModalContent "
            sx={{ minWidth: smallDevice ? '' : '704px' }}
          >
            <Box className="boxPadding1">
              <Box className="mb-10" sx={{ my: 5 }}>
                <Typography variant="h5" className="mb-12">
                  {'Description'}
                </Typography>
                <Typography variant="body1">
                  {selectedRow?.description}
                </Typography>
              </Box>
              {/* <Box className="mb-10" sx={{ my: 5 }}>
                <Typography variant="h5" className="mb-12">
                  {'Penalty Reason'}
                </Typography>
                <Typography variant="body1" paragraph={true}>
                  {
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lab. Consectetur adipiscing elit, sed do eiusmod tempor incididunt magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lab. Ut enim ad minim veniam, quis nostrud exercitation ullamco lab.'
                  }
                </Typography>
              </Box> */}
            </Box>
            <Divider className="divider w-100" />
            <Box className="boxPadding2">
              <Box className="mb-10" sx={{ my: 2 }}>
                <Typography variant="h5" className="mb-12">
                  {'Source'}
                </Typography>
                <Box className="d-flex mb-12">
                  <Box sx={{ mr: 4 }} className="flex-basic-center">
                    <Box className="flex-basic-center imgBox">
                      <Box className="icon-source-link"></Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box className="mt-5">
                      <Link href={selectedRow?.sourceLink} target="_blank">
                        <Typography
                          variant="body1"
                          className=" modelSource textweight"
                        >
                          {selectedRow?.sourceLink}
                        </Typography>
                      </Link>
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
    </Box>
  );
}

export default EnforcementTaskModel;
