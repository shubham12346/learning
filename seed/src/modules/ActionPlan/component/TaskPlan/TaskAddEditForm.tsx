import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { FormField } from 'src/shared/components/index';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getUserList } from 'src/modules/Users/apis/UserApis';
import { OwnerListType } from 'src/modules/Regulations/model/RegulationsInterface';
import {
  ACCEPTED,
  AGENCY,
  DATE_FORMATS,
  NONE,
  TASK_NAME
} from 'src/shared/constants/constants';
import Upload from 'src/modules/common/customUpload/Upload';
import { TagLists } from '../utils';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { getListOfEachRegulatoryAct } from 'src/modules/Regulations/apis/RegulationsApi';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import useCadenceList from 'src/modules/Tasks/hooks/useCadenceList';
import { DEFAULT_MAX_DATE } from 'src/modules/Fines/component/contants';

interface TaskAddEditFormProps {
  files?: any[];
  formikValue?: any;
  taskDetails?: any;
  uploadeFiles?: any;
  regulationEnforcementDate?: string;
  attachedFiles?: (file) => void;
  handleDeleteAttachment?: (taskDetails, item, index) => void;
  isAddRegulation?: boolean;
  agencyList?: { id: string; value: string }[];
}

function TaskAddEditForm({
  regulationEnforcementDate,
  formikValue,
  taskDetails,
  attachedFiles,
  uploadeFiles,
  handleDeleteAttachment,
  files,
  isAddRegulation,
  agencyList
}: Readonly<TaskAddEditFormProps>) {
  //constant
  const { t } = useTranslation('regulations');

  //state variables
  const [ownerList, setOwnerList] = useState<OwnerListType[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [regulationList, setRegulationList] = useState<any[]>([]);
  const [isAgencyRequired, setIsAgencyRequired] = useState<boolean>(false);

  const cadenceList = useSelector(
    (state: RootState) => state?.tasks?.cadenceDropDown
  );

  useCadenceList();

  //useEffect
  useEffect(() => {
    getOnwerListData();
  }, []);

  //methods
  const noneOption = agencyList?.filter((item: any) => item?.value === NONE);

  const getOnwerListData = async () => {
    const respData = await getUserList({});
    setOwnerList(respData?.users);
  };

  const handleInputChange = (event, field) => {
    if (field?.name == TASK_NAME) {
      const value = event?.target?.value;
      let trimmedValue = value?.trim();
      if (trimmedValue !== '') {
        formikValue.setFieldValue(field?.name, value.replace(/\s+/g, ' '));
      } else {
        formikValue.setFieldValue(field?.name, '');
      }
    }
    if (field?.name == AGENCY) {
      fetchRegulationList(event?.target?.value);
    }
  };

  const fetchRegulationList = async (agencyId) => {
    const params = {
      regulationAcceptanceStatus: ACCEPTED,
      regulatoryOrganizationId: agencyId
    };
    let respData;
    if (noneOption[0]?.id === agencyId) {
      respData = {
        data: []
      };
      setIsAgencyRequired(false);
    } else {
      respData = await getListOfEachRegulatoryAct(params);
      setIsAgencyRequired(true);
    }
    setRegulationList(respData?.data);
  };

  const getNewFilesData = (data: any) => {
    attachedFiles(data);
  };

  const getOldFilesData = (data: any) => {
    uploadeFiles(data);
  };

  const handleDeleteFiles = (taskDetail, item, index) => {
    handleDeleteAttachment(taskDetail, item, index);
  };

  const handleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const regulationFields: FormFieldType[] = [
    {
      name: 'agency',
      id: 'agency',
      type: 'select',
      label: 'Agency',
      options: agencyList || [],
      itemValueKey: 'id',
      itemLabelKey: 'value',
      placeholder: 'Select Agency',
      handleFieldChange: handleInputChange
    },
    {
      name: 'regulation',
      id: 'regulation',
      type: 'select',
      label: 'Regulation',
      placeholder: 'Select Regulation',
      itemValueKey: 'id',
      itemLabelKey: 'name',
      options: regulationList || [],
      showRequired: isAgencyRequired,
      validations: {
        required: isAgencyRequired
      },
      handleFieldChange: handleInputChange
    }
  ];

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
      maxDate: DEFAULT_MAX_DATE,
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
      handleFieldChange: handleInputChange
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
      handleFieldChange: handleInputChange
    },
    {
      name: 'testResult',
      id: 'testResult',
      type: 'text',
      showInfoIcon: false,
      label: 'Test Results',
      placeholder: 'Enter Test Result ',
      handleFieldChange: handleInputChange
    },
    {
      name: 'recommendedChanges',
      id: 'recommendedChanges',
      type: 'text',
      showInfoIcon: false,
      label: 'Recommended Changes',
      placeholder: 'Enter Recommended Changes',
      handleFieldChange: handleInputChange
    }
  ];
  return (
    <Box>
      <Grid container sx={{ p: 0 }}>
        <Grid sx={{ p: 0 }} item xs={12} sm={6} md={6} lg={7}>
          {isAddRegulation && (
            <Box className="borderRight" sx={{ px: 8, pt: 10, pb: 4 }}>
              {regulationFields?.map((field, index) => (
                <Box
                  key={`${index}-${field?.name}`}
                  sx={{ pb: 7 }}
                  className="w-100"
                >
                  <FormField fieldProps={field} />
                </Box>
              ))}
            </Box>
          )}
          <Box className="borderRight" sx={{ px: 8, pb: 10 }}>
            {fields?.map((field, index) => (
              <Box
                key={`${index}-${field?.name}`}
                sx={{ pb: 7 }}
                className="w-100"
              >
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
                    uploadeFiles={getOldFilesData}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ pb: 7 }} item xs={12} sm={6} md={6} lg={5}>
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
                  onClick={() => handleExpanded()}
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
        )}
      </Grid>
    </Box>
  );
}

export default TaskAddEditForm;
