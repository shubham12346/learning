import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { FormField } from 'src/shared/components/index';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getUserList } from 'src/modules/Users/apis/UserApis';
import { OwnerListType } from 'src/modules/Regulations/model/RegulationsInterface';
import { DATE_FORMATS } from 'src/shared/constants/constants';
import Upload from 'src/modules/common/customUpload/Upload';
import { TagLists } from 'src/modules/ActionPlan/component/utils';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import useCadenceList from '../../hooks/useCadenceList';

interface TaskAddEditFormProps {
  regulationEnforcementDate?: string;
  formik?: any;
  taskDetails?: any;
  uploadeFiles?: any;
  attachedFiles?: (e) => void;
  handleDeleteAttachment?: (taskDetail, item, index) => void;
  files?: any[];
  handleOnChange?: any;
}

function TaskEditForm({
  regulationEnforcementDate,
  formik,
  attachedFiles,
  taskDetails,
  handleDeleteAttachment,
  files,
  handleOnChange
}: TaskAddEditFormProps) {
  //constant
  const { t } = useTranslation('regulations');

  //state variables
  const [ownerList, setOwnerList] = useState<OwnerListType[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const cadenceList = useSelector(
    (state: RootState) => state?.tasks?.cadenceDropDown
  );

  useCadenceList();

  //useEffect
  useEffect(() => {
    getOnwerListData();
  }, []);

  //methods

  const getOnwerListData = async () => {
    const respData = await getUserList({});
    setOwnerList(respData?.users);
  };
  const handleTaskName = (event: any, field: any) => {
    const value = event?.target?.value;
    let trimmedValue = value?.trim();
    if (trimmedValue !== '') {
      formik.setFieldValue(field?.name, value.replace(/\s+/g, ' '));
    } else {
      formik.setFieldValue(field?.name, '');
    }
  };

  const handleInputChange = (event,__field,fieldProps) => {
    if (event?.target?.name === 'cadence') {
      const value = fieldProps?.options?.find(item => item.id === event?.target?.value)?.name;
      handleOnChange(value);
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
      handleFieldChange: handleTaskName
    },
    {
      id: 'description',
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter Description',
      textareaRowsLine: 5
    }
  ];
  const fieldsRightSide: FormFieldType[] = [
    {
      name: 'targetdate',
      id: 'targetdate',
      type: 'date',
      label: 'Target Date',
      inputFormat: DATE_FORMATS.MONTH_DATE_YEAR,
      placeholder: 'Select Target Date',
      showRequired: true,
      maxDate: regulationEnforcementDate,
      minDate: new Date(),
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
      options: ownerList || [],
      itemValueKey: 'userUid',
      itemLabelKey: 'fullName',
      placeholder: 'Select Owner',
      validations: {
        required: true
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'tag',
      id: 'tag',
      type: 'multi-select',
      label: 'Tag(s)',
      placeholder: 'Select Tags ',
      showRequired: false,
      itemValueKey: 'name',
      itemLabelKey: 'name',
      options: TagLists || [],
      handleFieldChange: handleInputChange
    },
    {
      name: 'cadence',
      id: 'cadence',
      type: 'select',
      label: 'Cadence',
      showRequired: true,
      options: cadenceList || [],
      itemValueKey: 'id',
      itemLabelKey: 'displayName',
      placeholder: 'Select Cadence',
      validations: {
        required: true
      },
      handleFieldChange:handleInputChange
    }
  ];
  const plusLeftSideField: FormFieldType[] = [
    {
      name: 'controlTest',
      id: 'controlTest',
      type: 'text',
      showInfoIcon: false,
      label: 'Control Test',
      placeholder: 'Enter Control Test',
      handleFieldChange: () => {}
    },
    {
      name: 'testResult',
      id: 'testResult',
      type: 'text',
      showInfoIcon: false,
      label: 'Test Results',
      placeholder: 'Enter Test Results',
      handleFieldChange: () => {}
    },
    {
      name: 'recommendedChanges',
      id: 'recommendedChanges',
      type: 'text',
      showInfoIcon: false,
      label: 'Recommended Changes',
      placeholder: 'Enter Recommended Changes',
      handleFieldChange: () => {}
    }
  ];
  // Methods
  const getNewFilesData = (data: any) => {
    attachedFiles(data);
  };

  const handleDeleteFiles = (taskDetail, item, index) => {
    handleDeleteAttachment(taskDetail, item, index);
  };

  const handleIconClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box>
      <Grid container>
        <Grid
          sx={{ pb: 7 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={7}
          className="borderRight"
        >
          <Box className="contentScroll" sx={{ px: 8, py: 10 }}>
            {fields?.map((field, index) => (
              <Box key={index} sx={{ pb: 7 }} className="w-100">
                <FormField fieldProps={field} />
              </Box>
            ))}
            <Box className="fileAttachment">
              <Typography fontWeight={500} variant="body2">
                {'Attachments'}
              </Typography>
              <Box sx={{ my: 3 }}>
                <Box className="browseFile">
                  <Upload
                    files={files}
                    isMultipleUpload={true}
                    taskDetails={taskDetails}
                    handleDeleteFiles={handleDeleteFiles}
                    getNewFilesData={getNewFilesData}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ pb: 7 }} item xs={12} sm={6} md={6} lg={5}>
          <Box sx={{ px: 8, py: 10 }}>
            {fieldsRightSide?.map((field, index) => (
              <Box key={index} sx={{ pb: 7 }} className="w-100">
                <FormField fieldProps={field} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={`mt-5 ${isExpanded ? '' : 'mb-50'}`}
        >
          <Box className="d-flex align-items-center ">
            <Box className="w-96">
              <Divider className="divider" />
            </Box>
            <Box className="ml-15">
              <Tooltip
                title={
                  !isExpanded
                    ? t('expandScoreView', { ns: 'dashboard' })
                    : t('collapseScoreView', { ns: 'dashboard' })
                }
                arrow
              >
                <Box
                  onClick={() => handleIconClick()}
                  className="iconBg flex-basic-center cursorPointer"
                >
                  {isExpanded ? <RemoveIcon /> : <AddIcon />}
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        {isExpanded && (
          <Grid container>
            <Grid
              sx={{ pb: 7 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={7}
              className="borderRight"
            >
              <Box className="contentScroll" sx={{ px: 8, py: 10 }}>
                {plusLeftSideField?.map((field, index) => (
                  <Box key={index} sx={{ pb: 7 }} className="w-100">
                    <FormField fieldProps={field} />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default TaskEditForm;
