import { Container, Grid } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import { CustomForm } from '../../shared/components/index';
import { FormFieldType } from '../../shared/components/form-field/service/formFieldInterface';
import {
  PageTitleWrapper,
  Card,
  PageHeader
} from 'src/shared/components/index';

const CustomFormWrapper = () => {
  //Constants
  const USER_TYPE_OPTIONS = [
    {
      id: 'USER',
      label: 'User'
    },
    {
      id: 'ADMIN',
      label: 'Admin'
    }
  ];

  const GENDER_OPTIONS = [
    {
      id: 'FEMALE',
      label: 'Female'
    },
    {
      id: 'MALE',
      label: 'Male'
    }
  ];

  const CHECKBOX_GROUP_OPTIONS = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ];

  const initialValues = {
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
    user_type: '',
    gender: '',
    remember_me: false,
    dummy_checkbox_group: []
  };

  //Redux
  const { userData } = useSelector((state: any) => state.userData);

  //Methods
  const onCancel = () => {
    //handle cancel
    console.log('cancel');
  };

  const onSubmit = (values: any) => {
    //handle submit
    alert(JSON.stringify(values, null, 4));
  };

  const handleInputChange = (event, field) => {
    console.log(field?.name, event?.target?.value);
  };

  const handleChackboxChange = (event, field) => {
    console.log(field?.name, event?.target?.checked);
  };

  const handleAutoCompleteChange = (event, field, value) => {
    console.log(field?.name, value);
  };

  //Form fields
  const fields: FormFieldType[] = [
    {
      name: 'first_name',
      type: 'text',
      label: 'First Name',

      handleFieldChange: handleInputChange
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'Last Name',

      handleFieldChange: handleInputChange
    },
    {
      name: 'age',
      type: 'integer_only',
      label: 'Age',

      handleFieldChange: handleInputChange
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',

      handleFieldChange: handleInputChange
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',

      handleFieldChange: handleInputChange
    },
    {
      name: 'user_type',
      type: 'select',
      label: 'User Type',

      options: USER_TYPE_OPTIONS,
      itemValueKey: 'id',
      itemLabelKey: 'label',
      handleFieldChange: handleAutoCompleteChange
    },
    {
      name: 'gender',
      type: 'radio',
      label: 'Gender',

      options: GENDER_OPTIONS,
      itemValueKey: 'id',
      itemLabelKey: 'label',
      isDirectionRow: true,
      handleFieldChange: handleInputChange
    },
    {
      name: 'remember_me',
      type: 'checkbox',
      label: 'Remember Me',
      handleFieldChange: handleChackboxChange
    },
    {
      name: 'dummy_checkbox_group',
      type: 'checkbox_group',
      label: 'Demo checkbox group',
      options: CHECKBOX_GROUP_OPTIONS,
      itemValueKey: 'id',
      itemLabelKey: 'label',
      isDirectionRow: true,

      handleFieldChange: handleChackboxChange
    }
  ];

  return (
    <>
      <Helmet>
        <title>Indexnine Custom Form - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          heading="Custom Form"
          subHeading={`${userData?.name} this is your custom form`}
          buttonText="Create Form"
          btnVariant={'contained'}
          icon={<AddTwoToneIcon fontSize="small" />}
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card sx={{ p: 5 }}>
              <CustomForm
                formFields={fields}
                initialValues={initialValues}
                submitBtnHandler={onSubmit}
                cancelBtnHandler={onCancel}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CustomFormWrapper;
