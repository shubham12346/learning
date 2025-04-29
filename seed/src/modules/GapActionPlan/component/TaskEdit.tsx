import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import TaskHeader from './TaskHeader';
import TaskForm from './TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import {
  deleteTask,
  getGapTaskDetails,
  saveEditGapTaskDetails
} from '../api/gapActionPlanApi';
import GapActionPlanFootersActions from './GapActionPlanFootersActions';
import { useTranslation } from 'react-i18next';
import { PendingApproval, OverDue, Undefined, ROLES } from './constants';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { DeleteFileModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';
import { uploadNewFile } from 'src/modules/Users/apis/UserApis';
import { deleteAttachmentForATask } from 'src/modules/ActionPlan/api/actionplanApi';
import { DEFAULT_MAX_DATE } from 'src/modules/Fines/component/contants';

const TaskEdit = ({ gapId, taskId, actions, handleNavigateAfterSave }) => {
  const { taskStatus } = useSelector((state: RootState) => state.gapAnalysis);
  const { t } = useTranslation('regulations');
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskDetail, setTaskDetail] = useState<any>({});
  const [revisedModalView, setRevisedModalView] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState({
    id: '',
    label: ''
  });
  const [editTaskLoader, setEditTaskLoader] = useState(false);
  const [addAdminUser, setAddAdminUser] = useState([]);

  const initialValues = {
    taskname: '',
    gapAnalysisRemediation: '',
    targetdate: '',
    owner: '',
    taskstatus: ''
  };

  const editTaskValues = {
    taskname: taskDetail?.taskName,
    gapAnalysisRemediation: taskDetail?.gapAnalysisRemediation,
    targetdate: taskDetail?.targetDate,
    owner: taskDetail?.owner?.uid,
    taskstatus: selectedTaskStatus?.id,
    taskCadence: taskDetail?.taskCadence?.id
  };

  const formik = useFormik({
    initialValues: editTaskValues || initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validate: (value) => {},
    onSubmit: (values: any, event) => {}
  });

  const handleTaskSave = async () => {
    const payLoad = {
      taskName: formik.values?.taskname,
      gapAnalysisRemediation: formik.values?.gapAnalysisRemediation,
      revisedPolicy: revisedModalView,
      targetDate: formik.values?.targetdate,
      ownerUid: formik.values?.owner,
      taskStatusId:
        taskDetail?.taskStatus?.id === formik.values?.taskstatus
          ? ''
          : formik.values?.taskstatus
    };

    if (Object.keys(formik?.errors).length === 0) {
      await saveEditGapTask(payLoad);
      await saveUploadedFile();
      handleNavigateAfterSave();
    } else {
      const errorString = Object.values(formik?.errors)[0].toString();
      showErrorMessage(errorString || 'something went wrong', {
        position: 'top-right'
      });
    }
  };

  const handleCancel = () => {
    handleNavigateAfterSave();
  };

  const fetchTaskDetails = async (gapId: string, taskId: string) => {
    setEditTaskLoader(true);
    const res = await getGapTaskDetails(gapId, taskId);
    setTaskDetail(res);
    setRevisedModalView(res?.revisedPolicy || '');
    setFiles(res?.attachment || []);
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
    setEditTaskLoader(false);
    updateTaskStatusOptions(res?.owner);
  };

  const updateTaskStatusOptions = (owner) => {
    if (ROLES.includes(owner?.role)) {
      let adminUser = {
        userUid: owner?.uid,
        fullName: owner?.name
      };
      setAddAdminUser([adminUser]);
    } else {
      setAddAdminUser([]);
    }
  };
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

  useEffect(() => {
    fetchTaskDetails(gapId, taskId);
    return () => {
      let removeOverDueOptions = taskStatus?.filter(
        (item) => ![OverDue, PendingApproval].includes(item?.label)
      );
      updateTaskListOptions(removeOverDueOptions);
    };
  }, []);

  const handleTaskStatusChange = (event) => {
    const taskStatusId = event?.target.value;
    const displayName = taskStatus?.filter(
      (item) => item.id === taskStatusId
    )?.[0]?.label;
    setSelectedTaskStatus({ id: taskStatusId, label: displayName });
  };

  //Save API for edit task
  const saveEditGapTask = async (payload) => {
    try {
      const res = await saveEditGapTaskDetails(gapId, taskId, {
        ...payload
      });
      if (res.message === 'Task edited successfully') {
        showSuccessMessage(res.message, '', {});
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || '', {
        position: 'top-right'
      });
    }
  };

  //save attachments api
  const saveUploadedFile = async () => {
    const formData = new FormData();
    let countUploadedByObject = 0;
    for await (const eachFile of files) {
      if (eachFile?.key) {
        countUploadedByObject++;
      }
      formData.append('files', eachFile);
    }
    if (countUploadedByObject !== files?.length && files?.length >= 1) {
      try {
        await uploadNewFile(taskDetail?.taskUid, formData);
      } catch (error) {
        showErrorMessage(error.response.data.cause, {
          position: 'top-right'
        });
        return false;
      }
    }
  };

  const handleRevisedPolicySave = async (value) => {
    setRevisedModalView(value);
  };

  const getNewAttachments = (attachments: any) => {
    setFiles([...files, ...attachments]);
  };

  const handleDeleteFiles = async (taskDetail, item, index) => {
    if ('uploadedAt' in item) {
      const res = await deleteAttachmentForATask(taskDetail.taskUid, {
        keys: [item.key]
      });
      await fetchTaskDetails(gapId, taskId);
      showSuccessMessage(res.message, '', {});
    } else {
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles.splice(index, 1);
        return newFiles;
      });
      showSuccessMessage('Attachment deleted successfully', '', {});
    }
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
      handleNavigateAfterSave();
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause, {});
    } finally {
      setDeleteModalOpen(false);
    }
  };
  return (
    <>
      <Card>
        <CardHeader
          sx={{ p: 0 }}
          title={
            <TaskHeader
              actions={actions}
              handleDelete={handleDeleteModalOpen}
              riskStatus={taskDetail?.riskLevel || Undefined}
              taskStatus={{
                handleOptionChange: handleTaskStatusChange,
                options: taskStatus || [],
                selectedStatus: selectedTaskStatus
              }}
              taskTitle=""
              titleTags={[
                {
                  title: 'Regulation',
                  value: taskDetail?.regulationName
                },
                {
                  title: 'Average Fine amount',
                  value: taskDetail?.averageFineAmount
                },
                {
                  title: 'No. of enforcement actions',
                  value: taskDetail?.noOfEnforcementActions
                }
              ]}
            />
          }
        />

        <CardContent sx={{ p: 0 }} className="averyAitaskCardBody">
          <FormikProvider value={formik}>
            <TaskForm
              formik={formik}
              revisedModalView={revisedModalView}
              files={files}
              getNewAttachments={getNewAttachments}
              taskDetail={taskDetail}
              handleSave={handleRevisedPolicySave}
              handleDeleteFiles={handleDeleteFiles}
              editTaskLoader={editTaskLoader}
              AdminUser={addAdminUser}
              DEFAULT_MAX_DATE={DEFAULT_MAX_DATE}
            />
          </FormikProvider>
        </CardContent>

        <CardActions sx={{ px: 0 }}>
          <GapActionPlanFootersActions
            handleDiscardActionPlan={handleCancel}
            handleSaveActionPlan={handleTaskSave}
            textConfig={{ cancel: t('cancelBtnText'), save: t('saveBtnText') }}
          />
        </CardActions>
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
  );
};

export default TaskEdit;
