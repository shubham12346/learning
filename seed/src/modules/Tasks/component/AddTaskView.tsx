import { Box, Card, CardActions, CardContent, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TaskAddEditForm from 'src/modules/ActionPlan/component/TaskPlan/TaskAddEditForm';
import BreadCrumbComponent from 'src/shared/components/Breadcrum/BreadCrumbComponent';
import { FormikProvider, useFormik } from 'formik';
import GapActionPlanFootersActions from 'src/modules/GapActionPlan/component/GapActionPlanFootersActions';
import { useTranslation } from 'react-i18next';
import useAgency from '../hooks/useAgency';
import { RootState } from 'src/store/reducer';
import { useMemo, useState } from 'react';
import { uploadNewFile } from 'src/modules/Users/apis/UserApis';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { deleteAttachmentForATask } from 'src/modules/ActionPlan/api/actionplanApi';
import { getErrorMessage } from 'src/modules/ActionPlan/component/utils';
import { AddNewTaskType } from 'src/modules/Regulations/model/RegulationsInterface';
import { createManualTask } from '../api/tasksApi';
import { DEFAULT_MAX_DATE } from 'src/modules/Fines/component/contants';

const AddTaskView = () => {
  const { t } = useTranslation('english');
  const dispatch = useDispatch();
  const agencyList = useSelector(
    (state: RootState) => state?.tasks?.agencyList
  );
  const taskStatus = useSelector(
    (state: RootState) => state?.gapAnalysis?.taskStatus
  );
  const [files, setFiles] = useState([] as any[]);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

  useAgency({ getNone: true });

  const taskStatusId = useMemo(() => {
    if (taskStatus.length >= 0) {
      return taskStatus.filter((item) => item.label === 'Created')[0]?.id;
    }
  }, []);

  const initialValues: any = {
    taskname: '',
    summaryname: '',
    description: '',
    targetdate: null,
    owner: '',
    agency: '',
    regulation: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (value) => {
      if (value.owner && value.targetdate && value.taskname) {
        setIsBtnDisabled(false);
      } else {
        setIsBtnDisabled(true);
      }
    },
    onSubmit: (values: any, event) => {
      setIsBtnDisabled(true);
      addNewTask(values);
    }
  });

  const { handleSubmit } = formik;

  let breadCrumb = [
    {
      title: 'Task ',
      className: ''
    },
    {
      title: ' Add Task ',
      className: ''
    }
  ];

  const handleRedirect = () => {
    dispatch({
      type: 'tasks/selectCurrentScreen',
      payload: 'TaskAndCalendarView'
    });
  };

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

        // fetchTaskDetail();
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

  // Add new task
  async function addNewTask(values: any) {
    //date in utc
    //
    const payload: AddNewTaskType = {
      taskName: values.taskname,
      summaryId: values.summaryname,
      description: values.description?.trim() || '',
      targetDate: values.targetdate,
      taskStatusId: taskStatusId,
      ownerUid: values.owner,
      controlTest: values?.controlTest?.trim() || '',
      testResult: values.testResult?.trim() || '',
      recommendedChanges: values?.recommendedChanges?.trim() || '',
      tag: values?.tag?.join(',') || '',
      regulationId: values?.regulation || null,
      regulatoryOrganizationId: values?.agency || null
    };

    try {
      let respData;

      respData = await createManualTask(payload);
      const { taskUid } = respData;
      saveUploadedFile(taskUid);

      showSuccessMessage(respData?.message, '', {
        position: 'top-right'
      });
      handleRedirect();
    } catch (error) {
      let errorMsg = getErrorMessage(error.response.data.cause);
      showErrorMessage(errorMsg, {
        position: 'top-right'
      });
    }
  }

  return (
    <Box>
      <Box>
        <BreadCrumbComponent
          breadCrumbMenu={breadCrumb}
          redirect={handleRedirect}
        />
      </Box>
      <Card>
        <Divider className="divider" />
        <CardContent sx={{ p: 0 }} className="addNewTaskScroll ">
          <FormikProvider value={formik}>
            <form style={{ gap: 4 }}>
              <TaskAddEditForm
                agencyList={agencyList}
                files={files}
                attachedFiles={attachedFiles}
                handleDeleteAttachment={handleDeleteAttachment}
                regulationEnforcementDate={DEFAULT_MAX_DATE}
                formikValue={formik}
                isAddRegulation={true}
              />
            </form>
          </FormikProvider>
        </CardContent>
        <CardActions sx={{ px: 0 }}>
          <GapActionPlanFootersActions
            handleDiscardActionPlan={handleRedirect}
            handleSaveActionPlan={handleSubmit}
            textConfig={{ cancel: t('cancel'), save: t('saveBtnText') }}
            saveDisable={isBtnDisabled}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddTaskView;
