import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RegulationDashboardInnerCard from './RegulationDashboardInnerCard';
import RegulationTaskGraph from './RegulationTaskGraph';
import { useEffect, useState } from 'react';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';
interface DashboardRegulationsViewProps {
  regulationsDetails: any;
}

const DashboardRegulationsView = ({
  regulationsDetails
}: DashboardRegulationsViewProps) => {
  //const
  const { t } = useTranslation('dashboard');

  //stats variables
  const [regulatoryOrganization, setRegulatoryOrganization] = useState<any>();

  //useEffect
  useEffect(() => {
    regulatoryOrganizationData();
  }, [regulationsDetails]);

  //regulations Percentage
  const regulatoryOrganizationData = () => {
    const respData = Array.isArray(regulationsDetails?.regulatoryOrganization)
      ? regulationsDetails?.regulatoryOrganization.map((item: any) => {
          return {
            percentComplete: item?.percentComplete,
            regulatoryOrganizationName: item?.regulatoryOrganizationName
          };
        })
      : {
          percentComplete: regulationsDetails?.percentComplete,
          regulatoryOrganizationName:
            regulationsDetails?.regulatoryOrganizationName
        };
    setRegulatoryOrganization(respData);
  };

  return (
    <Box>
      {regulationsDetails?.totalRegulations > 0 ? (
        <Grid container>
          <Grid
            sx={{ pr: { sm: 4, md: 4, xl: 0, lg: 0 } }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={7}
          >
            <RegulationTaskGraph graphData={regulatoryOrganization} graphHeading={t('agency')}/>
          </Grid>
          <Grid
            sx={{ pr: { sm: 4, md: 4, lg: 0, xl: 0 }, pb: 4 }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={5}
          >
            <Box>
              <Box sx={{ mr: 3 }} className="w-100 mb-24">
                <RegulationDashboardInnerCard
                  iconClass={'icon-regulation-newer'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('noOfText')}</Box>
                      <Box>{t('regulationsText')}</Box>
                    </Box>
                  }
                  totalCountNumber={regulationsDetails?.totalRegulations}
                />
              </Box>
              <Box sx={{ mr: 3 }} className="w-100">
                <RegulationDashboardInnerCard
                  iconClass={'icon-ic_action-completed'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('actionPlans')}</Box>
                      <Box>{t('completed')}</Box>
                    </Box>
                  }
                  totalCountNumber={regulationsDetails?.totalActionPlan}
                  completedCountNumber={
                    regulationsDetails?.actionPlanCompleteCount
                  }
                />
              </Box>
            </Box>
            {/* <Box className="flex-basic-space-between mt-24">
              <Box sx={{ mr: 3 }} className="w-50">
                <RegulationDashboardInnerCard
                  iconClass={'icon-ic_changed-regulation'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('changedText')}</Box>
                      <Box>{t('regulationsText')}</Box>
                    </Box>
                  }
                  totalCountNumber={regulationsDetails?.changedRegulationCount}
                />
              </Box>
              <Box sx={{ ml: 3 }} className="w-50">
                <RegulationDashboardInnerCard
                  iconClass={'icon-ic_proposed-regulation'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('proposedRegulationsText')}</Box>
                      <Box>{t('regulationsText')}</Box>
                    </Box>
                  }
                  totalCountNumber={regulationsDetails?.proposedRegulationCount}
                />
              </Box>
            </Box> */}
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ py: 17 }}>
          <EmptyPlaceholder
            imgWidth={'156'}
            imageUrl={NoTaskImageUrl}
            titleText={t('regulationsEmptyStatus')}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardRegulationsView;
