import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from 'src/shared/components/button/Button';
import TaskView from 'src/modules/ActionPlan/component/TaskPlan/TaskView';
import { deleteTask, editTask, getTaskDetail } from '../../api/tasksApi';
import { useTranslation } from 'react-i18next';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { DeleteTaskModal } from './DeleteTaskModel';
import { FormikProvider, useFormik } from 'formik';
import TaskHeadActions from './TaskHeadActions';
import * as ROUTES from 'src/shared/constants/routes';
import { uploadNewFile } from 'src/modules/Users/apis/UserApis';
import DiscardModal from 'src/modules/common/component/DiscardModel';
import Breadcrumb from 'src/shared/components/Breadcrum/Breadcrumb';
import TaskEditForm from './TaskEditFrom';
import { DEFAULT_MAX_DATE } from 'src/modules/Fines/component/contants';
import { deleteAttachmentForATask } from 'src/modules/ActionPlan/api/actionplanApi';
import { getErrorMessage } from 'src/modules/ActionPlan/component/utils';
import { getMaxTargetDate } from 'src/modules/common/utils/utils';

const initialValues: any = {
  taskname: '',
  summaryname: '',
  description: '',
  targetdate: '',
  owner: '',
  cadence: ''
};

const MoreInfoTask = (props) => {
  //const
  const {
    taskId,
    taskOccurrenceId,
    edit = false,
    isCalendarView = false,
    actions
  } = props;
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();
  console.log('cadence', 'task details after task type is checked', props);

  //state variables
  const [isEdit, setIsEdit] = useState<boolean>(edit);
  const [taskDetails, setTaskDetails] = useState<any>();
  const [taskLoader, setTaskLoader] = useState<boolean>();
  const [openDeletedModal, setOpenDeletedModal] = useState<boolean>();
  const [selectedValue, setSelectedValue] = useState('');
  const [unSavedChanges, setUnSavedChanges] = useState<boolean>(false);
  const [openDiscardModel, setOpenDiscardModel] = useState<boolean>();
  const [files, setFiles] = useState([] as any[]);
  const [maxTargetDate, setMaxTargetDate] = useState<string>(
    getMaxTargetDate(
      taskDetails?.createdDate || new Date(),
      taskDetails?.taskCadence?.name
    )
  );
  const initialSetTaskValues: any = {
    taskname: taskDetails?.taskName,
    summaryname: taskDetails?.summary?.id,
    description: taskDetails?.description,
    targetdate: taskDetails?.targetDate,
    owner: taskDetails?.owner?.uid,
    controlTest: taskDetails?.controlTest || '',
    testResult: taskDetails?.testResult || '',
    recommendedChanges: taskDetails?.recommendedChanges || '',
    tag: taskDetails?.tag?.split(',') || [],
    cadence: taskDetails?.taskCadence?.id
  };

  const formik = useFormik({
    initialValues: initialSetTaskValues || initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validate: (value) => {
      setDisabled(value);
    },

    onSubmit: (values: any) => {
      addEditTask(values);
    }
  });

  const { handleSubmit } = formik;

  const setDisabled = (value: any) => {
    if (initialSetTaskValues != value) {
      setUnSavedChanges(true);
    } else {
      setUnSavedChanges(false);
    }
  };

  const handleSelectedValue = (value) => {
    setSelectedValue(value);
    setUnSavedChanges(true);
  };

  const addEditTask = async (values: any) => {
    console.log('values', values);
    //date in utc
    const payload = {
      taskName: values.taskname,
      summaryId: values.summaryname,
      description: values.description?.trim() || '',
      targetDate: values.targetdate,
      taskStatusId:
        taskDetails?.taskStatus?.id === selectedValue ? '' : selectedValue,
      ownerUid: values.owner,
      controlTest: values?.controlTest?.trim() || '',
      testResult: values?.testResult?.trim() || '',
      recommendedChanges: values?.recommendedChanges?.trim() || '',
      tag: values?.tag?.join(',') || '',
      taskCadenceId: values?.cadence
    };
    try {
      //cadence : currentOccurreceonly is true for temporary work
      console.log(
        'cadence',
        'task Details to check edit api onsubmit',
        taskDetails
      );
      const res = await editTask(
        taskDetails?.taskUid,
        taskOccurrenceId,
        false,
        payload
      );
      showSuccessMessage(res?.message, '', {});
      await saveUploadedFile();
      setTimeout(() => {
        goToTasks();
      }, 1000);
    } catch (error) {
      let errorMsg = getErrorMessage(error.response.data.cause);
      showErrorMessage(errorMsg, {});
    }
  };

  useEffect(() => {
    fetchTaskDetail();
  }, []);

  const fetchTaskDetail = async () => {
    setTaskLoader(true);
    const res = await getTaskDetail(taskId, taskOccurrenceId);
    setTaskDetails(res);
    console.log(
      'cadence',
      'task details while fetching task by Id on eidt',
      res
    );
    setMaxTargetDate(
      getMaxTargetDate(
        taskDetails?.createdDate || new Date(),
        res?.taskCadence?.name
      )
    );
    setSelectedValue(res?.taskStatus?.id);
    setTaskLoader(false);
    if (res?.attachment) {
      setFiles(res?.attachment);
    }
  };

  const handleInputChange = (cadence) => {
    formik.setFieldValue('targetdate', null);
    setMaxTargetDate(
      getMaxTargetDate(taskDetails?.createdDate || new Date(), cadence)
    );
  };

  const closeDeleteModal = () => {
    setOpenDeletedModal(false);
  };

  const deleteSelectedTask = async () => {
    try {
      //task Cadence : delete task
      const res = await deleteTask(
        taskDetails?.taskUid,
        taskDetails?.taskOccurrenceId,
        false
      );
      showSuccessMessage(res?.message, '', {});
      goToTasks();
    } catch (error) {
      showErrorMessage(error?.message ?? error, {});
    }
    closeDeleteModal();
  };

  const goToTasks = () => {
    navigate(
      `/${ROUTES.BASEPATH}/${ROUTES.TASKS}?isCalendarView=${isCalendarView}`
    );
  };
  const checkIfEditTaskIsEdited = () => {
    if (isEdit) {
      if (unSavedChanges) {
        setOpenDiscardModel(true);
      } else {
        goToTasks();
      }
    } else {
      goToTasks();
    }
  };

  const handleUnsavedModelLeave = () => {
    goToTasks();
  };

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
        await uploadNewFile(taskDetails?.taskUid, formData);
      } catch (error) {
        showErrorMessage(error.response.data.cause, {
          position: 'top-right'
        });
        return false;
      }
    }
  };

  const attachedFiles = async (file: any) => {
    setFiles([...files, ...file]);
  };

  // delete attachment for a file
  const handleDeleteAttachment = async (taskDetails, item, fileIndex) => {
    if (item?.key) {
      try {
        let payload = {
          keys: [item?.key]
        };
        await deleteAttachmentForATask(taskDetails?.taskUid, payload);

        fetchTaskDetail();
      } catch (error) {
        let updatedFiles = files?.filter(
          (attachment, index) => attachment?.name !== item?.name
        );
        setFiles(updatedFiles);
      }
    } else {
      let updatedFiles = files?.filter(
        (attachment, index) => index !== fileIndex
      );
      setFiles(updatedFiles);
    }
  };
  return (
    <>
      {taskLoader ? (
        <Box className="flex-basic-center mt-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <Box className="taskPlan">
          <Breadcrumb
            parentName={'Tasks'}
            childNamePath={isEdit ? 'Edit Task' : 'More Info'}
            subPathName={taskDetails?.taskName}
            goBackToReports={checkIfEditTaskIsEdited}
          />
          <Card className="taskCard mt-24">
            <CardHeader
              sx={{ py: 6, px: 8, minHeight: '6.875rem' }}
              title={
                <TaskHeadActions
                  isEdit={isEdit}
                  setDeleteModalOpen={setOpenDeletedModal}
                  setIsEdit={setIsEdit}
                  taskDetails={taskDetails}
                  handleSelectedValue={handleSelectedValue}
                  actions={[...actions, 'select-task']}
                  isTaskTitlePlaceholder="Task ID will come over here"
                />
              }
            />
            <Divider className="divider" />
            <CardContent sx={{ p: 0 }} className="taskCardBody">
              {isEdit ? (
                <FormikProvider value={formik}>
                  <form style={{ gap: 4 }}>
                    <TaskEditForm
                      files={files}
                      attachedFiles={attachedFiles}
                      handleDeleteAttachment={handleDeleteAttachment}
                      taskDetails={taskDetails}
                      regulationEnforcementDate={
                        maxTargetDate || DEFAULT_MAX_DATE
                      }
                      handleOnChange={handleInputChange}
                      formik={formik}
                    />
                  </form>
                </FormikProvider>
              ) : (
                <TaskView taskDetails={taskDetails} />
              )}
            </CardContent>
            <CardActions
              className={`taskCardFooter ${
                isEdit ? '' : 'taskCardActionHidden '
              }`}
            >
              <Box
                sx={{ py: 4, px: 4 }}
                className="flex-basic-space-between w-100"
              >
                <Box className="flex-basic-end w-60">
                  <Button
                    variant="outlined"
                    type="submit"
                    className="mr-24"
                    btnText="Cancel"
                    onClick={checkIfEditTaskIsEdited}
                    sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    btnText="Save"
                    disabled={!formik.isValid}
                    onClick={(event: any) => {
                      handleSubmit(event);
                    }}
                    sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                  />
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}
      <DeleteTaskModal
        handleClose={closeDeleteModal}
        handleDelete={deleteSelectedTask}
        open={openDeletedModal}
        selectedRow={taskDetails}
      />

      <DiscardModal
        handleLeavePage={handleUnsavedModelLeave}
        handleStayPage={handleSubmit}
        open={openDiscardModel}
        text={{
          acceptTitle: t('yes'),
          discardTitle: t('no'),
          description: t('unsavedTaskMessage'),
          title: t('unsavedChanges')
        }}
      />
    </>
  );
};

export default MoreInfoTask;
