import { Typography } from 'src/shared/components/index';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import stepper from './../../../assets/svg/StepperChecked.svg';

const stepsList = [
  {
    value: 'crdEntry',
    key: 1
  },
  {
    value: 'businessDetails',
    key: 1
  },
  {
    value: 'compliance',
    key: 2
  },
  {
    value: 'regulationConfirmation',
    key: 3
  }
];

export const OnboardingStepper = ({ step }) => {
  const { t } = useTranslation('english');

  const highlightStep = (i) => {
    if (step >= i) {
      return 0.8999999761581421;
    }
    return 0.6000000238418579;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {stepsList.map((element, i) => (
        <Box
          className="d-flex align-items-center"
          key={`${i}-${element.value}`}
          sx={{ gap: '20px' }}
        >
          {step > i ? (
            <Box>
              <img src={stepper} alt="step" />
            </Box>
          ) : (
            <Box
              className="flex-basic-center onboarding-stepper"
              sx={{ opacity: highlightStep(i) }}
            >
              <Typography
                variant="subtitle1"
                sx={{ opacity: highlightStep(i) }}
              >
                {i + 1}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography sx={{ opacity: highlightStep(i) }} variant="subtitle1">
              {t(element.value)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
