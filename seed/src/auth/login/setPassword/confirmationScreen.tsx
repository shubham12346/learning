import { Card, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'src/shared/components/index';
import loginConfirmationCheckLogo from '../../../assets/svg/SuccessImage.svg';

const ConfirmateionScreen = (props) => {
  const theme = useTheme();
  const { t } = useTranslation('english');

  return (
    <Card
      sx={{
        [theme.breakpoints.up('md')]: {
          padding: '77px 160px!important'
        },
        [theme.breakpoints.down('md')]: {
          padding: '20px'
        }
      }}
      className="flex-column-center"
    >
      <Box>
        <img
          src={loginConfirmationCheckLogo}
          alt="loginConfirmationCheckLogo"
        />
      </Box>
      <Typography sx={{ mb: 2 }} className="textsemiWeight" variant="h2">
        {t('successText', { ns: 'forgotPassword' })}
      </Typography>
      <Typography fontWeight={500} variant="h4">
        {t(props.subtitle1, { ns: 'forgotPassword' })}
      </Typography>
      <Typography fontWeight={500} variant="h4">
        {t(props.subtitle2, { ns: 'forgotPassword' })}
      </Typography>

      <Box className="flex-basic-center">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 12 }}
          btnText={t('backtoLogin', { ns: 'forgotPassword' })}
          onClick={props?.backtoLogin}
        ></Button>
      </Box>
    </Card>
  );
};

export default ConfirmateionScreen;
