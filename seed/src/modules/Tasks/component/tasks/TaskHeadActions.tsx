import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  customInternationDate,
  StatusWiseClassSet
} from 'src/shared/utils/utils';
import { Button } from 'src/shared/components/button/Button';
import { Select } from 'src/shared/components/select/Select';
import {
  geTaskStatusList,
  updateStatusOfTask
} from 'src/modules/ActionPlan/api/actionplanApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { taskheaderProps } from '../../model/taskModel';

const TaskHeadActions = (props: taskheaderProps) => {
  //const
  const {
    isEdit,
    setDeleteModalOpen,
    setIsEdit,
    taskDetails,
    handleSelectedValue,
    setInitialValue,
    actions
  } = props;
  const { t } = useTranslation('regulations');

  //state variables
  const [taskStatusList, setStatusList] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  //useEffect
  useEffect(() => {
    getTaskStatusListData();
  }, []);

  //methods

  const getTaskStatusListData = async () => {
    const respData = await geTaskStatusList();
    setSelectedValue(taskDetails?.taskStatus?.id || respData?.status[0]?.id);
    setTaskStatus(
      taskDetails?.taskStatus?.displayName || respData?.status[0]?.displayName
    );
    if (
      taskDetails &&
      (taskDetails?.taskStatus?.displayName === 'Overdue' ||
        taskDetails?.taskStatus?.displayName === 'Pending Approval (Overdue)')
    ) {
      const statusUpdatedList: any = {
        displayName: taskDetails?.taskStatus?.displayName,
        id: taskDetails?.taskStatus?.id,
        name: taskDetails?.taskStatus?.name
      };
      setStatusList([...respData?.status, statusUpdatedList]);
    } else {
      // handleSelectedValue(respData?.status[0]?.id);
      setStatusList(respData?.status);
    }

    // set initial value for add new task of ai chat
    if (setInitialValue) {
      setInitialValue(respData?.status[0]?.id);
    }
  };

  const handleOptionChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    const setStatusTask = taskStatusList?.find(
      (status) => status.id === selectedOption
    );
    let isTaskStatusUpdate;
    if (!isEdit) {
      const { taskUid } = taskDetails;
      isTaskStatusUpdate = await getStatusOfTaskUpdated(
        taskUid,
        setStatusTask.name
      );
      handleSelectedValue(isTaskStatusUpdate ? selectedOption : selectedValue);
      setSelectedValue(isTaskStatusUpdate ? selectedOption : selectedValue);
      setTaskStatus(
        isTaskStatusUpdate ? setStatusTask.displayName : taskStatus
      );
    } else {
      handleSelectedValue(selectedOption);
      setSelectedValue(selectedOption);
      setTaskStatus(setStatusTask.displayName);
    }
  };

  const getStatusOfTaskUpdated = async (
    taskId: string,
    taskStatusName: string
  ): Promise<boolean> => {
    try {
      const res = await updateStatusOfTask(taskId, taskStatusName);
      if (res.message === t('taskStatusUpdatedSuccessfully')) {
        showSuccessMessage(t('taskStatusUpdatedSuccessfully'), '', {
          position: 'top-right'
        });
        return true;
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
      return false;
    }
  };

  return (
    <Box className="flex-basic-space-between">
      <Box className="flex-column-start">
        <Box className="mt-4">
          <Typography
            variant="body1"
            className="textWeightMedium flex-basic-center"
          >
            <Box>{t('createdLbl')}</Box>
            <Box sx={{ pl: 1 }}>
              {taskDetails?.createdDate ? (
                <Box>{customInternationDate(taskDetails?.createdDate)}</Box>
              ) : (
                <Box>{customInternationDate(new Date().toString())}</Box>
              )}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box className="d-flex">
        {actions.includes('edit-tasks') && (
          <Button
            variant="outlined"
            type="submit"
            size={'small'}
            btnText={t('editBtnText')}
            onClick={() => {
              setIsEdit(true);
            }}
            className={`mr-16 ${isEdit ? 'displayHidden' : ''}`}
            sx={{ py: '0.375rem', px: '2rem' }}
          />
        )}
        {actions.includes('delete-tasks') && (
          <Button
            variant="outlined"
            type="submit"
            size={'small'}
            className="mr-16"
            btnText={t('deleteBtnText')}
            onClick={() => {
              setDeleteModalOpen(true);
            }}
            sx={{ py: '0.375rem', px: '2rem' }}
          />
        )}
        <Box className={`customSelect ${StatusWiseClassSet[taskStatus]}`}>
          <Select
            id="customSelectControl"
            disabled={!actions.includes('edit-tasks')}
            fullWidth
            label={''}
            defaultValue={selectedValue}
            value={selectedValue}
            options={taskStatusList || []}
            itemValue={'id'}
            itemText={'displayName'}
            onChange={(e) => handleOptionChange(e)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskHeadActions;
