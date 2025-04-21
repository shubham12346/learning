import Typography from 'src/shared/components/typography/Typography';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SimpleDialog } from 'src/shared/components/index';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from 'src/shared/utils/utils';
import { MoreInfoTypes } from 'src/shared/constants/constants';
import SimpleTable from 'src/shared/components/common/SimpleTable';
import { GroupsMoreInfo } from '../models/moreInfo';

export const MoreInfoModal = ({
  data,
  handleClose,
  modalTitle,
  open,
  organizationName,
  moreInfoTypes,
  selectedValue,
  isPartnerTabActive
}: GroupsMoreInfo) => {
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name: string = 'company name') => {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  };

  const tableHeadings = ['Group Name', 'Role Type'];

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
            <Tooltip title={t('closeTitle', { ns: 'users' })} arrow>
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
        <Box
          className="bg-more-info-modal"
          sx={{
            p: 8,
            minWidth: smallDevice ? '360px' : '670px'
          }}
        >
          {data && (
            <Box>
              {/*page title */}
              <Box className="d-flex" sx={{ flexGrow: 1 }}>
                {data.orgName && (
                  <Avatar
                    {...stringAvatar(data?.orgName + ' Comapany')}
                    className="modal-avtar"
                  />
                )}
                <Box
                  className="flex-column-center "
                  sx={{ ml: 4, flexShrink: 0 }}
                >
                  <Typography
                    variant="h5"
                    className="textsemiWeight w-100"
                    sx={{ fontSize: '1.5rem' }}
                  >
                    {data?.orgName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: 3
                  }}
                  className="flex-column-center"
                >
                  <Chip
                    label={data?.status}
                    variant="outlined"
                    size="small"
                    color={data?.status === 'active' ? 'success' : 'warning'}
                    className="chip-status"
                  />
                </Box>
              </Box>

              {/* modal Body */}
              <Box sx={{ mt: 7 }}>
                <Typography
                  variant="body1"
                  className="textWeightMedium modalInfotextTitle"
                >
                  {t('tenants.moreInfoModal.onBoardedOn')}
                </Typography>
                <Typography variant="body1" className="textWeightMedium">
                  {formatDate(data?.onboardedOn, 'MM/DD/YYYY')}
                </Typography>
              </Box>

              {moreInfoTypes !== MoreInfoTypes.User && (
                <Box sx={{ mt: 5 }}>
                  <Typography
                    variant="body1"
                    className="textWeightMedium modalInfotextTitle"
                  >
                    {t('tenants.moreInfoModal.companyType')}
                  </Typography>
                  <Typography variant="body1" className="textWeightMedium">
                    {data?.orgType}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 5 }}>
                <Typography
                  variant="body1"
                  className="textWeightMedium modalInfotextTitle"
                >
                  {moreInfoTypes === MoreInfoTypes.User ? (
                    <Box>{t('tenants.moreInfoModal.companyName')}</Box>
                  ) : (
                    <Box>
                      {!isPartnerTabActive
                        ? t('tenants.moreInfoModal.primaryAdmin')
                        : t('tenants.moreInfoModal.contactPerson')}
                    </Box>
                  )}
                </Typography>

                <Typography variant="body1" className="textWeightMedium">
                  {organizationName ? (
                    <Box>{organizationName}</Box>
                  ) : (
                    <Box>{data?.name}</Box>
                  )}
                </Typography>
              </Box>

              <Box sx={{ mt: 5 }}>
                <Typography
                  variant="body1"
                  className="textWeightMedium modalInfotextTitle"
                >
                  {moreInfoTypes === MoreInfoTypes.User ? (
                    <Box>{t('tenants.moreInfoModal.emailId')}</Box>
                  ) : (
                    <Box>
                      {!isPartnerTabActive
                        ? t('tenants.moreInfoModal.primaryAdminEmail')
                        : t('tenants.moreInfoModal.contactPersonEmail')}
                    </Box>
                  )}
                </Typography>
                <Typography variant="body1" className="textWeightMedium">
                  {data?.email}
                </Typography>
              </Box>

              {/* companies list */}
              {data.organizationsUnderIt &&
                data.organizationsUnderIt.length > 0 && (
                  <Box sx={{ mt: 5 }} className="">
                    <Typography
                      variant="body1"
                      className="textWeightMedium modalInfotextTitle"
                    >
                      <span className="compCount">
                        {t('tenants.moreInfoModal.companies')}
                      </span>
                      {`(${data.organizationsUnderIt.length})`}
                    </Typography>

                    <Box className="">
                      {data.organizationsUnderIt.map((company, index) => {
                        return (
                          <Chip
                            key={index}
                            label={company.orgName}
                            component="a"
                            variant="outlined"
                            className="company-button-modal mr-10 mt-10"
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}

              {/* Group Role Table */}
              {data.groups && (
                <Box className="customTable" sx={{ mt: 7 }}>
                  <SimpleTable
                    tableHeadings={tableHeadings}
                    tableData={data.groups}
                  ></SimpleTable>
                </Box>
              )}
            </Box>
          )}
        </Box>
      }
      selectedValue={selectedValue}
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
