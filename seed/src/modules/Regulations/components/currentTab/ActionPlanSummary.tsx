import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';
import { getGenerateActionPlanForRegulation } from 'src/modules/ActionPlan/api/actionplanApi';
import { Button } from 'src/shared/components/button/Button';
import {
  customInternationDate,
  getReaminingDays
} from 'src/shared/utils/utils';
import actionPlanCreate from '../../../../assets/svg/actionPlanCreate.svg';
import { REGULATION_PATH, getRegulationPath } from '../Utils';
import CreateActionPlanModal from './CreateActionPlanModal';
import TaskGraph from './TaskGraph';
import TaskList from './TaskList';

import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import {
  ActionPlanSummaryProps,
  GraphPropDataType,
  LinearProgressDataType
} from '../../model/RegulationsInterface';
import { flatTaskforTableComponent } from 'src/modules/Tasks/component/util';

const ActionPlanSummary = ({
  regulationId,
  isActionPlanExists,
  actions
}: ActionPlanSummaryProps) => {
  //constant
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();

  //state variable
  const [showMoreInfoModal, setShowMoreInfoModal] = React.useState(false);
  const [taskList, setTaskList] = useState<any>();
  const [loadingTask, setLoadingTask] = useState(false);
  const [linearProgressData, setLinearProgressData] =
    useState<LinearProgressDataType>();
  const [graphDataForTask, setGraphDataForTask] = useState<GraphPropDataType>();
  const [actionPlanSaved, setActionPlanSaved] = useState<boolean>();
  const [actionPlanId, setActionPlanId] = useState('');

  useEffect(() => {
    if (isActionPlanExists) {
      setLoadingTask(true);
      getAllTasksOfActionPlanAndSetLinearAndGraphData(regulationId);
    }
  }, [regulationId]);

  //methods
  const handleClose = () => {
    setShowMoreInfoModal(false);
  };

  const goToActionPlanClick = () => {
    getActionidOfSummary(regulationId);
    setShowMoreInfoModal(false);
  };

  const getActionidOfSummary = async (regulationId) => {
    const respdata = await getGenerateActionPlanForRegulation(regulationId);
    const actionId = respdata?.actionPlanVersionUid;
    let url = getRegulationPath(REGULATION_PATH.ACTION_PALN_VIEW, {
      regId: regulationId,
      actionId
    });
    navigate(url);
  };

  const getAllTasksOfActionPlanAndSetLinearAndGraphData = async (
    regulationId
  ) => {
    const res = await getGenerateActionPlanForRegulation(regulationId, {
      isUpcomingTasks: true
    });
    setLoadingTask(false);
    const flattenTask = flatTaskforTableComponent(res?.tasksList);
    setTaskList(flattenTask);

    const {
      actionPlanCreatedAtDate,
      actionPlanTargetDate,
      isAccepted,
      taskStatusCounts,
      totalNumberOfTasks,
      actionPlanId
    } = res;

    const totalNumberOfDays = getReaminingDays(
      actionPlanCreatedAtDate,
      actionPlanTargetDate
    );

    const remainingDays = getReaminingDays(new Date(), actionPlanTargetDate);
    const timeUsed = totalNumberOfDays - remainingDays;
    const createdDate = customInternationDate(actionPlanCreatedAtDate);
    const enforcementDate = customInternationDate(actionPlanTargetDate);

    let taskCompleted = Math.floor(
      (taskStatusCounts?.approved / totalNumberOfTasks) * 100
    );
    // upate the states of action plan
    setActionPlanId(actionPlanId);
    setLinearProgressData({
      createdDate: createdDate,
      enforcementDate: enforcementDate,
      timeUsed: timeUsed,
      totalTime: totalNumberOfDays
    });
    setGraphDataForTask({
      colors: ['#1B7D7F'],
      labels: [],
      series: [taskCompleted],
      taskStatusCounts: taskStatusCounts,
      totalNumberOfTasks: totalNumberOfTasks
    });
    setActionPlanSaved(isAccepted);
  };

  const handleViewAll = () => {
    goToActionPlanClick();
  };

  const handleViewPlan = () => {
    goToActionPlanClick();
  };

  return (
    <Box>
      {isActionPlanExists ? (
        <Box className="actionPlanOverview ">
          <Box className="flex-basic-space-between mt-8 mb-8">
            <Box>
              <Typography variant="subtitle1">
                {t('actionPlanOverviewTitle')}
              </Typography>
            </Box>
            {actionPlanSaved && (
              <Box>
                <Button
                  variant="outlined"
                  type="submit"
                  size={'small'}
                  btnText={t('actionPlanBtnText')}
                  onClick={() => {
                    goToActionPlanClick();
                  }}
                  sx={{ py: '0.5rem', px: '1rem' }}
                />
              </Box>
            )}
          </Box>
          {actionPlanSaved && graphDataForTask.totalNumberOfTasks > 0 && (
            <>
              <Box className="actionPlanOverviewContent">
                <Box className="graphWraper">
                  {graphDataForTask && (
                    <TaskGraph
                      series={graphDataForTask?.series}
                      colors={graphDataForTask?.colors}
                      taskStatusCounts={graphDataForTask?.taskStatusCounts}
                      graphButtomTitle={t('tasksCompleted')}
                      labels={graphDataForTask?.labels}
                      totalNumberOfTask={graphDataForTask.totalNumberOfTasks}
                    />
                  )}
                </Box>
                <Divider className="divider" />
                <Box className="progressBarWrapper">
                  {linearProgressData && (
                    <Box>
                      <Box className="flex-basic-space-between mt-10 overviewLabel">
                        <Typography
                          variant="body1"
                          className="progressBarLabel"
                        >
                          <span>{t('createdBtnText')}</span>
                          <span className="progressBarDate">
                            {' ' + linearProgressData.createdDate}
                          </span>
                        </Typography>
                        <Typography
                          variant="body1"
                          className="progressBarLabel"
                        >
                          <span> {t('targetDate')}</span>
                          <span className="progressBarDate">
                            {' ' + linearProgressData.enforcementDate}
                          </span>
                        </Typography>
                      </Box>
                      <Box className="progressBar">
                        <Slider
                          value={
                            (linearProgressData.timeUsed /
                              linearProgressData.totalTime) *
                            100
                          }
                          aria-label="Default"
                          valueLabelDisplay="off"
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box sx={{ padding: 2 }}>
                <Typography variant="subtitle1" className="mb-12">
                  {t('upcomingTasks')}
                </Typography>
                <TaskList
                  taskLoader={loadingTask}
                  tasks={taskList}
                  handleViewAll={handleViewAll}
                  showViewAllAfter={2}
                  idObj={{ regId: regulationId, actionId: actionPlanId }}
                />
              </Box>
            </>
          )}
          {actionPlanSaved && graphDataForTask.totalNumberOfTasks == 0 && (
            <Box sx={{ py: 7, px: 2 }}>
              <EmptyPlaceholder
                imgWidth={'156'}
                imageUrl={NoTaskImageUrl}
                titleText={t('noTaskFound')}
              />
            </Box>
          )}
          {!actionPlanSaved && (
            <Box className="disabledScreen flex-column-center">
              <Box className="textalign">
                <Typography variant="body2" className="mb-22" width={'180px'}>
                  {t('actionPlanNotSaveMessage')}
                </Typography>
                <Button
                  btnText={t('viewPlan')}
                  className=" viewBtn"
                  variant="outlined"
                  onClick={handleViewPlan}
                />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }} className="actionPlanSection">
          <Box sx={{ p: 7 }} className="actionPlanCreate flex-column-center">
            <Box className="mb-10">
              <img
                width={123}
                src={actionPlanCreate}
                alt="create action plan"
              />
            </Box>
            <Box className="mb-10">
              <Typography
                variant="body1"
                className="textsemiWeight text-center"
              >
                {t('actionPlan')}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant="body2" className="text-center">
                {t('actionPlanText')}
              </Typography>
            </Box>
            <Box className="createActionBtn">
              <Button
                disabled={!actions?.includes('add-regulations')}
                variant="contained"
                type="submit"
                startIcon={<AddIcon sx={{ pr: 1 }} />}
                btnText={t('createActionPlanBtnText')}
                onClick={() => {
                  setShowMoreInfoModal(true);
                }}
                sx={{ py: '0.62rem', px: '1.2rem' }}
              />
            </Box>
          </Box>
        </Box>
      )}

      <CreateActionPlanModal
        handleClose={handleClose}
        modalTitle={t('actionPlanModalTitle')}
        open={showMoreInfoModal}
        goToActionPlanClick={goToActionPlanClick}
        regulationId={regulationId}
      />
    </Box>
  );
};

export default ActionPlanSummary;
