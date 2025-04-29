import React, { useEffect, useState } from 'react';
import Typography from 'src/shared/components/typography/Typography';
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormField, SimpleDialog } from 'src/shared/components/index';
import { FormikProvider, useFormik } from 'formik';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';
import RoleInfoDetails from './RoleInfoDetails';
import * as Yup from 'yup';
import { groupData } from '../model/userInterface';
import { getUserRolesExclidingPrimaryAdminRole } from '../apis/UserApis';

const initialValues: any = {
  fullname: '',
  email: '',
  groupName: '',
  roleType: ''
};

export const AddUser = ({ open, handleClose, addCompanyEvent }) => {
  //constants
  const theme = useTheme();
  const { t } = useTranslation('users');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const mediumDevice = useMediaQuery(theme.breakpoints.up('md'));
  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must not exceed 50 characters')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Input cannot contain special characters')
        .test(
          'not-white-spaces',
          'Input cannot be only white spaces',
          (value) => !/^\s+$/.test(value)
        )
        .test(
          'not-only-numbers',
          'Input cannot be only numbers',
          (value) => !/^\d+$/.test(value?.trim())
        )
    }),
    onSubmit: (values: any) => {
      addCompanyEvent(values, setFieldError);
      setBtnDisabled(true);
    }
  });

  const getAllGroupData = async () => {
    const groupData = await getUserRolesExclidingPrimaryAdminRole();
    setGroupList(groupData);
  };

  //state Variables
  const [groupList, setGroupList] = useState({} as groupData);
  const { isValid, handleSubmit, setFieldError } = formik;
  const [userDetails, setUserDetails] = useState(initialValues);
  const [groupNameList, setGroupNameList] = useState(groupList.groups);
  const [groupRoleList, setGroupRoleList] = useState(groupList.roles);
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(true);

  //useEffect
  useEffect(() => {
    formik.resetForm(initialValues);
    getAllGroupData();
  }, [open]);

  useEffect(() => {
    setGroupNameList(groupList.groups);
    setGroupRoleList(groupList.roles);
  }, [groupList]);

  //methods
  const handleInputChange = (event, field) => {
    const value = event?.target?.value;
    let trimmedValue = value?.trim();
    if (trimmedValue !== '') {
      formik.setFieldValue(field?.name, value.replace(/\s+/g, ' '));
      let updatedValue = value.replace(/\s+/g, ' ');
      setBtnDisabled(false);
      setUserDetails({
        ...userDetails,
        [field?.name]: updatedValue
      });
    } else {
      setBtnDisabled(true);
      formik.setFieldValue(field?.name, '');
    }
  };

  const handleCloseModal = () => {
    formik.resetForm(initialValues);
    setBtnDisabled(true);
    handleClose();
  };

  const fields: FormFieldType[] = [
    {
      name: 'fullname',
      id: 'fullname',
      type: 'text',
      showInfoIcon: false,
      label: 'Full Name',
      placeholder: 'Enter Full Name',
      showRequired: true,
      validations: {
        required: true,
        maxLength: 51,
        minLength: 3
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'email',
      id: 'email',
      type: 'text',
      label: 'Email ID',
      placeholder: 'Enter Email ID',
      showRequired: true,
      validations: {
        required: true,
        email: true
      },
      errorMessages: {
        emailErrMsg: 'Please enter valid email'
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'groupName',
      id: 'groupName',
      type: 'select',
      label: 'Group Name',
      showRequired: true,
      tooltipTitle: <RoleInfoDetails groupRoleList={groupNameList} />,
      showInfoIcon: true,
      options: groupNameList,
      itemValueKey: 'groupId',
      itemLabelKey: 'groupName',
      placeholder: 'Select Group Name',
      validations: {
        required: true
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'roleType',
      id: 'roleType',
      type: 'select',
      label: 'Role',
      showRequired: true,
      tooltipTitle: <RoleInfoDetails groupRoleList={groupRoleList} />,
      showInfoIcon: true,
      options: groupRoleList,
      itemValueKey: 'name',
      itemLabelKey: 'displayName',
      placeholder: 'Select Role',
      validations: {
        required: true
      },
      handleFieldChange: handleInputChange
    }
  ];

  return (
    <React.Fragment>
      <SimpleDialog
        model_title={
          <>
            <Box sx={{ pb: 12 }} className="textalign">
              <Typography variant="h5" className="textsemiWeight">
                {t('modalTitle')}
              </Typography>
            </Box>

            <Box
              className="d-flex flex-basic-center"
              sx={{ position: 'absolute', right: 28, top: 18 }}
            >
              {/* <Box sx={{ mr: 3, mt: 2 }}>
                <span className="icon-help helpModalIcon"></span>
              </Box> */}
              <Box>
                <Tooltip title={t('closeTitle')} arrow>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    className="close-icon-modal "
                    disableRipple={true}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </>
        }
        model_content={
          <Box sx={{ minWidth: mediumDevice ? '680px' : '' }}>
            <FormikProvider value={formik}>
              <form style={{ gap: 4 }}>
                <Grid
                  container
                  columns={12}
                  columnSpacing={{ xs: 1, sm: 2, md: 9 }}
                >
                  {fields?.map((field, index) => (
                    <Grid
                      key={index}
                      sx={{ pb: 7 }}
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                    >
                      <FormField fieldProps={field} />
                    </Grid>
                  ))}
                </Grid>
              </form>
            </FormikProvider>
          </Box>
        }
        model_actions={
          <Box
            sx={{ gap: '1.5rem', mt: 7 }}
            className="flex-basic-center w-100"
          >
            <Button
              variant="contained"
              type="submit"
              btnText={t('modalBtnText')}
              sx={{ py: '0.62rem', px: '2rem' }}
              onClick={() => handleSubmit()}
              disabled={!formik.isValid || isBtnDisabled}
            />
          </Box>
        }
        open={open}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
    </React.Fragment>
  );
};
