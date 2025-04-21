import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  useTheme
} from '@mui/material';
import { confirmResetPassword, resetPassword, signUp } from 'aws-amplify/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  checkPasswordValidations,
  passwordChecks
} from 'src/modules/Setting/component/constant';
import { Button, TextField, Typography } from 'src/shared/components/index';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import CheckIcon from '../../../assets/svg/check.svg';
import Visibility from '../../../assets/svg/eyeOpen.svg';
import visibilityOff from '../../../assets/svg/hidePassword.svg';

const SetPasswordForm = (props) => {
  const theme = useTheme();
  const { t } = useTranslation('english');
  const { isVerifictionScreen = false, userData } = props;
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState(null);
  const [passwordValidateArray, setPasswordValidateArray] = useState([]);
  const [isPasswordFormValid, setIsPasswordFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorAtConfirmPassword, setErrorAtConfirmPassword] = useState(false);

  const handlePasswordChange = (event) => {
    let newPassword = event.target.value;
    newPassword = newPassword.trim();
    setPassword(newPassword);
    let passwordValidateArray: any = checkPasswordValidations(newPassword);

    checkErrorAtConfirmPassword(newPassword, confirmPassword);
    checkAllPasswordCheckForNewPassword(
      passwordValidateArray,
      newPassword,
      confirmPassword
    );

    if (isVerifictionScreen) {
      checkErrorInVerificationCodeNewAndConfirmPassword(
        newPassword,
        confirmPassword,
        passwordValidateArray,
        verificationCode
      );
    }
    setPasswordValidateArray(passwordValidateArray);
  };

  const checkConfirmPassword = (event) => {
    let confirmPassword = event.target.value;
    confirmPassword = confirmPassword.trim();
    setConfirmPassword(confirmPassword);

    checkErrorAtConfirmPassword(password, confirmPassword);
    checkAllPasswordCheckForNewPassword(
      passwordValidateArray,
      password,
      confirmPassword
    );
    if (isVerifictionScreen) {
      checkErrorInVerificationCodeNewAndConfirmPassword(
        password,
        confirmPassword,
        passwordValidateArray,
        verificationCode
      );
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleVerificationCodeChange = (event) => {
    const value = event?.target?.value;
    const numericValue = value.replace(/\D/g, '');
    setVerificationCode(numericValue);
    if (numericValue) {
      setVerificationCodeError(false);
    }
    if (isVerifictionScreen) {
      checkErrorInVerificationCodeNewAndConfirmPassword(
        password,
        confirmPassword,
        passwordValidateArray,
        numericValue
      );
    }
  };

  const checkErrorInVerificationCodeNewAndConfirmPassword = (
    password,
    confirmPassword,
    passwordValidateArray,
    verificationCode
  ) => {
    if (verificationCode?.length <= 0) {
      setIsPasswordFormValid(false);
      return;
    }
    let errorAtConfirmPswd = checkErrorAtConfirmPassword(
      password,
      confirmPassword
    );
    let allPasswordChecks = checkAllPasswordCheckForNewPassword(
      passwordValidateArray,
      password,
      confirmPassword
    );

    if (
      verificationCode?.length &&
      allPasswordChecks &&
      !errorAtConfirmPswd &&
      confirmPassword?.length >= 8
    ) {
      setIsPasswordFormValid(true);
    } else {
      setIsPasswordFormValid(false);
    }
  };

  const checkErrorAtConfirmPassword = (password, confirmPassword) => {
    if (password === '' || confirmPassword === '') {
      setErrorAtConfirmPassword(false);
      return false;
    }
    if (password === confirmPassword) {
      setErrorAtConfirmPassword(false);
      return false;
    } else {
      setErrorAtConfirmPassword(true);
      return true;
    }
  };

  const checkAllPasswordCheckForNewPassword = (
    passwordValidateArray,
    password,
    confirmPassword
  ) => {
    const regxValidcheck = passwordValidateArray.filter(
      (element) => element !== null && element !== undefined && element !== ''
    ).length;
    if (regxValidcheck == 5 && password == confirmPassword) {
      setIsPasswordFormValid(true);
      return true;
    } else {
      setIsPasswordFormValid(false);
      return false;
    }
  };
  async function goToNextStep() {
    if (isVerifictionScreen) {
      try {
        await confirmResetPassword({
          username: userData.email,
          newPassword: password,
          confirmationCode: verificationCode
        });
      } catch (error) {
        setVerificationCodeError(true);
        return;
      }
    } else {
      try {
        const params = {
          username: userData.email,
          password: password,
          options: {
            userAttributes: {
              name: userData.name
            }
          }
        };
        await signUp(params);
      } catch (error) {
        console.log('error', error);
      }
    }
    props?.goToNextStep();
    // TO DO
  }

  //resend the email verification code
  const resendEmailVerificationCode = async () => {
    try {
      const { isPasswordReset, nextStep } = await resetPassword({
        username: userData?.email
      });
      if (
        !isPasswordReset &&
        nextStep?.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE'
      ) {
        showSuccessMessage('Resend email verification code!', '', {
          position: 'top-right'
        });
      }
    } catch (error) {
      if (error.name === 'LimitExceededException') {
        showErrorMessage(t('limitExceededException', { ns: 'english' }), {
          position: 'top-right'
        });
      } else {
        showErrorMessage('Something went wrong!', {
          position: 'top-right'
        });
      }
    }
  };

  return (
    <Card
      sx={{
        [theme.breakpoints.up('md')]: {
          width: '920px',
          padding: '3.75rem 3.75rem !important'
        },
        [theme.breakpoints.down('md')]: {
          padding: '28px'
        }
      }}
      className=""
    >
      <Box>
        {isVerifictionScreen ? (
          <Box className="flex-basic-start w-100 mb-10">
            <Typography variant={'h2'}>
              {t('passwordScreen.resetPassword')}
            </Typography>
          </Box>
        ) : (
          <Box className="flex-basic-start w-100 mb-10">
            <Typography variant={'h2'}>
              {t('passwordScreen.hello')} {userData?.name}!
            </Typography>
          </Box>
        )}
        <Box className="flex-basic-start w-100 mb-10">
          <Typography variant={'h4'}>
            {isVerifictionScreen ? t('passwordScreen.info') : t(props.subtitle)}
          </Typography>
          <Box className="bgSurfaceColor">
            <Typography variant={'h4'} sx={{ ml: 2 }}>
              {userData?.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container className="w-100" spacing={0} sx={{ mt: '3rem' }}>
        <Grid item xs={12} sm={6}>
          <Box className="mr-70">
            {isVerifictionScreen && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  defaultValue={null}
                  label="Verification Code"
                  type="text"
                  pattern="[0-9]"
                  value={verificationCode}
                  error={verificationCodeError}
                  placeholder="Enter Code"
                  inputProps={{ maxLength: 6 }}
                  onChange={handleVerificationCodeChange}
                />
                {verificationCodeError ? (
                  <Typography className="mt-5 errorState" variant="subtitle2">
                    {'Please enter valid verification code'}
                  </Typography>
                ) : null}
                <Box className="d-flex w-100 mt-11">
                  <Typography className="textWeightRegular" variant="body2">
                    {t('passwordScreen.pwsNotRecived')}
                  </Typography>
                  <Typography
                    className="textweight bgSurfaceColor cursorPointer"
                    sx={{ ml: 2 }}
                    variant="body2"
                    onClick={resendEmailVerificationCode}
                  >
                    {t('passwordScreen.resend')}
                  </Typography>
                </Box>
                <Box className="mt-32"></Box>
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              defaultValue={null}
              label="New Password"
              error={false}
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              inputProps={{ maxLength: 30 }}
              autoComplete="current-password"
              value={password}
              placeholder="Create New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 4 }}>
                    <IconButton
                      color="primary"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <img src={Visibility} alt="hide password" />
                      ) : (
                        <img src={visibilityOff} alt="show password" />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={handlePasswordChange}
            />
            <Box className="mt-32"></Box>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              defaultValue={null}
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={confirmPassword}
              error={errorAtConfirmPassword}
              inputProps={{ maxLength: 30 }}
              placeholder="Confirm New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 4 }}>
                    <IconButton
                      color="primary"
                      onClick={handleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <img src={Visibility} alt="hide password" />
                      ) : (
                        <img src={visibilityOff} alt="show password" />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={checkConfirmPassword}
            />
            {errorAtConfirmPassword ? (
              <Typography className="mt-5 errorState" variant="subtitle2">
                {t('passwordScreen.notIdenticalPassword')}
              </Typography>
            ) : null}
          </Box>
          <Box className="flex-basic-start mt-48">
            <Button
              type="submit"
              variant="contained"
              sx={{ px: '2.75rem', py: '0.62rem' }}
              btnText={isVerifictionScreen ? 'Reset Password' : 'Continue'}
              disabled={!isPasswordFormValid || verificationCodeError}
              onClick={goToNextStep}
            ></Button>
            {isVerifictionScreen && (
              <Button
                onClick={props?.backtoLogin}
                btnText="Back to login"
                type="submit"
                variant="text"
                sx={{ ml: 5 }}
              />
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            pl: '3rem',
            pt: '2.62rem',
            backgroundColor: '#F5F7FD',
            borderRadius: 2
          }}
        >
          <Box className="d-flex flex-direction-row w-100">
            <Typography className="" variant={'subtitle1'} sx={{ px: '1rem' }}>
              {t('passwordRequirements')}
            </Typography>
          </Box>

          <Box className="d-flex flex-direction-row" sx={{ gap: 1 }}>
            <List className="pl-0 w-100">
              {passwordChecks.map((item, index) => (
                <ListItem key={`${index}-${item}`} className="d-flex">
                  <Box sx={{ flex: 1 }} className="d-flex">
                    {passwordValidateArray[index] == item && (
                      <img src={CheckIcon} className="mr-12" alt="check icon" />
                    )}
                    <Typography
                      className={
                        passwordValidateArray[index] == item
                          ? 'textWeightRegular'
                          : 'bg-password-not-active'
                      }
                      variant="body2"
                    >
                      {t(item)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SetPasswordForm;
