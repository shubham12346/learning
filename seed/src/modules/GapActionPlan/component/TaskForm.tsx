import { Box, Grid, Typography } from '@mui/material';
import { FormField } from 'src/shared/components/index';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';
import { DATE_FORMATS } from 'src/shared/constants/constants';
import Upload from 'src/modules/common/customUpload/Upload';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputReadonlyAndDownload, {
  InputReadonlyAndDownloadType
} from './InputReadonlyAndDownload';
import GapRevisedModal from './GapRevisedModal';
import useOwnerList from '../hooks/useOwnerList';
import { firmPolicy } from './constants';
import { downloadStringAsTextFile } from 'src/shared/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

const TaskForm = ({
  revisedModalView,
  files,
  getNewAttachments,
  taskDetail,
  formik,
  handleSave,
  handleDeleteFiles,
  editTaskLoader,
  AdminUser = [],
  DEFAULT_MAX_DATE
}) => {
  const ownerList = useSelector(
    (state: RootState) => state.gapAnalysis.ownerList
  );
  const { t } = useTranslation('regulations');
  const [isExpanded, setIsExpanded] = useState({
    id: '',
    value: '',
    title: ''
  });

  // owner
  useOwnerList();
  //methods

  const getNewFilesData = (data: any) => {
    getNewAttachments(data);
  };
  const getOldFilesData = (data: any) => {};

  const handleDownload = (id: string, url: string, textValue: string) => {
    if (id === firmPolicy) {
      window?.open(url);
    } else {
      downloadStringAsTextFile(textValue, id);
    }
  };

  const handleExpand = ({ value, title }) => {
    setIsExpanded({ id: title, title: title, value: value });
  };

  const handleCloseModal = () => {
    setIsExpanded({ id: '', title: '', value: '' });
  };

  const handleSaveModal = (value) => {
    handleSave(value);
    handleCloseModal();
  };

  const handleInputChange = (event, field) => {
    if (field?.name == 'taskname') {
      const value = event?.target?.value;
      let trimmedValue = value?.trim();
      if (trimmedValue !== '') {
        formik?.setFieldValue(field?.name, value.replace(/\s+/g, ' '));
      } else {
        formik?.setFieldValue(field?.name, '');
      }
    }
  };
  const fields: FormFieldType[] = [
    {
      name: 'taskname',
      id: 'taskname',
      type: 'text',
      showInfoIcon: false,
      label: 'Task Name',
      placeholder: 'Enter Task Name',
      showRequired: true,
      multiline: true,
      validations: {
        required: true,
        maxLength: 1000,
        minLength: 3
      },
      errorMessages: {
        minLengthErrMsg: t('enterMin3CharName')
      },
      handleFieldChange: handleInputChange
    },
    {
      id: 'gapAnalysisRemediation',
      name: 'gapAnalysisRemediation',
      type: 'textarea',
      label: 'Gap Analysis Remediation',
      placeholder: 'Enter Description',
      textareaRowsLine: 5
    }
  ];

  const fieldsRightSide: FormFieldType[] = [
    {
      name: 'targetdate',
      id: 'targetdate',
      inputFormat: DATE_FORMATS.MONTH_DATE_YEAR,
      type: 'date',
      label: 'Target Date',
      placeholder: 'Select Target Date',
      minDate: new Date(),
      maxDate: DEFAULT_MAX_DATE,
      showRequired: true,
      validations: {
        required: true
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'owner',
      id: 'owner',
      type: 'select',
      label: 'Owner',
      showRequired: true,
      options: [...ownerList, ...AdminUser],
      itemValueKey: 'userUid',
      itemLabelKey: 'fullName',
      placeholder: 'Select Owner',
      validations: {
        required: true
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'taskCadence',
      id: 'taskCadence',
      type: 'select',
      label: 'Cadence',
      showRequired: true,
      options: [{userUid:taskDetail?.taskCadence?.id,fullName:taskDetail?.taskCadence?.displayName}],
      isDisabled:true,
      itemValueKey: 'userUid',
      itemLabelKey: 'fullName',
      placeholder: 'Select Cadence',
      validations: {
        required: true
      },
    }
  ];

  const inputDownloadFields: InputReadonlyAndDownloadType[] = [
    {
      id: 'firmPolicy',
      title: `Firm's Policy`,
      value: taskDetail?.firmsPolicy ?? '',
      handleDownload: handleDownload,
      handleExpand: handleExpand,
      inputBgClass: 'inputDisabledBoxBg',
      downloadUrl: taskDetail?.firmPolicyDownloadUrl,
      expandArrowTooltip: t('gapActionPlan.expandFirmPolicy')
    },
    {
      id: 'revisedPolicy',
      title: 'Revised Policy',
      value: revisedModalView || '',
      handleDownload: handleDownload,
      handleExpand: handleExpand,
      downloadUrl: taskDetail?.revisedPolicyDownloadUrl || '',
      expandArrowTooltip: t('gapActionPlan.expandRevisedPolicy')
    }
  ];

  return (
    <>
      {editTaskLoader ? (
        <Box className="flex-basic-center mt-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <>
          <Grid container>
            <Grid
              sx={{ pb: 7 }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={7}
              className="borderRight"
            >
              <Box className="" sx={{ px: 8, py: 6 }}>
                {fields?.map((field, index) => (
                  <Box
                    key={`${index}-${field?.name}`}
                    sx={{ pb: 7 }}
                    className="w-100"
                  >
                    <FormField fieldProps={field} />
                  </Box>
                ))}
                <Box>
                  {inputDownloadFields?.map((field) => (
                    <InputReadonlyAndDownload
                      handleDownload={handleDownload}
                      handleExpand={handleExpand}
                      title={field.title}
                      value={field.value}
                      key={field.title}
                      id={field?.id}
                      inputBgClass={field.inputBgClass}
                      downloadUrl={field?.downloadUrl}
                      expandArrowTooltip={field?.expandArrowTooltip}
                    />
                  ))}
                </Box>

                <Box className="fileAttachment">
                  <Typography fontWeight={500} variant="body2">
                    {'Attachments'}
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Box className="browseFile">
                      <Upload
                        files={files}
                        isMultipleUpload={true}
                        taskDetails={taskDetail}
                        handleDeleteFiles={handleDeleteFiles}
                        getNewFilesData={getNewFilesData}
                        uploadeFiles={getOldFilesData}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ pb: 7 }} item xs={12} sm={12} md={12} lg={5}>
              <Box sx={{ px: 8, py: 10 }}>
                {fieldsRightSide?.map((field, index) => (
                  <Box
                    key={`${index}-${field?.name}`}
                    sx={{ pb: 7 }}
                    className="w-100"
                  >
                    <FormField fieldProps={field} />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          <GapRevisedModal
            handleClose={handleCloseModal}
            handleSave={handleSaveModal}
            id={isExpanded.id}
            openModal={!!isExpanded.id}
            textConfig={{
              save: t('saveBtnText'),
              cancel: t('cancelBtnText'),
              title: isExpanded.title,
              terms: 'Upload this version of your updated policy in your MyDocs'
            }}
            value={isExpanded.value}
          />
        </>
      )}
    </>
  );
};

export default TaskForm;
