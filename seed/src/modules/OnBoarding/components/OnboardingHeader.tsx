import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Typography } from 'src/shared/components/index';

const OnboardingHeaderData = [
  {
    title: 'crdEntry',
    details: 'crdDescription'
  },
  {
    title: 'businessDetails',
    details: 'onBoardingBusinessDetails'
  },
  {
    title: 'Compliance Details',
    details: 'onBoardingEmployeeDetails'
  },
  {
    title: 'regulationsConfirmation',
    details: 'regulationsConfirmationDetails'
  }
];

export const OnboardingHeader = ({ step }) => {
  const { t } = useTranslation('english');
  return (
    <Box>
      <Typography variant="h3">
        {t(OnboardingHeaderData[step == -1 ? 0 : step - 1].title)}
      </Typography>
      <Typography variant="body1">
        {t(OnboardingHeaderData[step == -1 ? 0 : step - 1].details)}
      </Typography>
    </Box>
  );
};
