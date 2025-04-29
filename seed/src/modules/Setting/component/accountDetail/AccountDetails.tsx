import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Typography
} from '@mui/material';
import {
  Button,
  FormField,
  Select,
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/index';
import ChangePasswordView from './ChangePasswordView';
import { getLoggedInUserDetail, getUpdateUserName } from '../../api/settingAPI';
import {
  setLoggedInUserData,
  selectCommon
} from 'src/modules/common/services/common.service';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';
import {
  getCalendarSyncStatus,
  getCalendarTimezoneList,
  saveSelectedTimeZoneOption
} from 'src/modules/Tasks/api/tasksApi';

let initialValues: any = {
  fullName: ''
};
const AccountDetails = () => {
  //const
  const { t } = useTranslation('setting');
  const dispatch = useDispatch<any>();

  //redux
  const { userData } = useSelector(selectCommon);

  //state variables
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [inputOldValue, setInputOldValue] = useState<string>('');
  const [inputEmailValue, setInputEmailValue] = useState<string>('');
  const [isDisbaled, setIsDisbaled] = useState<boolean>(true);
  const [formikInitialValue, setFormikInitialValue] = useState({
    fullName: ''
  });
  const [selectedTimezone, setSelectedTimezone] = useState<string>(null);
  const [timeZoneOptions, setTimeZoneOptions] = useState<any[]>();
  const [isSaveButtonDisable, setIsSaveButtonDisable] = useState<boolean>(true);

  const [syncStatus, setSyncStatus] = useState<{
    lastSyncAt: any;
    syncAvailable: boolean;
    isSync: boolean;
    timezonePreference: string;
  }>();

  //useEffect
  useEffect(() => {
    fetchUserData();
    fetchCalendarSyncStatus();
  }, []);

  const formik = useFormik({
    initialValues: formikInitialValue || initialValues,
    initialTouched: { fullName: true },
    validateOnChange: true,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .max(50, 'Name must not exceed 50 characters')
        .matches(
          /^[a-zA-Z0-9_ -]*$/,
          'Invalid input. Only letters, numbers, underscores, hyphens, and spaces are allowed.'
        )
        .test('min', 'Name must be at least 3 characters', (value) => {
          if (
            typeof value === 'string' &&
            value.replace(/\s/g, '').length >= 3
          ) {
            return true; //
          }
          return false;
        })
        .test(
          'not-white-spaces',
          'Input cannot be only white spaces',
          (value) => !/^\s+$/.test(value)
        )
        .test(
          'not-only-numbers',
          'Input cannot be only numbers',
          (value) => !/^\d+$/.test(value.trim())
        )
    }),
    onSubmit: (values: any) => {
      if (inputOldValue !== values?.fullName.trim()) {
        updateUserName(values);
      }
      if (
        selectedTimezone &&
        syncStatus?.timezonePreference !== selectedTimezone
      ) {
        updateTimeZone();
      }
    }
  });

  const { handleSubmit } = formik;

  const handleInputChange = (event, field) => {
    const value = event?.target?.value;
    let trimmedValue = value?.trim();
    let updatedValue = '';
    if (trimmedValue !== '') {
      updatedValue = event?.target?.value?.replace(/\s+/g, ' ');
      formik.setFieldValue(field?.name, updatedValue);
    } else {
      formik.setFieldValue(field?.name, '');
    }

    if (
      inputOldValue === event?.target?.value?.trim() ||
      event?.target?.value?.length === 0
    ) {
      setIsDisbaled(true);
    } else {
      setIsDisbaled(false);
    }
    checkIfToEnableSaveButton(
      selectedTimezone || syncStatus?.timezonePreference,
      updatedValue
    );
  };

  const fields: FormFieldType[] = [
    {
      name: 'fullName',
      id: 'fullName',
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
    }
  ];
  //methods

  const fetchUserData = async () => {
    const respData = await getLoggedInUserDetail(userData?.userUid);
    setInputOldValue(respData?.name);
    setFormikInitialValue({ fullName: respData?.name });
    setInputEmailValue(respData?.email);
    dispatch(setLoggedInUserData(respData));
  };

  const updateUserName = async (value) => {
    try {
      const parmas = { fullName: value?.fullName.trim() };
      const respData = await getUpdateUserName(inputEmailValue, parmas);
      showSuccessMessage(respData?.message, '', {
        position: 'top-right'
      });
      fetchUserData();
      setIsDisbaled(true);
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    } finally {
      setIsSaveButtonDisable(true);
    }
  };

  if (isChangePassword) {
    return <ChangePasswordView getBackToAccountDetail={setIsChangePassword} />;
  }

  const updateTimeZone = async () => {
    try {
      const res = await saveSelectedTimeZoneOption(selectedTimezone);
      showSuccessMessage(res?.message, '', {});
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause, {});
    } finally {
      setIsSaveButtonDisable(true);
      setSelectedTimezone(null);
      fetchCalendarSyncStatus();
    }
  };

  const handleTimeZoneSelected = async (event) => {
    setSelectedTimezone(event?.target?.value);
    checkIfToEnableSaveButton(event?.target?.value, formik?.values?.fullName);
  };
  const fetchCalendarSyncStatus = async () => {
    const res = await getCalendarSyncStatus();
    setSyncStatus(res);
    fetchTimeZoneOptions(res);
  };

  const fetchTimeZoneOptions = async (synsStatus) => {
    if (synsStatus.lastSyncAt) {
      const res = await getCalendarTimezoneList();
      setTimeZoneOptions(res);
    }
  };

  const checkIfToEnableSaveButton = (
    selectedTimezone = syncStatus?.timezonePreference,
    fullName = formik?.values?.fullName?.trim()
  ) => {
    if (
      selectedTimezone &&
      syncStatus?.timezonePreference !== selectedTimezone
    ) {
      setIsSaveButtonDisable(false);
      return;
    }
    if (inputOldValue !== fullName) {
      if (formik?.isValid || !isDisbaled) {
        setIsSaveButtonDisable(false);
      }
      return;
    }
    setIsSaveButtonDisable(true);
  };

  return (
    <Container maxWidth={'xl'}>
      <Box className="accountDetailsWrapper">
        <Card className="accountDetails">
          <CardHeader
            title={
              <Box>
                <Typography className="ad-title">
                  {t('accountDetails')}
                </Typography>
              </Box>
            }
          />
          <Divider className="divider" />
          <CardContent className="accountDetailContent">
            <Box>
              <Box className="lex-basic-space-start boxPadding">
                <Box className="w-55">
                  <FormikProvider value={formik}>
                    {fields?.map((field, index) => (
                      <FormField fieldProps={field} key={field?.id} />
                    ))}
                  </FormikProvider>
                </Box>
              </Box>
              <Divider className="divider" />

              <Box className="flex-basic-space-between boxPadding">
                <Box>
                  <Typography variant="subtitle1">
                    {t('emailAddress')}
                  </Typography>
                  <Typography className="description">
                    {t('emailDescription')}
                  </Typography>
                </Box>
                <Box className="d-flex align-items-center p-2">
                  <Typography
                    variant="subtitle1"
                    className="highlight-color mr-30"
                  >
                    {inputEmailValue}
                  </Typography>
                  <Button
                    btnText="Change"
                    variant="outlined"
                    className="p-10px"
                    disabled
                  />
                </Box>
              </Box>
              <Divider className="divider" />

              <Box className="flex-basic-space-between boxPadding">
                <Box>
                  <Typography variant="subtitle1">{t('password')}</Typography>
                  <Typography className="description">
                    {t('passwordDesc')}
                  </Typography>
                </Box>
                <Box className="d-flex  align-items-center">
                  <Button
                    btnText={t('changePassword')}
                    variant="outlined"
                    onClick={() => {
                      setIsChangePassword(true);
                    }}
                  />
                </Box>
              </Box>
              <Divider className="divider" />
              <Box className="flex-basic-space-between boxPadding">
                <Box>
                  <Typography variant="subtitle1">{t('timmezone')}</Typography>
                  <Typography className="description">
                    {t('timezoneDesc')}
                  </Typography>
                </Box>
                <Box className="d-flex  align-items-center p-2">
                  <Select
                    defaultValue={syncStatus?.timezonePreference}
                    label={''}
                    placeholder="Change your time zone"
                    value={
                      selectedTimezone ||
                      syncStatus?.timezonePreference ||
                      'none'
                    }
                    options={timeZoneOptions || []}
                    itemValue={'id'}
                    itemText={'displayName'}
                    onChange={(e) => handleTimeZoneSelected(e)}
                    disabled={!syncStatus?.lastSyncAt}
                  />
                </Box>
              </Box>
              <Divider className="divider" />
            </Box>
          </CardContent>
          <CardActions className="accountDetailFooter">
            <Box
              sx={{ py: 4, px: 4 }}
              className=" d-flex flex-basic-center w-100"
            >
              <Box className="flex-basic-center w-60">
                <Button
                  variant="contained"
                  type="submit"
                  btnText="SAVE"
                  disabled={isSaveButtonDisable}
                  onClick={() => {
                    handleSubmit();
                  }}
                  sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                />
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default AccountDetails;
