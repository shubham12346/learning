import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import {
  addTask,
  deleteAttachmentForATask
} from 'src/modules/ActionPlan/api/actionplanApi';
import TaskAddEditForm from 'src/modules/ActionPlan/component/TaskPlan/TaskAddEditForm';
import { getErrorMessage } from 'src/modules/ActionPlan/component/utils';
import { DEFAULT_MAX_DATE } from 'src/modules/Fines/component/contants';
import { AddNewTaskType } from 'src/modules/Regulations/model/RegulationsInterface';
import TaskHeadActions from 'src/modules/Tasks/component/tasks/TaskHeadActions';
import { uploadNewFile } from 'src/modules/Users/apis/UserApis';
import { Button } from 'src/shared/components/button/Button';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { customInternationDate2 } from 'src/shared/utils/utils';

interface AveryAddTaskProps {
  taskData?: any;
  isTaskAddedSuccess?: (e) => void;
  cancelAddTask?: () => void;
}

const AddTask = ({
  taskData,
  isTaskAddedSuccess,
  cancelAddTask
}: AveryAddTaskProps) => {
  //const
  // const currentDate = getDate();
  const [files, setFiles] = useState([] as any[]);

  const initialValues: any = {
    taskname: taskData?.questions || '',
    summaryname: '',
    description: taskData?.answers || '',
    targetdate: customInternationDate2(new Date()).toString() || '',
    owner: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      addEditTask(values);
    }
  });

  //state variables
  const [selectedTaskID, setSelectedTaskID] = useState();
  const { handleSubmit } = formik;

  //methods
  const handleSelectedValue = (value) => {
    setSelectedTaskID(value);
  };

  //add new task
  async function addEditTask(values: any) {
    const event = new Date(values.targetdate + 'UTC');
    const isoStringDate = event.toISOString();

    // Expected output: "Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)"
    // Note: your timezone may vary

    const payload: AddNewTaskType = {
      taskName: values.taskname,
      summaryId: values.summaryid,
      description: values.description?.trim(),
      targetDate: isoStringDate,
      taskStatusId: selectedTaskID,
      ownerUid: values.owner,
      questionId: taskData?.id,
      controlTest: values?.controlTest?.trim() || '',
      testResult: values?.testResult?.trim() || '',
      recommendedChanges: values?.recommendedChanges?.trim() || '',
      tag: values?.tag?.join(',') || ''
    };

    try {
      const respData = await addTask(payload);
      const { taskUid } = respData;
      saveUploadedFile(taskUid);
      showSuccessMessage(respData?.message, '', {
        position: 'top-right'
      });
      formik.resetForm(initialValues);
      isTaskAddedSuccess({ ...taskData, isTaskAdded: true });
    } catch (error) {
      let errorMsg = getErrorMessage(error.response.data.cause) || '';
      showErrorMessage(errorMsg, {
        position: 'top-right'
      });
    }
  }

  const saveUploadedFile = async (taskUid) => {
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
        await uploadNewFile(taskUid, formData);
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
      } catch (error) {
        let updatedFiles = files?.filter(
          (attachment) => attachment?.name !== item?.name
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
    <Box className="mt-24">
      <Card className="taskCard">
        <CardHeader
          sx={{ py: 6, px: 8, minHeight: '6.875rem' }}
          title={
            <TaskHeadActions
              isEdit={true}
              handleSelectedValue={handleSelectedValue}
              actions={['select-tasks']}
              setInitialValue={handleSelectedValue}
            />
          }
        />
        <Divider className="divider" />
        <CardContent sx={{ p: 0 }} className="averyAitaskCardBody ">
          <FormikProvider value={formik}>
            <form style={{ gap: 4 }}>
              <TaskAddEditForm
                files={files}
                attachedFiles={attachedFiles}
                handleDeleteAttachment={handleDeleteAttachment}
                regulationEnforcementDate={DEFAULT_MAX_DATE}
              />
            </form>
          </FormikProvider>
        </CardContent>
        <CardActions>
          <Box sx={{ py: 4, px: 4 }} className="flex-basic-space-between w-100">
            <Box className="flex-basic-end w-60">
              <Button
                variant="outlined"
                type="submit"
                className="mr-24"
                btnText="Cancel"
                onClick={cancelAddTask}
                sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
              />
              <Button
                variant="contained"
                type="submit"
                btnText="Create"
                disabled={!formik.isValid}
                onClick={(event: any) => handleSubmit(event)}
                sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
              />
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddTask;
