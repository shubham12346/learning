import {
  Box,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  CardActions,
  Container
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/components/button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import useQuery from 'src/shared/components/hooks/useQuery';
import TaskAddEditForm from './TaskAddEditForm';
import { FormikProvider, useFormik } from 'formik';

import {
  editTask,
  geTaskStatusList,
  getGenerateActionPlanForRegulation,
  getTaskDetails,
  addTask,
  updateStatusOfTask,
  deleteAttachmentForATask
} from 'src/modules/ActionPlan/api/actionplanApi';
import { uploadNewFile } from 'src/modules/Users/apis/UserApis';
import { Select } from 'src/shared/components/select/Select';
import {
  ActionPlanOverviewType,
  AddNewTaskType,
  TaskStatusType
} from 'src/modules/Regulations/model/RegulationsInterface';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import {
  StatusWiseClassSet,
  customInternationDate,
  getDate
} from 'src/shared/utils/utils';
import * as ROUTES from 'src/shared/constants/routes';
import TaskView from './TaskView';
import { DeleteTaskModal } from '../DeleteTaskModal';
import DiscardModal from 'src/modules/common/component/DiscardModel';
import { getErrorMessage } from '../utils';

const initialValues: any = {
  taskname: '',
  summaryname: '',
  description: '',
  targetdate: '',
  owner: ''
};

function TaskPlan(props) {
  //constant
  const { actions } = props;
  let { regId, actionId, taskMode } = useParams();
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();
  const query = useQuery();
  const taskUid = query.get('taskUid');
  const taskDisplayId = query.get('taskDisplayId') || '';
  const taskOccurrenceId = query.get('taskOccurrenceId') || '';
  console.log('taskOccurrenceId', taskOccurrenceId);

  //stats variables
  const [taskStatusList, setTaskStatusList] = useState<TaskStatusType[]>([]);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(true);
  const [value, setValue] = useState('');
  const [taskDetails, setTaskDetails] = useState<any>({});
  const [showDeleteTaskModal, setShowDeleteTaskModal] = React.useState(false);
  const [isTaskAdd, setIsTaskAdd] = useState<boolean>(false);
  const [isTaskView, setIsTaskView] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState('');
  const [generatedActionPlanDetail, setGeneratedActionPlanDetail] =
    useState<ActionPlanOverviewType>();
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const [unSavedChanges, setUnSavedChanges] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [files, setFiles] = useState([] as any[]);
  const [uploadeFiles] = useState([] as any[]);
  const [showCadenceModal, setShowCadenceModal] = useState<{
    modalState: boolean;
    editAllInstance: boolean;
    values: any;
  }>({ editAllInstance: false, modalState: false, values: null });
  //setPageLoadData
  console.log('taskDetails', taskDetails);
  const initialSetTaskValues: any = {
    taskname: taskDetails?.taskName,
    summaryname: taskDetails?.summary?.id,
    description: taskDetails?.description,
    targetdate: taskDetails?.targetDate || getDate(),
    owner: taskDetails?.owner?.uid,
    controlTest: taskDetails?.controlTest,
    testResult: taskDetails?.recommendedChanges,
    recommendedChanges: taskDetails?.recommendedChanges,
    tag: taskDetails?.tag?.split(',') || [],
    cadence: taskDetails?.taskCadence?.id
  };

  const formik = useFormik({
    initialValues: initialSetTaskValues || initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validate: (value) => {
      if (value.owner && value.targetdate && value.taskname) {
        setIsBtnDisabled(false);
      } else {
        setIsBtnDisabled(true);
      }
      setDisabled(value);
    },
    onSubmit: (values: any, event) => {
      setIsBtnDisabled(true);
      console.log('inside submit', values);
      if (taskMode === 'edit') {
        console.log('open edit modal');
        setShowCadenceModal({
          editAllInstance: false,
          modalState: true,
          values: values
        });
      } else {
        addEditTask(values);
      }
    }
  });

  const { handleSubmit } = formik;

  //useEffect
  useEffect(() => {
    setIsShowLoader(true);
    getDetailsOfGenerateActionPlan(regId);
  }, []);

  // check if it new task or editing previous task then call status list api

  const checkTaskMode = () => {
    if (taskMode === 'add') {
      getTaskStatusListData();
    } else {
      viewTask();
    }
  };

  useEffect(() => {
    if (taskMode === 'add' || taskMode === 'edit') {
      setIsTaskAdd(true);
    } else if (taskMode === 'view') {
      setIsTaskView(true);
    }
  }, []);

  //methods
  const getTaskStatusListData = async () => {
    const respData = await geTaskStatusList();
    setValue(respData?.status[0].id);
    setTaskStatus(respData?.status[0].displayName);
    setTaskStatusList(respData?.status);
    setIsShowLoader(false);
  };

  const handleOptionChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedoption = event.target.value;
    const setStatusTask = taskStatusList?.find(
      (status) => status.id === selectedoption
    );
    const { taskUid } = taskDetails;
    if (taskUid && taskMode !== 'edit') {
      const isTaskStatusUpdate = await getStatusOfTaskUpdated(
        taskUid,
        setStatusTask.name
      );
      setValue(isTaskStatusUpdate ? selectedoption : value);
      setTaskStatus(
        isTaskStatusUpdate ? setStatusTask.displayName : taskStatus
      );
      setUnSavedChanges(true);
    } else {
      setValue(selectedoption);
      setTaskStatus(setStatusTask.displayName);
    }
  };

  const getDetailsOfGenerateActionPlan = async (regulationId) => {
    let respData = await getGenerateActionPlanForRegulation(regulationId);
    setGeneratedActionPlanDetail(respData);
    checkTaskMode();
  };

  const goToEditTask = () => {
    setIsTaskAdd(true);
    setIsTaskView(false);
    navigate(
      `/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/${regId}/${ROUTES.ACTION}/${actionId}/task/edit?taskUid=${taskDetails?.taskUid}&&taskOccurrenceId=${taskOccurrenceId}`
    );
  };

  //setDisabled
  const setDisabled = (value: any) => {
    if (taskMode === 'edit') {
      if (initialSetTaskValues != value) {
        setUnSavedChanges(true);
      } else {
        setUnSavedChanges(false);
      }
    }
  };

  //add new task
  async function addEditTask(values: any, editAllInstance = false) {
    //date in utc
    //
    const actionPlanUid = generatedActionPlanDetail?.actionPlanVersionUid;
    console.log('values', values);
    const payload: AddNewTaskType = {
      taskName: values.taskname,
      summaryId: values.summaryname,
      description: values.description?.trim() || '',
      targetDate: values.targetdate,
      taskStatusId: taskDetails?.taskStatus?.id === value ? '' : value,
      ownerUid: values.owner,
      controlTest: values?.controlTest?.trim() || '',
      testResult: values.testResult?.trim() || '',
      recommendedChanges: values?.recommendedChanges?.trim() || '',
      tag: values?.tag?.join(',') || '',
      taskCadenceId: values?.cadence
    };
    if (taskMode !== 'edit') {
      payload['actionPlanUid'] = actionPlanUid;
    }

    try {
      let respData;
      if (taskMode === 'edit') {
        await saveUploadedFile(taskDetails?.taskUid);
        respData = await editTask(
          taskUid,
          taskOccurrenceId,
          payload,
          editAllInstance
        );
      } else {
        respData = await addTask(payload);
        const { taskUid } = respData;
        saveUploadedFile(taskUid);
      }
      showSuccessMessage(respData?.message, '', {
        position: 'top-right'
      });
      goBackToActionPlanDetails();
    } catch (error) {
      let errorMsg = getErrorMessage(error.response.data.cause);
      showErrorMessage(errorMsg, {
        position: 'top-right'
      });
    }
  }

  //view task ||  sets all the ststes for edit and more info
  const viewTask = async () => {
    const respData = await getTaskDetails(taskUid, taskOccurrenceId);
    // get all the status list
    const statusRespData = await geTaskStatusList();

    if (
      respData?.taskStatus.displayName === 'Overdue' ||
      taskDetails?.taskStatus?.displayName === 'Pending Approval (Overdue)'
    ) {
      const statusUpdatedList: any = {
        displayName: respData?.taskStatus.displayName,
        id: respData?.taskStatus.id,
        name: respData?.taskStatus.name
      };
      setTaskStatusList([...(statusRespData?.status || []), statusUpdatedList]);
    } else {
      setTaskStatusList([...(statusRespData?.status || [])]);
    }
    setValue(respData?.taskStatus.id);
    setTaskStatus(respData?.taskStatus.displayName);
    setTaskDetails(respData);
    if (respData?.attachment) {
      setFiles(respData?.attachment);
    }
    setIsShowLoader(false);
  };

  // update status of task
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
  const handleTaskDeleteModalClose = () => {
    setShowDeleteTaskModal(false);
  };

  const goBackToActionPlanDetails = () => {
    navigate(
      `/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/${regId}/${ROUTES.ACTION}/${actionId}`
    );
  };

  const handleModelOpen = () => {
    setOpenModel(true);
  };

  const checkIfEditTaskIsEdited = () => {
    if (taskMode === 'edit' && unSavedChanges) {
      handleModelOpen();
    } else {
      goBackToActionPlanDetails();
    }
  };

  const saveUploadedFile = async (taskUid) => {
    const formData = new FormData();
    let countUploadedByObject = 0;
    for await (const eachFile of files) {
      if (eachFile?.key) {
        countUploadedByObject++;
      }
      formData.append('files', eachFile || eachFile.File);
    }
    if (countUploadedByObject !== files?.length && files?.length >= 1) {
      try {
        await uploadNewFile(taskUid, formData);
        goBackToActionPlanDetails();
      } catch (error) {
        showErrorMessage(error.response.data.cause, {
          position: 'top-right'
        });
      }
    }
  };

  const attachedFiles = async (file: any) => {
    setFiles([...files, ...file]);
  };

  // delete attachment for a file
  const handleDeleteAttachment = async (taskDetails, item, fileIndex) => {
    if (taskMode === 'edit' && files?.length >= 1) {
      try {
        let payload = {
          keys: [item?.key]
        };
        if (files) {
          await deleteAttachmentForATask(taskDetails?.taskUid, payload);

          viewTask();
        }
      } catch (error) {
        let updatedFiles = files?.filter(
          (attachment, index) => index !== fileIndex
        );
        setFiles(updatedFiles);
      }
    } else {
      let updatedFiles = files?.filter(
        (attachment) => attachment?.name !== item?.name
      );
      setFiles(updatedFiles);
    }
  };

  const taskEditForAllInstances = () => {
    addEditTask(showCadenceModal.values, true);
    setShowCadenceModal({
      editAllInstance: false,
      modalState: false,
      values: null
    });
  };

  const taskEditForSingleInstance = () => {
    addEditTask(showCadenceModal.values, false);
    setShowCadenceModal({
      editAllInstance: false,
      modalState: false,
      values: null
    });
  };
  console.log('taskMode', taskMode);
  return (
    <Container maxWidth={'xl'}>
      {isShowLoader ? (
        <Box className="flex-basic-center mt-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <Box className="taskPlan">
          <Box className="flex-basic-space-between mb-26">
            <Box className="flex-basic-start w-100 text-ellipsis">
              <Box
                onClick={checkIfEditTaskIsEdited}
                className="mr-16 d-flex iconArrowBack flex-basic-center cursorPointer"
              >
                <ArrowBackIcon sx={{ color: '#fff' }} />
              </Box>
              <Typography
                variant="h4"
                className="textWeightMedium flex-basic-start text-ellipsis customWidth100"
              >
                <Box>
                  {generatedActionPlanDetail?.regulationInfo?.regulatoryBody}
                </Box>
                <Box sx={{ pr: 1 }}> : </Box>
                <Box className="text-ellipsis">
                  {generatedActionPlanDetail?.regulationInfo?.regulationName}
                </Box>
                <Box className="d-flex">
                  <Box
                    sx={{ mx: 1 }}
                    className="icon-dropdown icon-rotate-273 iconStyle"
                  ></Box>
                </Box>
                <Box
                  className={`${
                    taskDisplayId ? '' : 'textweight textPrimaryColor'
                  }  iconStyle`}
                >
                  {t('actionPlanSectionText.actionPlanText')}
                </Box>
              </Typography>
            </Box>
          </Box>
          <Card className="taskCard">
            <CardHeader
              sx={{ py: 6, px: 8, minHeight: '6.875rem' }}
              title={
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
                            <Box>
                              {customInternationDate(taskDetails?.createdDate)}
                            </Box>
                          ) : (
                            <Box>{customInternationDate(getDate())}</Box>
                          )}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="d-flex">
                    {isTaskView && (
                      <>
                        {actions?.includes('edit-task') && (
                          <Button
                            variant="outlined"
                            type="submit"
                            size={'small'}
                            btnText={t('editBtnText')}
                            onClick={() => {
                              goToEditTask();
                            }}
                            className="mr-16"
                            sx={{ py: '0.375rem', px: '2rem' }}
                          />
                        )}
                        {actions.includes('delete-task') && (
                          <Button
                            variant="outlined"
                            type="submit"
                            size={'small'}
                            className="mr-16"
                            btnText={t('deleteBtnText')}
                            onClick={() => {
                              setShowDeleteTaskModal(true);
                            }}
                            sx={{ py: '0.375rem', px: '2rem' }}
                          />
                        )}
                      </>
                    )}
                    <Box
                      className={`customSelect ${StatusWiseClassSet[taskStatus]}`}
                    >
                      <Select
                        id="customSelectControl"
                        disabled={!actions?.includes('edit-task')}
                        fullWidth
                        label={''}
                        defaultValue={value}
                        value={value}
                        options={taskStatusList || []}
                        itemValue={'id'}
                        itemText={'displayName'}
                        onChange={(e) => handleOptionChange(e)}
                      />
                    </Box>
                  </Box>
                </Box>
              }
            />
            <Divider className="divider" />
            <CardContent sx={{ p: 0 }} className="taskCardBody">
              {isTaskAdd ? (
                <FormikProvider value={formik}>
                  <form style={{ gap: 4 }}>
                    <TaskAddEditForm
                      files={files}
                      uploadeFiles={uploadeFiles}
                      attachedFiles={attachedFiles}
                      handleDeleteAttachment={handleDeleteAttachment}
                      taskDetails={taskDetails}
                      formikValue={formik}
                      regulationEnforcementDate={
                        generatedActionPlanDetail?.actionPlanTargetDate
                      }
                    />
                  </form>
                </FormikProvider>
              ) : (
                <TaskView taskDetails={taskDetails} />
              )}
            </CardContent>
            <CardActions
              className={`taskCardFooter ${
                isTaskView ? 'taskCardActionHidden' : ' '
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
                    btnText={t('cancelBtnText')}
                    onClick={() => {
                      goBackToActionPlanDetails();
                    }}
                    sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    btnText={t('saveBtnText')}
                    disabled={isBtnDisabled}
                    onClick={(event: any) => handleSubmit(event)}
                    sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                  />
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}

      <DiscardModal
        handleLeavePage={taskEditForSingleInstance}
        handleStayPage={taskEditForAllInstances}
        open={showCadenceModal.modalState}
        text={{
          acceptTitle: t('yes'),
          discardTitle: t('no'),
          description: t('editForAllDesc'),
          title: t('editForAllTitle')
        }}
      />

      <DeleteTaskModal
        selectedItem={taskDetails}
        open={showDeleteTaskModal}
        handleClose={handleTaskDeleteModalClose}
        modalTitle={`${t('deleteTaskTitle')}`}
        getUpdatedActionPlanDetails={goBackToActionPlanDetails}
        actionPlanVersionUid={generatedActionPlanDetail?.actionPlanVersionUid}
      />
    </Container>
  );
}

export default TaskPlan;
