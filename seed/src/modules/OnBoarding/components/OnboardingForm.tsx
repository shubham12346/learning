import { FormikProvider } from 'formik';
import { Box } from '@mui/material';
import { BusinessDetails } from './BusinessDetails';
import { EmployeeDetails } from './EmployeeDetails';
import { Button, showErrorMessage } from 'src/shared/components/index';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { RegulationDetails } from './RegulationDetails';
import './onBoarding.scss';
import CrdEntry from './CrdEntry';
import { useState } from 'react';

export const OnboardingForm = (props) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const renderStep = () => {
    switch (props.step) {
      case 1:
        return (
          <CrdEntry
            setStep={props.setStep}
            saveOnboardingCrdEntry={props.saveOnboardingCrdEntry}
          />
        );
      case 2:
        return (
          <BusinessDetails
            yearEndOther={props.yearEndOther}
            businessDetailsDefaultQuestion={
              props.businessDetailsDefaultQuestion
            }
            businessDetailsQuestions={props.businessDetailsQuestions}
          />
        );
      case 3:
        return (
          <EmployeeDetails
            yearEndOther={props.yearEndOther}
            complinaceDetailsQuestions={props.complinaceDetailsQuestions}
          />
        );
      case 4:
        return <RegulationDetails />;
      default:
        break;
    }
  };

  const checkError = (setFieldError, errors) => {
    let keysToCheck;
    switch (props?.step) {
      case 2:
        keysToCheck = Object.keys(props?.businessFormRequiredValues?.bd);
        handleErrors(keysToCheck, setFieldError, errors);
        break;
      case 3:
        keysToCheck = Object.keys(props?.businessFormRequiredValues?.cd);
        handleErrors(keysToCheck, setFieldError, errors);
        break;
      case 4:
        if (!isDisabled) {
          props.handleStepCount(true);
          setIsDisabled(true);
        }
        break;
    }
  };

  const handleErrors = (keysToCheck, setFieldError, errors) => {
    let errorExist = false;
    for (const key of keysToCheck) {
      if (errors.hasOwnProperty(key)) {
        setFieldError(key, errors[key]);
        errorExist = true;
      }
    }

    if (errorExist) {
      let errorsKeys = Object?.keys(props?.formik?.errors);
      document?.getElementsByName(errorsKeys[0])[0].scrollIntoView();
      showErrorMessage('Please ensure all sections are filled out', {});
    } else {
      props.handleStepCount(true);
    }
  };

  async function goToNextStep() {
    if (props?.step === 1) {
      props?.setStep(2);
      return;
    }
    const { validateField, setFieldTouched, errors, setFieldError } =
      props.formik;
    const bd = Object.keys(props.businessFormRequiredValues.bd);
    const cd = props.businessFormRequiredValues?.cd
      ? Object.keys(props.businessFormRequiredValues?.cd)
      : [];
    const keys = [...bd, ...cd];
    // Iterate through the keys
    keys?.forEach(async (key) => {
      if (await validateField(key)) {
        await setFieldTouched(key, true);
      }
    });

    checkError(setFieldError, errors);
  }

  return (
    <FormikProvider value={props.formik}>
      <Box
        className="h-100 w-100 d-flex flex-direction-column "
        style={{ gap: 4 }}
      >
        <Box className="w-100" sx={{ flex: 1 }}>
          {renderStep()}
        </Box>
        <Box className="d-flex flex-basic-space-between form-button mt-28">
          <Button
            onClick={() => props.handleStepCount(false)}
            btnText="Previous"
            type="submit"
            className={props.step < 2 ? 'displayHidden' : ''}
            startIcon={<KeyboardBackspaceIcon />}
            variant="text"
            disabled={isDisabled}
          />

          <Box className="d-flex flex-basic-space-between">
            <Button
              onClick={() => goToNextStep()}
              btnText={props.step == 4 ? 'Accept' : 'Next'}
              type="submit"
              variant="contained"
              sx={{ px: 11.11, py: 2.44 }}
              disabled={isDisabled}
            />
          </Box>
        </Box>
      </Box>
    </FormikProvider>
  );
};
