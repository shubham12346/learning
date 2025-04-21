import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';
import RegulationDashboardInnerCard from './RegulationDashboardInnerCard';
import RegulationTaskGraph from './RegulationTaskGraph';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getRegulationPath,
  REGULATION_PATH
} from 'src/modules/Regulations/components/Utils';

interface DashboardTaskViewProps {
  taskDetails: any;
}

const DashboardTaskView = ({ taskDetails }: DashboardTaskViewProps) => {
  //const
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  //state variables
  const [regulatoryOrganization, setRegulatoryOrganization] = useState<any>();

  //useEffect
  useEffect(() => {
    regulatoryOrganizationData();
  }, [taskDetails]);

  //regulations Percentage
  const regulatoryOrganizationData = () => {
    const respData = Array.isArray(taskDetails?.regulatoryOrganization)
      ? taskDetails?.regulatoryOrganization.map((item: any) => {
          return {
            percentComplete: item?.taskCompletePercent,
            regulatoryOrganizationName: item?.regulatoryOrganizationName
          };
        })
      : {
          percentComplete: taskDetails?.taskCompletePercent,
          regulatoryOrganizationName: taskDetails?.regulatoryOrganizationName
        };
    setRegulatoryOrganization(respData);
  };

  const goToRoute = () => {
    navigate(getRegulationPath(REGULATION_PATH.REGULATION));
  };

  return (
    <>
      {taskDetails?.totalTask > 0 ? (
        <Grid container>
          <Grid
            sx={{ pr: { sm: 4, md: 4, xl: 0, lg: 0 } }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={7}
            xl={7}
          >
            <RegulationTaskGraph graphData={regulatoryOrganization} graphHeading={t('taskType')} />
          </Grid>
          <Grid
            sx={{ pr: { sm: 4, md: 4, lg: 0, xl: 0 }, pb: 4 }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={5}
            xl={5}
          >
            <Box className="flex-basic-space-between">
              <Box sx={{ mr: 3 }} className="w-50">
                <RegulationDashboardInnerCard
                  iconClass={'icon-task-completed'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('noOfText')}</Box>
                      <Box>{t('completedTasks')}</Box>
                    </Box>
                  }
                  totalCountNumber={taskDetails?.totalTask}
                  completedCountNumber={taskDetails?.totalTaskCompleted}
                />
              </Box>
              <Box sx={{ ml: 3 }} className="w-50">
                <RegulationDashboardInnerCard
                  iconClass={'icon-tasks-inprogress'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('noOfText')}</Box>
                      <Box>{t('inProgressTasks')}</Box>
                    </Box>
                  }
                  totalCountNumber={taskDetails?.totalTaskInProgress}
                />
              </Box>
            </Box>
            <Box className="flex-basic-space-between mt-24">
              <Box sx={{ mr: 3 }} className="w-50">
                <RegulationDashboardInnerCard
                  iconClass={'icon-pending-approval'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('noOfText')}</Box>
                      <Box>{t('pendingApprovals')}</Box>
                    </Box>
                  }
                  totalCountNumber={taskDetails?.totalTaskPendingApproval}
                />
              </Box>
              <Box sx={{ ml: 3 }} className="w-50">
                <RegulationDashboardInnerCard
                  iconClass={'icon-task-overdues'}
                  cardSubText={
                    <Box className="flex-column-start">
                      <Box>{t('noOfText')}</Box>
                      <Box>{t('overdueTasks')}</Box>
                    </Box>
                  }
                  totalCountNumber={taskDetails?.totalTaskOverdue}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ py: 7 }}>
          <EmptyPlaceholder
            imgWidth={'156'}
            imageUrl={NoTaskImageUrl}
            titleText={t('taskEmptyStats')}
            subText={t('taskEmptySubText')}
            buttonText={t('goToRegulationBtnText')}
            goToRoute={goToRoute}
          />
        </Box>
      )}
    </>
  );
};

export default DashboardTaskView;
