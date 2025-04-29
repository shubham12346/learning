import React, { useEffect, useState } from 'react';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoRegulationsImage from 'src/assets/svg/no-regulation.svg';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
import EnforcementDetails from '../EnforcementDetails';
import ReadMore from 'src/shared/components/read-more/ReadMore';
import RegulationLatestChangesInfoModal from './RegulationLatestChangesInfoModal';
import { customInternationDate } from 'src/shared/utils/utils';
import ActionPlanSummary from './ActionPlanSummary';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from 'src/shared/constants/routes';

interface RegulationSummaryProps {
  regulationDetail: any;
  isProposed?: boolean;
  library?: {
    isLibrary: boolean;
    addRegulationToCurrentOrRedirectToCurrentRegulation: (
      regulation: any
    ) => void;
  };
  showActionPlan?: boolean;
  showPolicies?: boolean;
  showCommentDate?: boolean;
  actions?: string[];
}

const RegulationSummary = ({
  regulationDetail,
  isProposed,
  library,
  showActionPlan = true,
  showPolicies = true,
  showCommentDate = false,
  actions
}: RegulationSummaryProps) => {
  //constant
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation('regulations');
  const smallDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const [showReadMoreInfoModal, setShowReadMoreInfoModal] =
    React.useState(false);
  const [regulationSummary, setRegulationSummary] = useState(regulationDetail);
  const [regulationPolicy, setRegulationPolicy] = useState<any>('');

  //useEffect
  useEffect(() => {
    setRegulationSummary(regulationDetail);
    setRegulationPolicy(regulationDetail?.policy);
  }, [regulationDetail]);

  //methods
  const handleClose = () => {
    setShowReadMoreInfoModal(false);
  };

  const onClickReadMore = () => {
    setShowReadMoreInfoModal(true);
  };

  const goToRegulationPoliciesView = async () => {
    navigate(
      `/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/${regulationSummary?.regulationId}/regulation-policies`
    );
  };
  const enforecementDateValue = showCommentDate
    ? regulationSummary?.commentDate
    : regulationSummary?.regulationEnforcementDate;

  const checkIfToSowAddReulationButton = () => {
    if (
      library?.addRegulationToCurrentOrRedirectToCurrentRegulation &&
      actions?.includes('add-regulations')
    ) {
      return true;
    }
    return false;
  };

  return (
    <Box sx={{ pl: smallDevice ? '' : 5 }} className="regulationsSummary">
      {regulationSummary &&
      Object.keys(regulationSummary).length &&
      regulationSummary?.regulationId !== '' ? (
        <Box>
          <Card>
            <CardHeader
              sx={{ py: 4, px: 6 }}
              title={
                <Grid container>
                  <Grid item xs="auto">
                    <Box>
                      {regulationSummary?.regulatoryBody ||
                        regulationSummary?.regulatoryOrganizationName}
                      <span style={{ paddingInline: '20px' }}>:</span>
                    </Box>
                  </Grid>
                  <Grid item xl={9} lg={8} md={9}>
                    <Grid container className="">
                      <Grid
                        item
                        sm={12}
                        md={6}
                        lg={checkIfToSowAddReulationButton() ? 8 : 12}
                        xl={checkIfToSowAddReulationButton() ? 9 : 12}
                      >
                        {regulationSummary?.regulationName?.length >= 45 ? (
                          <Tooltip
                            title={regulationSummary?.regulationName}
                            arrow
                          >
                            <Box
                              className=" text-ellipsis-line  mt-1"
                              sx={{ fontWeight: '400' }}
                            >
                              {regulationSummary?.regulationName}
                            </Box>
                          </Tooltip>
                        ) : (
                          <Box className=" textWeightRegular mr-5 mt-1">
                            {regulationSummary?.regulationName}
                          </Box>
                        )}
                      </Grid>
                      <Grid item sm={12} md={6} lg={4} xl={3}>
                        {checkIfToSowAddReulationButton() && (
                          <Button
                            btnText={
                              regulationDetail?.isCurrentRegulation
                                ? t('viewInCurrentTab')
                                : t('addRegulation')
                            }
                            onClick={() =>
                              library?.addRegulationToCurrentOrRedirectToCurrentRegulation(
                                regulationDetail
                              )
                            }
                            variant={
                              regulationDetail?.isCurrentRegulation
                                ? 'outlined'
                                : 'contained'
                            }
                            className="maxContent"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              }
              subheader={
                <Box className="d-flex">
                  <Box sx={{ mr: 2 }}>
                    <span className="icon-info"></span>
                  </Box>
                  <Box>
                    {isProposed
                      ? t('regulationsHedaerNoteText2')
                      : t('regulationsHedaerNoteText')}
                  </Box>
                </Box>
              }
            />
            <Divider className="divider" />
            <CardContent sx={{ pr: 6 }} className="summaryCard">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={isProposed ? 12 : 8}
                  xl={isProposed ? 12 : 8}
                >
                  <Box sx={{ pl: 2, pr: 4, py: 2 }}>
                    <Box className="d-flex flex-wrap">
                      <EnforcementDetails
                        iconClassName="icon-date iconStyle"
                        enforcementLabel={
                          showCommentDate
                            ? t('commentDate')
                            : t('enforcementDate')
                        }
                        enforcementValue={
                          enforecementDateValue
                            ? customInternationDate(enforecementDateValue)
                            : 'N/A'
                        }
                      />

                      <EnforcementDetails
                        iconClassName="icon-date iconStyle"
                        enforcementLabel="Date of Regulation Notice"
                        enforcementValue={customInternationDate(
                          regulationSummary?.regulationNoticeDate
                        )}
                      />
                    </Box>
                    <Divider sx={{ my: 4 }} className="divider" />
                    <Box className="summaryDetails">
                      <Box
                        sx={{ mb: 4 }}
                        className="summaryHeader flex-basic-space-between "
                      >
                        <Box>
                          <Typography variant="h6" className="textsemiWeight">
                            {t('regulationSummaryTitle')}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="summaryList">
                        <Box>
                          <ReadMore
                            text={regulationSummary?.summary || ''}
                            maxCharacters={200}
                            typographyVariant={'body2'}
                            charsToShow={160}
                            onClickReadMore={onClickReadMore}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 7 }} className="regulationSource">
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
                          <Box className="regulationSourceLink">
                            <Link
                              underline="always"
                              href={regulationSummary?.sourceDocumentLink}
                              target="_blank"
                            >
                              {regulationSummary?.regulationName}
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {showPolicies && (
                      <Box className="regulationPolicies mt-36">
                        <Box className="flex-basic-space-between">
                          <Typography variant="h6" className="textsemiWeight">
                            {t('regulationPoliciesTitle')}
                          </Typography>
                          <Box>
                            <Button
                              variant="outlined"
                              type="submit"
                              size={'small'}
                              btnText={t('viewDetailsBtnText')}
                              disabled={regulationPolicy?.averyPolicy === null}
                              onClick={() => {
                                goToRegulationPoliciesView();
                              }}
                              sx={{ py: '0.5rem', px: '1rem' }}
                            />
                          </Box>
                        </Box>
                        <Box className="d-flex mt-16">
                          <Box sx={{ mr: 13 }}>
                            <EnforcementDetails
                              iconClassName="icon-avery-policy iconStyle"
                              enforcementLabel="Avery's Policy"
                              enforcementValue={
                                regulationPolicy?.averyPolicy === null
                                  ? t('absentText')
                                  : t('presentText')
                              }
                            />
                          </Box>
                          <Box sx={{ mr: 13 }}>
                            <EnforcementDetails
                              iconClassName="icon-firm-policy iconStyle"
                              enforcementLabel="Firm's Policy"
                              enforcementValue={
                                regulationPolicy?.firmPolicy?.policy === null
                                  ? t('absentText')
                                  : t('presentText')
                              }
                            />
                          </Box>
                          <Box className="gapAnalysis">
                            <EnforcementDetails
                              iconClassName="icon-gap-analysis iconStyle"
                              enforcementLabel="Gap Analysis"
                              enforcementValue={
                                regulationPolicy?.gapAnalysis?.gap === null
                                  ? t('absentText')
                                  : t('presentText')
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
                {showActionPlan && (
                  <Grid item xs={12} md={12} lg={4} xl={4}>
                    <ActionPlanSummary
                      regulationId={regulationSummary?.regulationId}
                      isActionPlanExists={regulationSummary?.isActionPlanExists}
                      actions={actions}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box className="emptyView flex-column-center">
          <EmptyPlaceholder
            imgWidth={'240'}
            imageUrl={NoRegulationsImage}
            titleText={t('emptyStatsText')}
          />
        </Box>
      )}

      <RegulationLatestChangesInfoModal
        handleClose={handleClose}
        modalTitle={
          <Box className="flex-basic-center">
            <Box>{regulationSummary?.regulatoryBody}</Box>
            <Box sx={{ px: 2 }}>:</Box>
            <Box
              className="text-ellipsis mr-25"
              sx={{ textTransform: 'uppercase' }}
            >
              {regulationSummary?.regulationName}
            </Box>
          </Box>
        }
        modalContent={regulationSummary?.latestSummaryChange?.description}
        open={showReadMoreInfoModal}
        regulationSourceLink={regulationSummary?.sourceDocumentLink}
        regulationDateChange={regulationSummary?.latestSummaryChange?.date}
      />
    </Box>
  );
};

export default RegulationSummary;
