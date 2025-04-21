import { Box, Card, Grid, Typography } from '@mui/material';
import OverallRegulatoryEventsCard from './OverallRegulatoryEventsCard';
import { useTranslation } from 'react-i18next';
import { Select } from 'src/shared/components/select/Select';
import { timeFilterListOptions } from 'src/shared/constants/constants';
import { useState } from 'react';
import HorizontalBarGraph from 'src/modules/common/component/graphs/HorizontalBarGraph';
import { DashboardRegulatoryEventsProps } from '../model/dashboardModel';

const DashboardRegulatoryEvents = ({
  regulatoryEventDetails,
  selectedTimesOptionsValue,
  isLoaderActive
}: DashboardRegulatoryEventsProps) => {
  //const
  const { t } = useTranslation('dashboard');

  //state variables
  const [selectedTimesOptions, setSelectedTimesOptions] = useState<string>();

  //times filter
  const timeEventoryFilterChange = (event) => {
    setSelectedTimesOptions(event?.target?.value);
    selectedTimesOptionsValue(event?.target?.value);
  };

  const axisCategories = regulatoryEventDetails?.regulatoryOrganization.map(
    (item) => {
      return item?.name;
    }
  );

  const seriesData = regulatoryEventDetails?.regulatoryOrganization.map(
    (item) => {
      return item?.totalEnforcementActionCount;
    }
  );

  return (
    <Box>
      <Card sx={{ p: 5 }}>
        <Grid container>
          <Grid sx={{ pr: 4 }} item xs={12} sm={12} md={12} lg={8} xl={9}>
            <Box className="flex-basic-space-between">
              <Box>
                <Typography variant="h5">{t('regulatoryEvents')}</Typography>
              </Box>
              <Box sx={{ pr: 10 }} className="d-flex">
                <Box className="filterSelect regDetails">
                  <Select
                    label={''}
                    placeholder="Select Time"
                    value={selectedTimesOptions || 'none'}
                    options={timeFilterListOptions || []}
                    itemValue={'value'}
                    itemText={'name'}
                    onChange={(e) => timeEventoryFilterChange(e)}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              className="flex-basic-center   text-font-12"
              sx={{ fontSize: '18px' }}
            >
              {isLoaderActive ? (
                <Box className="flex-basic-center mt-100">
                  <Box className="spinnerLoading"></Box>
                </Box>
              ) : (
                <HorizontalBarGraph
                  height={305}
                  colrs={[
                    '#CBD0F6',
                    '#A8B5F8',
                    '#7C83E5',
                    '#314DDD',
                    '#353DA9',
                    '#070D2D'
                  ]}
                  xAxisCategories={axisCategories}
                  xAxisTitle="No of events"
                  yAxisTitle="Agency"
                  series={[
                    {
                      data: seriesData
                    }
                  ]}
                />
              )}
            </Box>
          </Grid>
          <Grid sx={{ pr: 4 }} item xs={12} sm={12} md={12} lg={4} xl={3}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle2">
                {t('overallRegulatoryEvents')}
              </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
              <OverallRegulatoryEventsCard
                iconClass={'icon-ic_news'}
                cardSubText={t('newsArticles')}
                totalCountNumber={regulatoryEventDetails?.totalNewsCount}
              />
            </Box>
            <Box sx={{ mb: 5 }}>
              <OverallRegulatoryEventsCard
                iconClass={'icon-ic_fines'}
                cardSubText={t('fines')}
                totalCountNumber={regulatoryEventDetails?.totalFines}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <OverallRegulatoryEventsCard
                iconClass={'icon-ic_enforcement-actions'}
                cardSubText={t('enforcementActions')}
                totalCountNumber={
                  regulatoryEventDetails?.totalEnforcementActions
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DashboardRegulatoryEvents;
