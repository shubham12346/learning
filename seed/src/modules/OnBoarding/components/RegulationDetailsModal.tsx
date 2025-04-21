import React from 'react';
import Typography from 'src/shared/components/typography/Typography';
import { Box, Grid, Link, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, SimpleDialog } from 'src/shared/components/index';
import './onBoarding.scss';

import calendarIcon from '../../../assets/svg/calendarIcon.svg';
import linkIcon from '../../../assets/svg/linkIcon.svg';
import { customInternationDate } from 'src/shared/utils/utils';

export const RegulationDetailsModal = ({
  selectedItem,
  selectedValue,
  open,
  handleClose,
  closeDialog,
  isDetailModal,
  removeSelectedItem,
  actionslabel = 'Remove'
}) => {
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <React.Fragment>
      <SimpleDialog
        model_title={
          <>
            {isDetailModal ? (
              <Box className="textalign">
                <Typography variant="h3" className="textsemiWeight">
                  {t('viewRegulation')}
                </Typography>
              </Box>
            ) : (
              <>
                <Box className="textalign">
                  <Typography variant="h3" className="textweight">
                    {actionslabel === 'Remove'
                      ? t('removeRegulation')
                      : t('addRegulation', { ns: 'onboarding' })}
                  </Typography>
                </Box>
                <Box
                  className="textalign"
                  sx={{
                    pt: '0.25rem'
                  }}
                >
                  {actionslabel === 'Remove' ? (
                    <Typography
                      className="textWeightRegular removeTextColor textItalic"
                      variant="h5"
                    >
                      {t('removeRegulationConfirmationMsg')}
                    </Typography>
                  ) : (
                    <Typography
                      className="textWeightRegular removeTextColor textItalic"
                      variant="h5"
                    >
                      {t('addRegulationConfirmationMsg', {
                        ns: 'onboarding'
                      })}
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </>
        }
        model_content={
          <Box sx={{ mt: 8, mb: 10 }} className="regulationModalBox">
            <Box sx={{ pt: 7, px: 7 }}>
              <Box className="text-center">
                <Typography variant="h4">
                  {selectedItem?.organization} | {selectedItem?.name}
                  {/* SEC | Regulation S-P */}
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }} className="textalign">
                <Typography variant="h6" className="textWeightRegular">
                  {selectedItem?.shortSummary}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 6, mb: 8 }}>
              <hr />
            </Box>
            <Box sx={{ pb: 7, px: 7 }}>
              <Box className="d-flex w-100">
                <Grid container className="w-100" spacing={0}>
                  <Grid item xs={12} sm={6}>
                    <Box className="d-flex flex-basic-center" sx={{ gap: 2 }}>
                      <Box className="iconBox flex-basic-center w-100 mr-10">
                        <img src={calendarIcon} />
                      </Box>
                      <Box className="flex-column-start">
                        <Typography
                          variant="subtitle2"
                          className="textWeightRegular boxListTitle"
                        >
                          {t('enforcementDate')}
                        </Typography>
                        <Box className="boxListValue" sx={{ pt: 1 }}>
                          {customInternationDate(
                            selectedItem?.detail.enforcementDate
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="d-flex" sx={{ gap: 2 }}>
                      <Box className="iconBox flex-basic-center w-100 mr-10">
                        <img src={linkIcon} />
                      </Box>
                      <Box className="flex-column-start">
                        <Typography
                          sx={{ pb: 1 }}
                          variant="subtitle2"
                          className="textWeightRegular boxListTitle"
                        >
                          {t('regulationSource')}
                        </Typography>
                        <Link
                          href={selectedItem?.detail.sourceLink}
                          target="_blank"
                          variant="body2"
                          underline="always"
                          className="boxListValue linkColor"
                        >
                          {selectedItem?.name}
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        }
        model_actions={
          <Box className="flex-basic-center w-100">
            <Button
              onClick={closeDialog}
              variant="outlined"
              btnText={'Cancel'}
              sx={{ py: '0.62rem', px: '2rem' }}
            />
            {!isDetailModal && (
              <Button
                onClick={removeSelectedItem}
                variant="contained"
                btnText={actionslabel}
                sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
              />
            )}
          </Box>
        }
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
    </React.Fragment>
  );
};
