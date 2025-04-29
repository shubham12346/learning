import TaskEdit from 'src/modules/GapActionPlan/component/TaskEdit';
import MoreInfoTask from './MoreInfoTask';
import {
  EDIT,
  GAP_ANALYSIS,
  MORE_INFO,
  REGULATION
} from 'src/modules/GapActionPlan/component/constants';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import { Box, Container } from '@mui/material';
import BreadCrumbComponent from 'src/shared/components/Breadcrum/BreadCrumbComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MoreInfo from 'src/modules/GapActionPlan/component/MoreInfo';
import * as ROUTES from 'src/shared/constants/routes';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useTaskStatus from 'src/modules/GapActionPlan/hooks/useTaskStatus';

const MoreInfoEditView = (props) => {
  let { taskId } = useParams();
  const { t } = useTranslation('task');
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes(EDIT);
  const [gapTaskMode, setGapTaskMode] = useState(isEdit ? EDIT : MORE_INFO);
  const searchParams = new URLSearchParams(location.search);
  let taskType = searchParams.get('taskType');
  let gapId = searchParams?.get('gapId');
  let regulation = searchParams?.get('regulation');
  let isCalendarView = searchParams?.get('isCalendarView');
  let taskOccurrenceId = searchParams?.get('taskOccurrenceId');
  let actions = [];
  useTaskStatus();
  console.log(
    'cadence',
    'task details collected here after navigation',
    'task type',
    taskType,
    'isCalendar view',
    isCalendarView
  );
  if (props && props?.actions) {
    if (props?.actions?.includes('edit-tasks')) {
      actions.push('edit-task', 'delete-task');
    }
  }
  let breadCrumb = [
    {
      title: `${t('taskTitle')}`,
      className: ''
    },
    {
      title: `${gapTaskMode === EDIT ? t('editTask') : t('moreinfo')}`,
      className: ''
    },
    {
      title: `${regulation}`,
      className: ''
    }
  ];

  const goBackToTask = () => {
    navigate(`/${ROUTES.BASEPATH}/${ROUTES.TASKS}`);
  };

  const handleEdit = () => {
    setGapTaskMode(EDIT);
  };

  const renderGapTaskType = (gapTaskMode) => {
    switch (gapTaskMode) {
      case EDIT:
        return (
          <TaskEdit
            actions={actions}
            gapId={gapId || ''}
            handleNavigateAfterSave={goBackToTask}
            taskId={taskId}
          />
        );
      case MORE_INFO:
        return (
          <MoreInfo
            actions={actions}
            gapId={gapId}
            handleEdit={handleEdit}
            handleNavigateAfterDelete={goBackToTask}
            taskId={taskId}
          />
        );
    }
  };

  const renderTaskType = (taskType) => {
    switch (taskType) {
      case GAP_ANALYSIS:
        return (
          <Box>
            <BreadCrumbComponent
              breadCrumbMenu={breadCrumb}
              redirect={goBackToTask}
            />
            {renderGapTaskType(gapTaskMode)}
          </Box>
        );
      case REGULATION:
        return (
          <MoreInfoTask
            actions={props?.actions}
            taskId={taskId}
            taskOccurrenceId={taskOccurrenceId}
            edit={isEdit}
            isCalendarView={isCalendarView}
          />
        );
      default:
        return (
          <MoreInfoTask
            actions={props?.actions}
            taskId={taskId}
            edit={isEdit}
            isCalendarView={isCalendarView}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth={'xl'}>
        <ErrorBoundary>
          <Box>{renderTaskType(taskType)}</Box>
        </ErrorBoundary>
      </Container>
    </ErrorBoundary>
  );
};

export default MoreInfoEditView;
