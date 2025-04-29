import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import DiscardModal from 'src/modules/common/component/DiscardModel';
import GapAssessmentOverview from './GapAssessmentOverview';
import GapActionPlanFiltersAndSearch from './GapActionPlanFiltersAndSearch';
import GapActionPlanFootersActions from './GapActionPlanFootersActions';
import GapActionPlanTasksTable from './GapActionPlanTasksTable';
import { useTranslation } from 'react-i18next';
import useFilters from '../hooks/useFilters';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import {
  gapActivityTabUrl,
  setActionPlanSaved,
  setDiscardModalOpen
} from '../service/gapAction.service';
import { deleteTask, saveActionPlan } from '../api/gapActionPlanApi';
import {
  showSuccessMessage,
  showErrorMessage
} from 'src/shared/components/toaster/Toast';
import { useState } from 'react';

const GapActionPlan = ({ gapAssessmentOverview, actions }) => {
  const dispatch = useDispatch();
  const { discardModalOpen } = useSelector(
    (state: RootState) => state.gapAnalysis
  );
  const [selectedTask, setSelectedTask] = useState<any>();
  const [deleteSuccess, setDeleteSuccess] = useState<string>('');
  const [isActionPlanSaved, setIsActionPlanSaved] = useState<boolean>(false);

  const { t } = useTranslation('regulations');

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gapId = searchParams.get('gapId');

  const { gapActionTaskLoader, gapAssessmentTask, handleFilterUpdated } =
    useFilters(gapId, deleteSuccess, setIsActionPlanSaved);

  if (!gapId) {
    return (
      <Box>
        <Typography>No Action plan found </Typography>
      </Box>
    );
  }

  const handleDiscardActionPlan = () => {
    dispatch(setDiscardModalOpen({ modalType: 'DISCARD', open: true }));
  };

  const saveGapActionPlan = async () => {
    setDiscardModalOpen({ modalType: '', open: false });
    try {
      const res = await saveActionPlan(gapId);
      showSuccessMessage(res?.message, '', {});
      dispatch(setActionPlanSaved(true));
      setIsActionPlanSaved(true);
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause, {});
    }
  };

  const handleLeave = () => {
    dispatch(setDiscardModalOpen({ modalType: '', open: false }));
  };

  const handleStay = () => {
    switch (discardModalOpen?.modalType) {
      case 'DISCARD':
        showSuccessMessage(t('actionPlanDiscardedMessage'), '', {});
        dispatch(setDiscardModalOpen({ modalType: '', open: false }));
        setTimeout(() => {
          navigate(gapActivityTabUrl);
        }, 2000);
        break;
      case 'DELETE':
        handleDeleteTask(selectedTask);
        break;
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await deleteTask(gapId, taskId);
      showSuccessMessage(res?.message, '', {});
      dispatch(setActionPlanSaved(false));
      setDeleteSuccess(taskId);
      setSelectedTask({});
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause, {});
    } finally {
      dispatch(setDiscardModalOpen({ modalType: '', open: false }));
    }
  };

  const handleDeleteModalOpen = (task) => {
    setSelectedTask(task);
    dispatch(setDiscardModalOpen({ modalType: 'DELETE', open: true }));
  };

  return (
    <Box>
      <GapAssessmentOverview
        date={gapAssessmentOverview?.date}
        description={gapAssessmentOverview?.overview}
        title={t('gapActionPlan.gapAnalysisOverview')}
      />
      <GapActionPlanFiltersAndSearch handleFilterChange={handleFilterUpdated} />
      <Card className="gapActionTable">
        <CardContent sx={{ pt: 0, px: 0 }}>
          <ErrorBoundary>
            <GapActionPlanTasksTable
              gapAssessmentTask={gapAssessmentTask}
              loader={gapActionTaskLoader}
              handleDeleteTask={handleDeleteModalOpen}
              actions={actions}
            />
          </ErrorBoundary>
        </CardContent>
        <CardActions sx={{ px: 0 }}>
          {!isActionPlanSaved && gapAssessmentTask?.length > 0 && (
            <GapActionPlanFootersActions
              handleDiscardActionPlan={handleDiscardActionPlan}
              handleSaveActionPlan={saveGapActionPlan}
              cancelDisable={!actions?.includes('cancel')}
              saveDisable={!actions?.includes('save')}
            />
          )}
        </CardActions>
      </Card>
      <DiscardModal
        handleLeavePage={handleLeave}
        handleStayPage={handleStay}
        open={discardModalOpen.open}
        text={
          isActionPlanSaved
            ? {
                acceptTitle: t('yes'),
                discardTitle: t('no'),
                description: t('deleteDescription'),
                title: t('deleteTaskTitle')
              }
            : {
                acceptTitle: t('yes'),
                discardTitle: t('no'),
                description: t('discardChages'),
                title: t('discardUnsavedChanges')
              }
        }
      />
    </Box>
  );
};

export default GapActionPlan;
