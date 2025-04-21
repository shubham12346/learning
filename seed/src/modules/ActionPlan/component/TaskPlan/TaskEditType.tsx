import TaskEdit from 'src/modules/GapActionPlan/component/TaskEdit';
import TaskPlan from './TaskPlan';
import {
  EDIT,
  GAP_ANALYSIS,
  MORE_INFO,
  REGULATION
} from 'src/modules/GapActionPlan/component/constants';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import { Box, Container } from '@mui/material';
import BreadCrumbComponent from 'src/shared/components/Breadcrum/BreadCrumbComponent';
import { useNavigate, useParams } from 'react-router-dom';
import MoreInfo from 'src/modules/GapActionPlan/component/MoreInfo';
import * as ROUTES from 'src/shared/constants/routes';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useTaskStatus from 'src/modules/GapActionPlan/hooks/useTaskStatus';

const TaskEditType = (props) => {
  let { regId, actionId, taskMode } = useParams();
  const { t } = useTranslation('regulations');
  const [gapTaskMode, setGapTaskMode] = useState(taskMode);
  const navigate = useNavigate();
  useTaskStatus();

  const searchParams = new URLSearchParams(location.search);
  let taskType = searchParams.get('taskType');
  let gapId = searchParams?.get('gapId');
  let taskId = searchParams?.get('taskId');
  let agency = searchParams?.get('agency');
  let regulation = searchParams?.get('regulation');

  let breadCrumb = [
    {
      title: `${agency} `,
      className: ''
    },
    {
      title: ` ${regulation} `,
      className: ''
    },
    {
      title: ` ${t('actionPlan')} `,
      className: ''
    }
  ];

  const goBackToActionPlan = () => {
    navigate(
      `/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/${regId}/${ROUTES.ACTION}/${actionId}`
    );
  };

  const handleEdit = () => {
    setGapTaskMode(EDIT);
  };

  const renderGapTaskType = (gapTaskMode) => {
    switch (gapTaskMode) {
      case EDIT:
        return (
          <TaskEdit
            actions={props?.actions}
            gapId={gapId || ''}
            handleNavigateAfterSave={goBackToActionPlan}
            taskId={taskId}
          />
        );
      case MORE_INFO:
        return (
          <MoreInfo
            actions={props?.actions}
            gapId={gapId}
            handleEdit={handleEdit}
            handleNavigateAfterDelete={goBackToActionPlan}
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
              redirect={goBackToActionPlan}
            />
            {renderGapTaskType(gapTaskMode)}
          </Box>
        );
      case REGULATION:
        return <TaskPlan {...props} />;
      default:
        return <TaskPlan {...props} />;
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

export default TaskEditType;
