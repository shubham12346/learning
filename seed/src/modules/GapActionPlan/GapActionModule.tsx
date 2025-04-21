import { Box, Container } from '@mui/material';
import BreadCrumbComponent from 'src/shared/components/Breadcrum/BreadCrumbComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import GapActionPlan from './component/GapActionPlan';
import {
  GapAssessmentScreens,
  setGapAnalysisScreen,
  gapActivityTabUrl
} from './service/gapAction.service';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import { useLocation, useNavigate } from 'react-router-dom';
import useGapOverview from './hooks/useGapOverview';
import { useEffect } from 'react';
import useTaskStatus from './hooks/useTaskStatus';
import useRiskStatus from './hooks/useRiskStatus';
import MoreInfo from './component/MoreInfo';
import TaskEdit from './component/TaskEdit';

const GapActionModule = (props) => {
  const { actions } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRiskStatus();
  useTaskStatus();
  const { gapAssessmentScreen } = useSelector(
    (state: RootState) => state.gapAnalysis
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gapId = searchParams.get('gapId');
  const editTask = searchParams.get('editTask');

  const gapAssessmentOverview = useGapOverview(gapId);

  useEffect(() => {
    if (editTask) {
      dispatch(
        setGapAnalysisScreen({
          screen: GapAssessmentScreens.EDIT_TASK,
          id: editTask
        })
      );
    } else {
      dispatch(
        setGapAnalysisScreen({
          screen: GapAssessmentScreens.ACTION_PLAN,
          id: ''
        })
      );
    }
  }, [editTask]);

  let breadCrumb = [
    {
      title: 'Regulations ',
      className: ''
    },
    {
      title: ' Gap Assessment ',
      className: ''
    },
    {
      title: ` ${gapAssessmentOverview?.name ?? 'Gap Version Undefined'} `,
      className: ''
    },
    {
      title: 'Action Plan',
      className: ''
    }
  ];

  const handleRedirect = () => {
    switch (gapAssessmentScreen.screen) {
      case GapAssessmentScreens.MORE_INFO:
      case GapAssessmentScreens.EDIT_TASK:
        dispatch(
          setGapAnalysisScreen({
            screen: GapAssessmentScreens.ACTION_PLAN,
            id: ''
          })
        );

        break;
      case GapAssessmentScreens.ACTION_PLAN:
        navigate(gapActivityTabUrl);
        break;
    }
  };

  const handleEdit = () => {
    dispatch(
      setGapAnalysisScreen({
        screen: GapAssessmentScreens.EDIT_TASK,
        id: gapAssessmentScreen?.id
      })
    );
  };
  const handleNavigateAfterDelete = () => {
    dispatch(
      setGapAnalysisScreen({
        screen: GapAssessmentScreens.ACTION_PLAN,
        id: ''
      })
    );
  };

  const renderComponent = (gapScreen) => {
    switch (gapScreen) {
      case GapAssessmentScreens.MORE_INFO:
        return (
          <MoreInfo
            actions={actions}
            gapId={gapId}
            handleEdit={handleEdit}
            handleNavigateAfterDelete={handleNavigateAfterDelete}
            taskId={gapAssessmentScreen?.id}
          />
        );
      case GapAssessmentScreens.EDIT_TASK:
        return (
          <TaskEdit
            gapId={gapId}
            actions={actions}
            handleNavigateAfterSave={handleNavigateAfterDelete}
            taskId={gapAssessmentScreen?.id}
          />
        );
      case GapAssessmentScreens.ACTION_PLAN:
        return (
          <GapActionPlan
            gapAssessmentOverview={gapAssessmentOverview}
            actions={actions}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth={'xl'}>
        <Box>
          <BreadCrumbComponent
            breadCrumbMenu={breadCrumb}
            redirect={handleRedirect}
          />
        </Box>
        <ErrorBoundary>
          <Box>{renderComponent(gapAssessmentScreen?.screen)}</Box>
        </ErrorBoundary>
      </Container>
    </ErrorBoundary>
  );
};

export default GapActionModule;
