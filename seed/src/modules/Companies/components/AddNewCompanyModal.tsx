//Built-in Imports
import React, { useEffect, useState } from 'react';

//External Imports
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';

//Internal Imports
import Typography from 'src/shared/components/typography/Typography';
import { Button, FormField, SimpleDialog } from 'src/shared/components/index';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';

const initialValues: any = {
  organizationName: '',
  contactPersonFullName: '',
  contactPersonEmail: ''
};
interface AddNewCompanyModalProps {
  open: boolean;
  selectedValue: any;
  modalHeaderText: string;
  addCompanyEvent: any;
  isPartnerTabActive?: boolean;
  handleClose: () => void;
}
export const AddNewCompanyModal = ({
  selectedValue,
  open,
  handleClose,
  addCompanyEvent,
  modalHeaderText,
  isPartnerTabActive
}: AddNewCompanyModalProps) => {
  //constant
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const mediumDevice = useMediaQuery(theme.breakpoints.up('md'));

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      organizationName: Yup.string()
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
          (value) => !/^\d+$/.test(value)
        )
        .test('min', 'Name must be at least 3 characters', (value) => {
          if (
            typeof value === 'string' &&
            value.replace(/\s/g, '').length >= 3
          ) {
            return true; //
          }
          return false;
        }),
      contactPersonFullName: Yup.string()
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
          (value) => !/^\d+$/.test(value)
        )
        .test('min', 'Name must be at least 3 characters', (value) => {
          if (
            typeof value === 'string' &&
            value.replace(/\s/g, '').length >= 3
          ) {
            return true; //
          }
          return false;
        }),
      contactPersonEmail: Yup.string().matches(
        /^[^\s]+$/,
        'Input cannot contain white spaces'
      )
    }),
    onSubmit: (values: any) => {
      addCompanyEvent(values, setFieldError);
    }
  });

  //state variables
  const { handleSubmit, setFieldError } = formik;
  const [companyDetails, setCompanyDetails] = useState(initialValues);
  const [submitDisable, setSubmitDisable] = useState(true);

  //methods
  const onClose = () => {
    formik.resetForm(initialValues);
    handleClose();
  };
  const handleInputChange = (event: any, field: any) => {
    const value = event?.target?.value;
    let trimmedValue = value?.trim();
    if (trimmedValue !== '') {
      formik.setFieldValue(field?.name, value.replace(/\s+/g, ' '));
      let updatedValue = value.replace(/\s+/g, ' ');
      setSubmitDisable(false);
      setCompanyDetails({
        ...companyDetails,
        [field?.name]: updatedValue
      });
    } else {
      setSubmitDisable(true);
      formik.setFieldValue(field?.name, '');
    }
  };

  //useEffect
  useEffect(() => {
    setSubmitDisable(true);
    formik.resetForm(initialValues);
  }, [open]);

  const fields: FormFieldType[] = [
    {
      name: 'organizationName',
      id: 'organizationName',
      type: 'text',
      label: 'Company Name',
      placeholder: 'Enter Company Name',
      showRequired: true,
      validations: {
        required: true,
        maxLength: 51,
        minLength: 3
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'contactPersonFullName',
      id: 'contactPersonFullName',
      type: 'text',
      placeholder: !isPartnerTabActive
        ? 'Enter Primary Admin Full Name'
        : 'Enter Contact Person Full Name',
      label: !isPartnerTabActive
        ? 'Primary Admin Full Name'
        : 'Contact Person Full Name',
      showRequired: true,
      tooltipTitle: <Box>{t('showRoleText')}</Box>,
      showInfoIcon: true,
      validations: {
        required: true,
        maxLength: 51,
        minLength: 3
      },
      errorMessages: {
        requiredErrMsg: 'Please enter full name'
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'contactPersonEmail',
      id: 'contactPersonEmail',
      type: 'text',
      placeholder: !isPartnerTabActive
        ? 'Enter Primary Admin Email'
        : 'Enter Contact Person Email',
      label: !isPartnerTabActive
        ? 'Primary Admin Email'
        : 'Contact Person Email',
      showRequired: true,
      validations: {
        required: true,
        maxLength: 50,
        email: true
      },
      errorMessages: {
        emailErrMsg: 'Please enter valid email'
      },
      handleFieldChange: handleInputChange
    }
  ];

  //useEffect
  useEffect(() => {
    formik.resetForm(initialValues);
  }, [open]);

  return (
    <SimpleDialog
      model_title={
        <>
          <Box sx={{ pb: 12 }} className="textalign">
            <Typography variant="h5">{modalHeaderText}</Typography>
          </Box>
          <Box
            className="d-flex flex-basic-center"
            sx={{ position: 'absolute', right: 28, top: 18 }}
          >
            {/* <Box className="displayNone" sx={{ mr: 3, mt: 2 }}>
                <span className="icon-help helpModalIcon"></span>
              </Box> */}
            <Box>
              <Tooltip title={t('closeTitle')} arrow>
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  className="close-icon-modal"
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
            <form
              className="h-100 w-100 d-flex flex-direction-column "
              style={{ gap: 4 }}
            >
              <Box className="w-100">
                {fields?.map((field, index) => (
                  <Grid
                    key={`${index}-${field?.name}`}
                    sx={{ pb: 7 }}
                    item
                    xs={6}
                  >
                    <FormField fieldProps={field} />
                  </Grid>
                ))}
              </Box>
            </form>
          </FormikProvider>
        </Box>
      }
      model_actions={
        <Box sx={{ gap: '1.5rem', mt: 7 }} className="flex-basic-center w-100">
          <Button
            variant="contained"
            type="submit"
            btnText="Send Activation Link"
            disabled={!formik.isValid || submitDisable}
            sx={{ py: '0.62rem', px: '2rem' }}
            onClick={() => handleSubmit()}
          />
        </Box>
      }
      selectedValue={selectedValue}
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
