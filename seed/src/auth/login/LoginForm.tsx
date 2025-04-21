import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  Link,
  useTheme,
  IconButton,
  InputAdornment
} from '@mui/material';

import { useAuth } from 'src/providers/AuthguardContext';
import { Button, TextField, Typography } from 'src/shared/components/index';
import * as ROUTES from '../../shared/constants/routes';
import { REGEX } from 'src/shared/constants/constants';
import LoginFormLogo from '../../assets/svg/avery_logo_new.svg';
import VisibilityOff from '../../assets/svg/hidePassword.svg';
import Visibility from '../../assets/svg/eyeOpen.svg';
import {
  selectCommon,
  tokenExchange
} from 'src/modules/common/services/common.service';
import { goToRoute } from './Utils';
import { LoginFormModalProps } from './model';
import { signIn } from 'aws-amplify/auth';
import { getAuthenticatedUser } from 'src/shared/utils/mfa-methods';
import { getMFASettings } from 'src/modules/Setting/api/settingAPI';

const LoginForm = ({ toCheckLoginFrom }: LoginFormModalProps) => {
  // Constants
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const { t } = useTranslation('english');
  const dispatch = useDispatch<any>();
  const { userData } = useSelector(selectCommon);

  // State Values
  const [email, setEmail] = useState<string>('');
  const [errorAtEmail, setErrorAtEmail] = useState(false);
  const [emailLength, setEmailLength] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [errorAtPassword, setErrorAtPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disabledButton, setDisabledButton] = useState(
    !email || !password || errorAtPassword || errorAtEmail
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //useEffect
  useEffect(() => {
    // if (!showLogin && Object.keys(userData).length)
    // commented the above code because it blocks user to login in multiple window
    if (Object.keys(userData).length) {
      if (userData?.accessToken) login(userData);
      const route = goToRoute(userData);
      navigate(route);
    }
  }, [userData]);

  // Methods
  const goToMFAVerification = () => {
    toCheckLoginFrom(true, email);
  };

  const submitLoginDetails = async () => {
    if (email && password) {
      try {
        // get API call
        const mfaPreference = await getMFASettings(email);
        let params: any = {
          username: email,
          password: password
        };
        if (
          mfaPreference?.isMfaActive &&
          mfaPreference?.preferredMfaType === 'EMAIL'
        ) {
          params = {
            ...params,
            options: {
              authFlowType: 'CUSTOM_WITH_SRP'
            }
          };
        }
        const { isSignedIn, nextStep } = await signIn(params);
        if (
          !isSignedIn &&
          (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE' ||
            nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE')
        ) {
          goToMFAVerification();
        } else {
          if (isSignedIn && nextStep?.signInStep == 'DONE') {
            const { idToken } = await getAuthenticatedUser();
            const payload = {
              idToken: idToken
            };
            dispatch(tokenExchange(payload));
            setEmailLength(false);
          }
        }
      } catch (error) {
        setErrorAtEmail(true);
        setErrorAtPassword(true);
        logout();
        return;
      }
    }
  };

  useMemo(
    () =>
      setDisabledButton(!email || !password || errorAtPassword || errorAtEmail),
    [email, password, errorAtPassword, errorAtEmail]
  );

  const goToForgotPassword = () => {
    navigate(ROUTES.FORGETPASSWORD);
  };

  const validateEmail = (event) => {
    const value = event?.target?.value?.trim() || ''; // Combine trimming and null check
    const updatedValue = value.replace(/\s+/g, ''); // Remove extra spaces
    setEmail(value === '' ? '' : updatedValue);
    setErrorAtEmail(!value || !REGEX.EMAIL.test(updatedValue));
    setEmailLength(event.target.value.length === 50);
  };

  function isValidPassword(password) {
    return (
      REGEX.ONE_SYMBOL.test(password) &&
      REGEX.ONE_CAPITAL.test(password) &&
      REGEX.ONE_CHARACTOR.test(password) &&
      REGEX.ONE_NUMBER.test(password)
    );
  }

  const validatePassword = (event) => {
    if (
      !event.target.value ||
      /\s/.test(event.target.value) ||
      !isValidPassword(event.target.value)
    ) {
      setErrorAtPassword(true);
    } else {
      setErrorAtPassword(false);
    }
    const inputValueWithoutSpaces = event.target.value.replace(/\s/g, '');
    setPassword(inputValueWithoutSpaces);
  };

  return (
    <Card
      sx={{
        [theme.breakpoints.up('sm')]: {
          width: '688px'
        }
      }}
      className="loginForm"
    >
      <Box
        sx={{
          [theme.breakpoints.up('sm')]: {
            padding: '60px 120px 0px !important'
          },
          [theme.breakpoints.down('sm')]: {
            padding: '28px'
          }
        }}
        className="loginCardForm w-100"
      >
        <Box>
          <img alt="login form logo" src={LoginFormLogo} width={245} />
        </Box>
        <Box sx={{ mt: 10 }}>
          <Typography className="textweight" variant={'h4'}>
            {t('loginToContinue')}
          </Typography>
        </Box>
        <Box sx={{ mt: 11 }}>
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
            placeholder={t('enterEmailId')}
            inputProps={{
              classes: {
                fullWidth: 'true'
              },
              maxLength: 50
            }}
            onChange={validateEmail}
          />
          {errorAtEmail && (
            <Typography className="mt-5 errorState" variant="subtitle2">
              {!email ? t('enterEmailId') : t('invalidEmail')}
            </Typography>
          )}
          {!errorAtEmail && emailLength && (
            <Typography className="mt-5 errorState" variant="subtitle2">
              {t('maxCharaterLimitExceeded')}
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 7 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            defaultValue={null}
            label={t('password')}
            error={errorAtPassword}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            placeholder={t('enterPassword')}
            inputProps={{
              classes: {
                fullWidth: 'true'
              },
              maxLength: 30
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: 4 }}>
                  <IconButton
                    color="primary"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <img alt="show password icon" src={Visibility} />
                    ) : (
                      <img alt="hide password icon" src={VisibilityOff} />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={validatePassword}
          />
          {errorAtPassword ? (
            <Typography className="mt-5 errorState" variant="subtitle2">
              {!password ? t('enterPassword') : t('invalidPassword')}
            </Typography>
          ) : null}
        </Box>
        <Box sx={{ mt: 5 }} className="flex-basic-center">
          <Link
            sx={{ pr: 1 }}
            className="cursorPointer"
            onClick={goToForgotPassword}
            variant="subtitle2"
          >
            <Typography className="textweight" variant="subtitle2">
              {t('forgotPassword')}
            </Typography>
          </Link>
        </Box>
        {/* // Remove mb 10 when uncommnet the below code */}
        <Box sx={{ mt: 10, mb: 20 }} className="flex-column-center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
            btnText={t('login')}
            onClick={submitLoginDetails}
            className="w-100"
            disabled={disabledButton}
          ></Button>
        </Box>
      </Box>
    </Card>
  );
};

export default LoginForm;
