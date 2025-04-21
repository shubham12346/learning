import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { OnboardingStepper } from './components/OnboardingStepper';
import {
  acceptRegulation,
  fetchBusinessDetails,
  getBusinessType,
  getBusinessTypeDetail,
  getCountryList,
  getStateList,
  saveBusinessDetails,
  saveOrganizationDetails,
  verifyCrdNumber
} from './apis/OnBoardingApi';
import { useFormik } from 'formik';
import { OnboardingForm } from './components/OnboardingForm';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/system';
import * as Yup from 'yup';
import {
  generateDefaultQuestion,
  generateDynamicForm,
  generateInitialValueForFormik,
  generateSchemaValidation,
  getCountryKeys,
  updateComplianceDetails,
  updateStateInQuestion
} from './utils/utils';
import ConfirmationCustomModal from 'src/shared/components/modals/confirmationModal/ConfirmationCustomModal';
import RegVerseLogo from './../../assets/svg/avery_logo_new.svg';
import { selectCommon, setUserData } from '../common/services/common.service';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { goToRoute } from 'src/auth/login/Utils';
import HeaderUserbox from 'src/core/top-navbar/user-box/HeaderUserbox';
import { OnboardingHeader } from './components/OnboardingHeader';
import { Logo } from 'src/shared/components/logo-sign/Logo';

let globalBusinessDetailsQuestions = [];
let formikFormKeys: any = {
  organizationName: '',
  businessType: ''
};
let globalRequiredKeys = { bd: { ...formikFormKeys } };
let autoFillQuestionAnswerFromCrd = {
  organizationName: ''
};

const validationSchemaDefault = {
  businessType: Yup.string().required('Type of Business is required'),
  organizationName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .required('Name of Business is required')
};
let globalValidationSchema = validationSchemaDefault;

export const Onboarding = () => {
  const { userData } = useSelector(selectCommon);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { t } = useTranslation('english');
  // sept count
  const [step, setStep] = useState(1);
  // Country and state list
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState({});
  const [businessTypeList, setBusinessTypeList] = useState([]);
  // Business question initial values
  const [businessFormInitialValues] = useState<any>(formikFormKeys);

  const [businessFormRequiredValues, setBusinessFormRequiredValues] =
    useState<any>({ bd: { ...formikFormKeys } });

  // Create Form based on Screens
  const [businessDetailsDefaultQuestion, setBusinessDetailsDefaultQuestion] =
    useState([]);
  // Business Details Question
  const [businessDetailsQuestions, setBusinessDetailsQuestions] = useState<any>(
    []
  );
  // Compliance Details Question
  const [complianceDetailsQuestions, setComplianceDetailsQuestions] = useState(
    []
  );
  // Profile confirmation Modal
  const [profileConfirmationModal, setProfileConfirmationModalFlag] =
    useState(false);
  const [businessDetails, setBusinessDetails] = useState<any>(formikFormKeys);
  const [yearEndOther, setYearEndOther] = useState(false);
  const [validationSchema, setValidationSchema] = useState<any>(
    Yup.object().shape(validationSchemaDefault)
  );

  //Methods
  const handleInputChange = (event, field) => {
    if (field?.name == 'organizationName') {
      if (
        !formik.touched['organizationName'] ||
        formik.touched['organizationName'] === undefined
      ) {
        formik.setTouched({ organizationName: true });
      }

      const value = event?.target?.value;
      let trimmedValue = value?.trim();
      if (trimmedValue !== '') {
        formik.setFieldValue(field?.name, value.replace(/\s+/g, ' '));
      } else {
        formik.setFieldValue(field?.name, '');
      }
    }

    if (field?.name == 'yearEndOther') {
      const inputValue = event.target.value;
      const lastChar = inputValue[inputValue.length - 1];

      if (
        !/^\d$|^\d\/\d$|^(0[1-9]|1[0-2])\/$/.test(inputValue) &&
        lastChar !== '/'
      ) {
        event.target.value = inputValue.slice(0, -1);
      }
      formikFormKeys[field?.name] = event?.target?.value;
    } else {
      formikFormKeys[field?.name] = event?.target?.value;
    }
  };

  const handleRadioChange = async (event, field) => {
    if (field?.name == 'yearEnd') {
      // TOOD Function Call
      setYearEndOther(event?.target?.value == 'other');
      if (event?.target?.value == 'other') {
        formik.setFieldValue('yearEndOther', new Date());
      } else {
        formik?.setFieldValue('yearEndOther', undefined);

        if (globalRequiredKeys.bd.hasOwnProperty('yearEndOther')) {
          delete globalRequiredKeys.bd['yearEndOther'];
          setBusinessFormRequiredValues(globalRequiredKeys);
        }
      }
    }
  };

  // Handle Business Type changes
  const handleBusinessTypeChange = (event, field) => {
    let businessQuestionType = event?.target?.value;
    const onboardingState = {
      ...formikFormKeys,
      [field?.name]: businessQuestionType
    };
    if (autoFillQuestionAnswerFromCrd?.organizationName) {
      prefillData(businessQuestionType);
    } else {
      fetchDetailBaseONBusType(onboardingState, true);
      setYearEndOther(false);
    }
    // to be test on dev and then delete
    setComplianceDetailsQuestions([]);
  };

  const handleLocationChange = (event, field) => {
    let countryKey = field?.name.split('Country');
    const countryObject = {
      selectedCoutry: event?.target?.value,
      keyName: countryKey[0]
    };
    fetchStateList(countryObject, false, businessDetailsQuestions);
  };

  // Fetch StateList
  const fetchStateList = async (
    countryDetails,
    getOnboardingDetailsFlag,
    questions
  ) => {
    // check key pre
    let statelist = [];
    if (stateList[countryDetails.selectedCoutry]) {
      statelist = stateList[countryDetails.selectedCoutry];
    } else {
      statelist = await getStateList(countryDetails.selectedCoutry);
      setStateList({ [countryDetails.selectedCoutry]: statelist });
    }

    if (getOnboardingDetailsFlag) {
      const questionObject = {
        questions: questions,
        statelist: statelist,
        key: countryDetails.keyName
      };
      let updatedQuestions = await updateStateInQuestion(questionObject);
      return updatedQuestions;
    } else {
      const questionObject = {
        questions: globalBusinessDetailsQuestions,
        statelist: statelist,
        key: countryDetails.keyName
      };
      let updatedQuestions = await updateStateInQuestion(questionObject);
      setBusinessDetailsQuestions(updatedQuestions);
      globalBusinessDetailsQuestions = updatedQuestions;
    }
    // pass key , question , stateList
  };

  //methods GET Saved Onboarding Details
  const getSavedOnBoardingDetails = async () => {
    const data = await fetchBusinessDetails(userData?.organizationUid[0]);
    if (data?.onboardingState?.crdNumber) {
      autoFillQuestionAnswerFromCrd.organizationName =
        data?.onboardingState?.organizationName;
    }

    if (data?.onboardingState?.businessType) {
      localStorage?.setItem(
        'crdNumber',
        data?.onboardingState?.crdNumber || ''
      );

      const onboardingState = removeCrdNumber(data.onboardingState);
      await fetchDetailBaseONBusType(onboardingState, false);
      updateCalendarStateInPrefillData(data.onboardingState);
      setStep(2);
    }
  };

  // Fetch Business Type List (example : RIA STATE | RIA SEC)
  const getBasicDetails = async () => {
    setBusinessTypeList(await getBusinessType());
  };

  //useEffect 1st api call is here
  useEffect(() => {
    if (businessTypeList.length) {
      afterGettingBusinessList();
    } else {
      getBasicDetails();
    }
  }, [businessTypeList]);

  // on save crd details or cancel crd
  let timeOutId;
  const saveOnboardingCrdEntry = (flag) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      if (flag !== 'cancel') {
        clearOnboardingBusinessDetailForm();
        setCompanyNameFromCrd();
      } else {
        clearOnboardingBusinessDetailForm();
      }
    }, 3000);
  };
  // clear the onboarding business detail form
  const clearOnboardingBusinessDetailForm = () => {
    formik.resetForm({
      values: {},
      errors: {},
      touched: {}
    });
    setBusinessDetailsQuestions([]);
    autoFillQuestionAnswerFromCrd.organizationName = '';
  };

  // set company name from onboarding state
  const setCompanyNameFromCrd = async () => {
    const data = await fetchBusinessDetails(userData?.organizationUid[0]);
    if (data?.onboardingState?.organizationName) {
      autoFillQuestionAnswerFromCrd.organizationName =
        data?.onboardingState?.organizationName;
    }
    formik.setFieldValue(
      'organizationName',
      data.onboardingState?.organizationName
    );
    formik.setFieldValue('businessType', '');
    formikFormKeys['organizationName'] = data.onboardingState?.organizationName;
  };

  //   business type to get prefill data
  const prefillDataAfterBusinessTypeChange = async (businessType) => {
    const crdNumber = localStorage.getItem('crdNumber');
    const res = await verifyCrdNumber(crdNumber, businessType);
    if (res?.data?.crdVerified) {
      const data = await fetchBusinessDetails(userData?.organizationUid[0]);
      await fetchDetailBaseONBusType(data.onboardingState, false);
      updateCalendarStateInPrefillData(data.onboardingState);
    }
  };

  // async function to await
  const prefillData = async (businessType) => {
    await prefillDataAfterBusinessTypeChange(businessType);
  };

  //
  // To get default questions and state retentions API Call
  const afterGettingBusinessList = async () => {
    await generateDefaultQuestionFunction();
    await getSavedOnBoardingDetails();
  };

  // Generate Default Questions
  const generateDefaultQuestionFunction = async () => {
    const resp = generateDefaultQuestion({
      t,
      businessTypeList,
      handleInputChange,
      handleBusinessTypeChange
    });
    setBusinessDetailsDefaultQuestion(resp);
  };

  const formik = useFormik({
    initialValues: formikFormKeys,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: validationSchema,
    validateOnBlur: true,

    onSubmit: (values: any) => {
      onSubmit(values);
    }
  });

  const { handleSubmit } = formik;

  const onSubmit = async (values: any) => {
    await saveOrganizationDetails(
      updateComplianceDetails(values),
      userData?.organizationUid[0]
    );
    setStep(step + 1);
  };

  const handleAcceptRegulation = async () => {
    const resp = await acceptRegulation(userData?.organizationUid[0]);
    if (resp) {
      await dispatch(
        setUserData({ ...userData, onboardingStatus: 'completed' })
      );
    }
    setProfileConfirmationModalFlag(true);
  };

  // Handle Steps
  const handleStepCount = async (nextStep) => {
    if ((step == 2 || step == 3) && nextStep) {
      formikFormKeys = formik.values;
      saveBusinessDetails(formik.values, userData?.organizationUid[0]);
      if (step == 3) {
        handleSubmit();
        return;
      }
    }
    if (step === 4 && nextStep) {
      handleAcceptRegulation();
      return;
    }

    let tempStep = nextStep ? step + 1 : step - 1;
    if (tempStep == 3 && complianceDetailsQuestions.length == 0) {
      fetchComplianceDatailsQuestions(formikFormKeys);
    }
    if (tempStep === 2 && !nextStep) {
      updateCalenderYearWhenUserClickPrevious();
    }
    setStep(tempStep);
  };

  // update calender year field when user clicks previous button and step is zero
  const updateCalenderYearWhenUserClickPrevious = () => {
    if (formik?.values['yearEnd'] && !formik?.values['yearEndOther']) {
      formik?.setFieldValue('yearEnd', 'calenderYear');
      setYearEndOther(false);
    } else if (formik?.values['yearEnd'] && formik?.values['yearEndOther']) {
      formik?.setFieldValue('yearEnd', 'other');
      formik?.setFieldValue(
        'yearEndOther',
        new Date(formik?.values['yearEndOther'])
      );
    }
  };

  // update calendar year when prefill data
  const updateCalendarStateInPrefillData = (onboardingState) => {
    if (onboardingState['yearEnd'] && !onboardingState['yearEndOther']) {
      formik?.setFieldValue('yearEnd', 'calenderYear');
      setYearEndOther(false);
    } else if (onboardingState['yearEnd'] && onboardingState['yearEndOther']) {
      formik?.setFieldValue('yearEnd', 'other');
      formik?.setFieldValue(
        'yearEndOther',
        new Date(formik?.values['yearEndOther'])
      );
    }
  };

  // Fetch Business questions based on business type
  const fetchDetailBaseONBusType = async (businessDetails, flag) => {
    const countryList = await getCountryList();
    setCountryList(countryList);
    const resStateList = await getStateList(countryList[0]?.id);
    setStateList(resStateList);
    let newObject = {};
    if (flag) {
      newObject['organizationName'] = businessDetails.organizationName;
      newObject['businessType'] = businessDetails.businessType;
    } else {
      newObject = businessDetails;
    }
    const businessDetailsResp: any = await getBusinessTypeDetail(
      businessDetails.businessType,
      'bd'
    );
    const initialKeys = generateInitialValueForFormik(
      businessDetailsResp,
      countryList
    );
    const mergedInitialKeys = {
      ...initialKeys.initialNameObject,
      ...newObject
    };
    const mergedInitialRequiredKeys = {
      bd: {
        ...initialKeys.initialRequiredObject,
        ...businessFormRequiredValues.bd
      }
    };
    globalRequiredKeys = mergedInitialRequiredKeys;
    formikFormKeys = mergedInitialKeys;
    setBusinessDetails(mergedInitialKeys);
    setBusinessFormRequiredValues(mergedInitialRequiredKeys);
    let businessForm = await generateDynamicForm({
      handleInputChange,
      handleLocationChange,
      handleRadioChange,
      countryList,
      stateList: resStateList,
      businessDetailsResp
    });

    const schema = generateSchemaValidation(businessForm);
    globalValidationSchema = { ...schema, ...validationSchemaDefault };
    setValidationSchema(Yup.object().shape(schema));
    let countryKey = getCountryKeys(businessDetails);
    for (const key in countryKey) {
      // split key  text.split("Country");
      if (countryKey[key].length) {
        let countryKeyName = key.split('Country');
        const countryObject = {
          selectedCoutry: countryKey[key],
          keyName: countryKeyName[0]
        };
        businessForm = await fetchStateList(countryObject, true, businessForm);
      }
    }
    setBusinessDetailsQuestions([...businessForm]);
    globalBusinessDetailsQuestions = businessForm;
  };

  // Fetch Business questions based on business type
  const fetchComplianceDatailsQuestions = async (businessDetails) => {
    const businessDetailsResp: any = await getBusinessTypeDetail(
      formikFormKeys.businessType,
      'cd'
    );
    const initialKeys = generateInitialValueForFormik(businessDetailsResp);
    const mergedInitialKeys = {
      complianceDetails: initialKeys.initialNameObject,
      ...businessDetails
    };
    const mergedInitialRequiredKeys = {
      ...businessFormRequiredValues,
      cd: {
        ...initialKeys.initialRequiredObject
      }
    };
    globalRequiredKeys = mergedInitialRequiredKeys;
    formikFormKeys = mergedInitialKeys;
    setBusinessDetails(mergedInitialKeys);
    setBusinessFormRequiredValues(mergedInitialRequiredKeys);
    let businessForm = await generateDynamicForm({
      handleInputChange,
      handleLocationChange,
      handleRadioChange,
      countryList,
      stateList,
      businessDetailsResp
    });
    const complianceQuestionsSchema = generateSchemaValidation(businessForm);
    globalValidationSchema = {
      ...complianceQuestionsSchema,
      ...globalValidationSchema
    };

    setValidationSchema(Yup.object().shape(globalValidationSchema));
    setComplianceDetailsQuestions([...businessForm]);
    globalBusinessDetailsQuestions = businessForm;
  };

  function removeCrdNumber(onboardingState: any) {
    // Create a deep copy of the object to avoid mutating the original object
    let newObj = { ...onboardingState };
    // Delete the crdNumber key from the copied object
    delete newObj?.crdNumber;
    // Return the new object
    return newObj;
  }
  // all flat objects for formik
  //  bd,cd keys in separated keys for required keys
  // { ...bd ,cd {}} keys for backend
  // remove   crd number

  return (
    <Container className="onboarding-section" sx={{ px: 0 }} maxWidth={false}>
      <Grid container>
        <Grid
          className="onboarding-side-bar h-100-vh"
          sx={{ p: 10 }}
          item
          xs={12}
          sm={3}
          md={2.46}
          lg={2.46}
        >
          <Box className="d-flex flex-direction-column" sx={{ gap: 30 }}>
            <Logo />
            <Box>
              <OnboardingStepper step={step} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9} md={9.54} lg={9.54}>
          <Container>
            <Box className="h-100" sx={{ px: 12, pb: 10, pt: 16 }}>
              <Box className="d-flex flex-direction-column" sx={{ gap: 4 }}>
                <OnboardingHeader step={step} />
                <OnboardingForm
                  formik={formik}
                  yearEndOther={yearEndOther}
                  businessTypeList={businessTypeList}
                  businessFormInitialValues={businessFormInitialValues}
                  businessFormRequiredValues={businessFormRequiredValues}
                  step={step}
                  countryList={countryList}
                  stateList={stateList}
                  businessDetailsDefaultQuestion={
                    businessDetailsDefaultQuestion
                  }
                  businessDetailsQuestions={businessDetailsQuestions}
                  complinaceDetailsQuestions={complianceDetailsQuestions}
                  handleStepCount={handleStepCount}
                  setStep={setStep}
                  saveOnboardingCrdEntry={saveOnboardingCrdEntry}
                />
              </Box>
            </Box>
            <Box className="flex-basic-space-between p-fixed logoutBoxOnboarding">
              <HeaderUserbox userData={userData} />
            </Box>
          </Container>
        </Grid>
      </Grid>

      <ConfirmationCustomModal
        imageURL={RegVerseLogo}
        mainTitle={t('welcomeTitle', { ns: 'onboarding' })}
        subTitle1={t('welcomeNote', { ns: 'onboarding' })}
        open={profileConfirmationModal}
        handleClose={() => setProfileConfirmationModalFlag(false)}
        handleClick={() =>
          navigate('../' + goToRoute(userData), { replace: true })
        }
        btnTitle={t('continue', { ns: 'onboarding' })}
      />
    </Container>
  );
};

export default Onboarding;
