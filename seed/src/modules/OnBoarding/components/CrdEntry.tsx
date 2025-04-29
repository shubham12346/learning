import { Box, Card, Typography } from '@mui/material';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import FormField from 'src/shared/components/form-field/FormField';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';
import CircularWithValueLabel from './CircularProgressBar';
import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage
} from 'src/shared/components/toaster/Toast';
import { crdPropType } from '../models';
import { cancelCrdNumber, verifyCrdNumber } from '../apis/OnBoardingApi';

const CrdEntry = ({ setStep, saveOnboardingCrdEntry }: crdPropType) => {
  const { t } = useTranslation('english');
  const [progressValue, setProgressValue] = useState(0);
  const [openProgressBar, setOpenProgress] = useState<boolean>(false);
  const [cancel, setCancel] = useState(false);

  const [formikInitialValue] = useState({
    CrdNumber: localStorage.getItem('crdNumber') || ''
  });

  let progressTimer;
  const formik = useFormik({
    initialValues: formikInitialValue,
    validateOnChange: true,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      handleProgressBarOpen();
      verifyCrd(values.CrdNumber);
      localStorage.setItem('crdNumber', values.CrdNumber);
    }
  });

  const { isValid, handleSubmit } = formik;

  const handleInputChange = (event, field) => {
    const value = event?.target?.value;
    let trimmedValue = value?.trim();
    let updatedValue = '';
    if (trimmedValue !== '') {
      updatedValue = event?.target?.value?.replace(/\D/g, '');
      formik.setFieldValue(field?.name, updatedValue);
    } else {
      formik.setFieldValue(field?.name, '');
    }
  };

  const fields: FormFieldType[] = [
    {
      name: 'CrdNumber',
      id: 'CrdNumber',
      type: 'text',
      showInfoIcon: false,
      label: 'CRD Number',
      placeholder: 'Enter CRD Number',
      isBold: true,
      validations: {
        maxLength: 51,
        minLength: 3
      },
      handleFieldChange: handleInputChange
    }
  ];

  const verifyCrd = async (crdNumber) => {
    setCancel(false);
    try {
      await verifyCrdNumber(crdNumber, '');
      setProgressValue(100);
      saveOnboardingCrdEntry(crdNumber);
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause, {});
      handleProgressBarClose();
      setProgressValue(0);
    }
  };

  const handleProgressBarOpen = () => {
    setOpenProgress(true);
    makeProgressTo80Percent();
  };

  const handleProgressBarClose = () => {
    setOpenProgress(false);
  };

  const makeProgressTo80Percent = () => {
    progressTimer = setInterval(() => {
      setProgressValue((prevProgress) => {
        if (prevProgress >= 80) {
          clearInterval(progressTimer);
          return prevProgress;
        }
        return Math.min(
          prevProgress + (Math.floor(Math.random() * 5) + 1),
          100
        );
      });
    }, 800);
  };

  const handleCancel = async () => {
    handleProgressBarClose();
    const crd = localStorage.getItem('crdNumber');
    saveOnboardingCrdEntry('cancel');
    setCancel(true);
    try {
      const res = await cancelCrdNumber(crd);
      showWarningMessage(res.message, {});
    } catch (error) {
      showErrorMessage(error.response.data.cause, {});
    } finally {
      setProgressValue(0);
    }
  };

  useEffect(() => {
    let interval;
    if (progressValue === 100 && !cancel) {
      interval = setTimeout(() => {
        handleProgressBarClose();
        setStep(2);
        showSuccessMessage(
          t('crdMessage.description'),
          t('crdMessage.subDescription'),
          {}
        );
      }, 2000);
    }

    return () => {
      clearTimeout(interval);
    };
  }, [progressValue, cancel]);

  return (
    <Card sx={{ flexShrink: 0, height: '' }} className="w-100  ">
      <Box className="crd-wrapper flex-basic-space-start boxPadding">
        <Box className="" sx={{ pt: 11, pl: 11 }}>
          <FormikProvider value={formik}>
            <Box className="w-70">
              {fields?.map((field, index) => (
                <FormField fieldProps={field} key={`${index}-${field?.name}`} />
              ))}
            </Box>
          </FormikProvider>
          <Box className="d-flex flex-column-start mt-46">
            <Button
              onClick={() => handleSubmit()}
              btnText={t('crdMessage.verify')}
              type="submit"
              variant="contained"
              disabled={formik?.values?.CrdNumber === ''}
              sx={{ px: 11.11, py: 2.44 }}
            />
            <Typography className="mt-20 crdNextDescription">
              {t('crdNextDescription')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <CircularWithValueLabel
          progressValue={progressValue}
          openProgressBar={openProgressBar}
          handleProgressBarOpen={handleProgressBarOpen}
          handleProgressBarClose={handleProgressBarClose}
          handleCancel={handleCancel}
        />
      </Box>
    </Card>
  );
};

export default CrdEntry;
