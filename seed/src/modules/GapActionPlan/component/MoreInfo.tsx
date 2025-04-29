import { Card, CardHeader, CardContent, Box } from '@mui/material';
import TaskHeader from './TaskHeader';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import {
  deleteTask,
  getGapTaskDetails,
  saveEditGapTaskDetails
} from '../api/gapActionPlanApi';
import { OverDue, PendingApproval } from './constants';
import TaskView from 'src/modules/ActionPlan/component/TaskPlan/TaskView';
import CircularProgressLoader from 'src/shared/components/loader/loader';
import { DeleteFileModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { useTranslation } from 'react-i18next';

const MoreInfo = ({
  actions,
  gapId,
  handleEdit,
  handleNavigateAfterDelete,
  taskId,
}) => {
  const { taskStatus } = useSelector((state: RootState) => state.gapAnalysis);
  const { t } = useTranslation('regulations');

  const dispatch = useDispatch();
  const [selectedTaskStatus, setSelectedTaskStatus] = useState({
    id: '',
    label: ''
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskDetail, setTaskDetail] = useState<any>({});
  const [moreInfoLoader, setMoreInfoLoader] = useState<boolean>(true);

  const handleTaskStatusChange = async (event) => {
    const selectedOption = event.target.value;
    setSelectedTaskStatus(selectedOption);

    if (selectedOption === taskDetail?.taskStatus?.id) {
      return;
    }
    setMoreInfoLoader(true);
    try {
      const res = await saveEditGapTaskDetails(gapId, taskId, {
        taskStatusId: selectedOption
      });
      showSuccessMessage(res?.message, '', {});
      setMoreInfoLoader(false);
      fetchTaskDetails(gapId, taskId);
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause, {});
      setMoreInfoLoader(false);
    }
  };

  const fetchTaskDetails = async (gapId: string, taskId: string) => {
    setMoreInfoLoader(true);
    const res = await getGapTaskDetails(gapId, taskId);
    setTaskDetail(res);
    setSelectedTaskStatus({
      id: res?.taskStatus?.id,
      label: res?.taskStatus?.displayName
    });

    if (
      res?.taskStatus.displayName === OverDue ||
      res?.taskStatus?.displayName === PendingApproval
    ) {
      if (checkTaskListStatusOptions()) {
        let newTaskListOptions = [
          ...taskStatus,
          {
            id: res?.taskStatus?.id,
            value: res?.taskStatus?.id,
            label: res?.taskStatus?.displayName
          }
        ];
        updateTaskListOptions(newTaskListOptions);
      }
    }
    setMoreInfoLoader(false);
  };

  useEffect(() => {
    fetchTaskDetails(gapId, taskId);
  }, []);

  const checkTaskListStatusOptions = () => {
    let overdueOption = taskStatus?.filter(
      (item) => item?.label === OverDue || item?.label === PendingApproval
    );

    if (overdueOption[0]) {
      return false;
    }

    return true;
  };
  const updateTaskListOptions = (newTaskStatusOptions) => {
    dispatch({
      type: 'gapAnalysisSlice/setTaskStatusOptions',
      payload: newTaskStatusOptions
    });
  };
  const handleDeleteModalOpen = async () => {
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleModalDelete = async () => {
    try {
      const res = await deleteTask(gapId, taskDetail?.taskId);
      showSuccessMessage(res?.message, '', {});
      handleNavigateAfterDelete();
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause, {});
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <>
      {moreInfoLoader ? (
        <Box className="flex-basic-center mt-100">
          <CircularProgressLoader />
        </Box>
      ) : (
        <>
          <Card>
            <CardHeader
              className="p-0"
              title={
                <TaskHeader
                  actions={actions}
                  handleDelete={handleDeleteModalOpen}
                  riskStatus={taskDetail?.riskLevel}
                  taskStatus={{
                    handleOptionChange: handleTaskStatusChange,
                    options: taskStatus || [],
                    selectedStatus: selectedTaskStatus
                  }}
                  taskTitle=""
                  titleTags={[
                    {
                      title: t('regulation'),
                      value: taskDetail?.regulationName
                    },
                    {
                      title: t('averageFineAmount'),
                      value: taskDetail?.averageFineAmount
                    },
                    {
                      title: t('noOfEnforcementActions'),
                      value: taskDetail?.noOfEnforcementActions
                    }
                  ]}
                  isMoreInfo
                  handleEdit={handleEdit}
                />
              }
            />
            <CardContent>
              <Box className="moreInfoScroll">
                <TaskView taskDetails={taskDetail} taskType={'gap-analysis'} />
              </Box>
            </CardContent>
          </Card>
          <DeleteFileModal
            handleClose={handleModalClose}
            handleDelete={handleModalDelete}
            open={deleteModalOpen}
            subText={t('deleteTaskMessage', { ns: 'english' })}
            modalTitle={`${t('deleteTaskTitle', { ns: 'english' })}`}
            btnPrimaryText={t('deleteBtnText', { ns: 'english' })}
          />
        </>
      )}
    </>
  );
};

export default MoreInfo;
