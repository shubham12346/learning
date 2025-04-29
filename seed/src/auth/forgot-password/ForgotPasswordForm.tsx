import { Box, Card, Link, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetPassword } from 'aws-amplify/auth';

import { Button, TextField, Typography } from 'src/shared/components/index';
import { REGEX } from 'src/shared/constants/constants';

const ForgotPasswordForm = (props) => {
  // Constants
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation(['english', 'forgotPassword']);

  // State Values
  const [email, setEmail] = useState('');
  const [errorAtEmail, setErrorAtEmail] = useState(false);
  const [errorStr, setErrorStr] = useState('');

  // Methods
  const submitLoginDetails = async () => {
    try {
      const { isPasswordReset, nextStep } = await resetPassword({
        username: email
      });
      if (
        !isPasswordReset &&
        nextStep?.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE'
      ) {
        props?.goToNextStep(email);
        setEmail('');
      }
    } catch (error) {
      setErrorStr('limitExceededException');
      setErrorAtEmail(true);
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  const validateEmail = (event) => {
    let validateEmail = event.target.value;
    validateEmail = validateEmail.trim();
    if (!validateEmail || !REGEX.EMAIL.test(validateEmail)) {
      setErrorStr('invalidEmail');
      setErrorAtEmail(true);
    } else {
      setErrorStr('');
      setErrorAtEmail(false);
    }
    setEmail(validateEmail);
  };

  return (
    <Card
      sx={{
        [theme.breakpoints.up('md')]: {
          padding: '60px!important'
        },
        [theme.breakpoints.down('md')]: {
          padding: '20px'
        }
      }}
    >
      <Box>
        <Typography sx={{ mb: 2 }} className="textsemiWeight" variant="h2">
          {t('forgotTitleText', { ns: 'forgotPassword' })}
        </Typography>
        <Typography fontWeight={500} variant="h4">
          {t('forgotTitleSubText', { ns: 'forgotPassword' })}
        </Typography>
      </Box>
      <Box sx={{ mt: 12 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('emailId')}
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue={null}
          error={errorAtEmail}
          value={email}
          placeholder={t('enterEmailId', { ns: 'english' })}
          inputProps={{
            maxLength: 50,
            classes: {
              fullWidth: 'true'
            }
          }}
          onChange={validateEmail}
        />
        {errorAtEmail ? (
          <Typography className="mt-5 errorState" variant="subtitle2">
            {!email && t('enterEmailId', { ns: 'english' })}
            {email &&
              errorStr === 'invalidEmail' &&
              t('invalidEmail', { ns: 'english' })}
            {email &&
              errorStr === 'limitExceededException' &&
              t('limitExceededException', { ns: 'english' })}
          </Typography>
        ) : null}
      </Box>
      <Box sx={{ mt: 11 }} className="flex-basic-start">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 4 }}
          btnText={t('Continue', { ns: 'forgotPassword' })}
          onClick={submitLoginDetails}
          disabled={!email || errorAtEmail}
        ></Button>
      </Box>
      <Box sx={{ mt: 6 }} className="mt-20 flex-basic-start">
        <Link onClick={goToLogin} className="cursorPointer" variant="subtitle2">
          <Typography className="textweight" variant="body1">
            {t('backtoLogin', { ns: 'forgotPassword' })}
          </Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default ForgotPasswordForm;
