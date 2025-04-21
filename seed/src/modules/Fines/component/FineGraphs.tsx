import { Box, Divider, Grid, Typography } from '@mui/material';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import FineGraphsInnerCard from './FineGraphsInnerCard';
import FineDonutGraph from './FineDonutGraph';
import { useTranslation } from 'react-i18next';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';
import FineHorizontalBarGraph from './FineHorizonatlGraph';
import { FineGraphsComponentTypes } from '../model/fineTypes';
import { currencyFormatter } from 'src/shared/constants/constants';

const FineGraphs = ({
  donutGraphData,
  horizonatlGraphData,
  barGraphLoader,
  donutGraphLoader,
  handleSelectedDonutSection,
  selectedSection,
  selectedAgency
}: FineGraphsComponentTypes) => {
  const { t } = useTranslation('fines');
  return (
    <Grid container>
      <Grid className="dividerInFine" item sm={12} md={12} lg={8} xl={6}>
        <Box sx={{ py: 6, pl: 6 }}>
          {donutGraphLoader ? (
            <Box className="flex-basic-center mt-100  mb-100">
              <Box className="spinnerLoading mt-60"></Box>
            </Box>
          ) : (
            <>
              {donutGraphData?.seriesData &&
              Number(donutGraphData?.graphsCardData?.totalEnforcementAction) ? (
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <Box className="mb-10">
                      <Typography variant="body1">
                        {t('donutGraphTitle')}
                      </Typography>
                    </Box>
                    <FineDonutGraph
                      handleSelectedDonutSection={handleSelectedDonutSection}
                      selectedSection={selectedSection}
                      graphData={donutGraphData}
                      labelName={donutGraphData?.labelsName}
                      seriesData={donutGraphData?.seriesData}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                    <Box className="flex-basic-space-between mr-24">
                      <Box sx={{ mr: 3 }} className="w-50">
                        {donutGraphData?.seriesData && (
                          <FineGraphsInnerCard
                            title={currencyFormatter(
                              Number(
                                donutGraphData?.graphsCardData?.allAgencyFine
                              )
                            )}
                            descriptions={
                              selectedAgency === 'ALL' || selectedAgency === ''
                                ? t('totalAgencyFines')
                                : t('totalFinesCollected')
                            }
                          />
                        )}
                      </Box>
                      <Box sx={{ ml: 3 }} className="w-50">
                        <FineGraphsInnerCard
                          title={currencyFormatter(
                            Number(donutGraphData?.graphsCardData?.averageFine)
                          )}
                          descriptions={t('averageFinesCollected')}
                        />
                      </Box>
                    </Box>
                    <Box className="mt-24 flex-basic-space-between mr-24">
                      <Box className="w-100">
                        <FineGraphsInnerCard
                          title={
                            donutGraphData?.graphsCardData
                              ?.totalEnforcementAction
                          }
                          descriptions={t('totalEnforcementActions')}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ py: 17 }}>
                  <EmptyPlaceholder
                    imgWidth={'156'}
                    imageUrl={NoTaskImageUrl}
                    titleText={t('enforcementEmptyView')}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
      <Grid item sm={12} md={12} lg={4} xl={6}>
        <Box className="background" sx={{ p: 7 }}>
          <Box>
            <Typography variant="h5">{t('totalFinesByAgency')}</Typography>
          </Box>
          {barGraphLoader ? (
            <Box className="flex-basic-center mt-100  mb-100">
              <Box className="spinnerLoading mt-100"></Box>
            </Box>
          ) : (
            <>
              {horizonatlGraphData?.seriesData &&
              horizonatlGraphData?.seriesData?.length >= 1 ? (
                <FineHorizontalBarGraph
                  series={[{ data: horizonatlGraphData?.seriesData }]}
                  xAxisCategories={horizonatlGraphData?.labelName}
                  height={'250'}
                  xAxisTitle={t('xAxisLabel')}
                  colrs={['#7C83E5', '#353DA9']}
                />
              ) : (
                <Box sx={{ py: 17 }}>
                  <EmptyPlaceholder
                    imgWidth={'156'}
                    imageUrl={NoTaskImageUrl}
                    titleText={t('finesEmptyView')}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FineGraphs;
