import {
  Card,
  CardHeader,
  Typography,
  Divider,
  CardContent,
  CardActions,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import {
  Button,
  TextField,
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/index';
import visibilityOff from 'src/assets/svg/hidePassword.svg';
import Visibility from 'src/assets/svg/eyeOpen.svg';
import { checkPasswordValidations, passwordChecks } from '../constant';
import { useTranslation } from 'react-i18next';
import { changePasswordProps } from '../../model/settingModel';
import PasswordValidator from './PasswordValidator';
import { updatePassword } from 'aws-amplify/auth';

const ChangePasswordView = (props: changePasswordProps) => {
  const { getBackToAccountDetail } = props;
  const { t } = useTranslation('setting');

  // states
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordValidateArray, setPasswordValidateArray] = useState([]);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>();
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [isBothNewAndConfirmPasswordMatch, setBothNewAndConfirmPasswordMatch] =
    useState<boolean>(false);
  const [errorAtNewPassword, setErrorAtNewPassword] = useState<boolean>();
  const [validAllChecksOfPassword, setValidAllChecksOfpasswod] =
    useState<boolean>();
  const [isBothCurrentAndNewPasswordMatch, setBothCurrentAndNewPasswordMatch] =
    useState<boolean>(false);

  // check current password
  const handleCurrentPassword = (event) => {
    const currentPassword = removeWhiteSpace(event.target.value);
    setPasswords({ ...passwords, currentPassword: currentPassword });
    checkIfCurrentAndNewPasswordAreSame(passwords.newPassword, currentPassword);
  };

  // handle new password change
  const handleNewPassword = (event) => {
    let newPassword = removeWhiteSpace(event.target.value);
    setPasswords({ ...passwords, newPassword: newPassword });
    let passwordValidateArray: any = checkPasswordValidations(newPassword);
    let allPasswordChecks = passwordValidateArray.filter(
      (element) => element !== null && element !== undefined && element !== ''
    );
    checkIFPasswordPassAllChecksOfPassword(allPasswordChecks);
    checkIfCurrentAndNewPasswordAreSame(newPassword, passwords.currentPassword);
    checkIfNewAndConfirmPasswordMatch(newPassword, passwords.confirmPassword);
    setPasswordValidateArray(passwordValidateArray);
  };

  // handle confirm password change
  const checkConfirmPassword = (event) => {
    let confirmPassword = removeWhiteSpace(event.target.value);
    setPasswords({ ...passwords, confirmPassword: confirmPassword });
    checkIfNewAndConfirmPasswordMatch(passwords.newPassword, confirmPassword);
    checkIfCurrentAndNewPasswordAreSame(
      passwords.newPassword,
      passwords.currentPassword
    );
  };

  //call api to change password  //todo
  const handlePasswordChange = async () => {
    try {
      await updatePassword({
        oldPassword: passwords?.currentPassword,
        newPassword: passwords?.confirmPassword
      });
      showSuccessMessage(t('passwordChangeSuccessMessage'), '', {});
      setTimeout(() => {
        getBackToAccountDetail(false);
      }, 2000);
    } catch (error) {
      if (error?.message == 'Incorrect username or password.') {
        showErrorMessage(`${t('wrongPassword')}`,{})
      } else {
        showErrorMessage(error.message, {});
      }
    }
  };
  // don't let password to have white space in password
  const removeWhiteSpace = (password: string): string =>
    password.trim().split(' ').join('');

  // check if current password and new password  are same and show error
  const checkIfCurrentAndNewPasswordAreSame = (
    newPassword,
    currentPassword
  ) => {
    if (newPassword === currentPassword) {
      setErrorAtNewPassword(true);
      setBothCurrentAndNewPasswordMatch(true);
    } else {
      setErrorAtNewPassword(false);
      setBothCurrentAndNewPasswordMatch(false);
    }
  };

  // check if new password and confirm password   are matching  and  if not  matching  show error
  const checkIfNewAndConfirmPasswordMatch = (newPassword, currentPassword) => {
    if (newPassword === currentPassword) {
      setBothNewAndConfirmPasswordMatch(true);
    } else {
      setBothNewAndConfirmPasswordMatch(false);
    }
  };
  // check if new password passes all the password validation
  const checkIFPasswordPassAllChecksOfPassword = (allPasswordChecks) => {
    if (allPasswordChecks.length === 5) {
      setValidAllChecksOfpasswod(true);
      setErrorAtNewPassword(false);
    } else {
      setValidAllChecksOfpasswod(false);
      setErrorAtNewPassword(true);
    }
  };

  return (
    <Box className="accountDetailsWrapper passwordWrapper">
      <Card className="accountDetails">
        <CardHeader
          title={
            <Box>
              <Typography className="ad-title">
                {t('changePassword')}
              </Typography>
            </Box>
          }
        />
        <Divider className="divider" />
        <CardContent className="accountDetailContent">
          <Box className="d-flex passwordContent">
            <Box className="flex-column-start mr-20" sx={{ width: '45%' }}>
              <Box className="password w-100">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="current password"
                  placeholder={t('currentPasswordPlaceholder')}
                  label={t('currentPassword')}
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={passwords.currentPassword}
                  inputProps={{ maxLength: 30 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 4 }}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setShowCurrentPassword((prev) => !prev);
                          }}
                          edge="end"
                        >
                          {showCurrentPassword ? (
                            <img alt='Password Visibility' src={Visibility} />
                          ) : (
                            <img alt='Password Visibility Off'   src={visibilityOff} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleCurrentPassword}
                />
              </Box>
              <Box className="password w-100">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="new password"
                  label={t('newPassword')}
                  type={showNewPassword ? 'text' : 'password'}
                  id="password"
                  value={passwords?.newPassword}
                  inputProps={{ maxLength: 30 }}
                  placeholder={t('createNewPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 4 }}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setShowNewPassword((prev) => !prev);
                          }}
                          edge="end"
                        >
                          {showNewPassword ? (
                            <img alt='Password Visibility' src={Visibility} />
                          ) : (
                            <img alt='Password Visibility Off' src={visibilityOff} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleNewPassword}
                />
                {errorAtNewPassword && passwords.newPassword ? (
                  <Typography className="mt-5 errorState" variant="subtitle2">
                    {isBothCurrentAndNewPasswordMatch &&
                      t('passwordSameMessage')}
                  </Typography>
                ) : null}
              </Box>
              <Box className="password w-100">
                <TextField
                  margin="0"
                  required
                  fullWidth
                  name="password"
                  label={t('confirmNewPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm password"
                  autoComplete="current-password"
                  placeholder={t('confirmNewPasswordPlaceholder')}
                  value={passwords?.confirmPassword}
                  error={
                    !isBothNewAndConfirmPasswordMatch &&
                    passwords?.confirmPassword
                  }
                  inputProps={{ maxLength: 30 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 4 }}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setShowConfirmPassword((prev) => !prev);
                          }}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <img alt='Password Visibility' src={Visibility} />
                          ) : (
                            <img alt='Password Visibility Off' src={visibilityOff} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={checkConfirmPassword}
                />
                {passwords.confirmPassword &&
                  !isBothNewAndConfirmPasswordMatch && (
                    <Typography className="mt-5 errorState" variant="subtitle2">
                      {t('notIdentical')}
                    </Typography>
                  )}
              </Box>
            </Box>
            <Box className="passwordMeter d-flex align-items-center ml-20">
              <Box className="ml-35">
                <Box className="d-flex flex-direction-row w-100">
                  <Typography
                    className=""
                    variant={'subtitle1'}
                    sx={{ px: '1rem' }}
                  >
                    {t('passwordRequirement')}
                  </Typography>
                </Box>
                <Box className="d-flex flex-direction-row " sx={{ gap: 1 }}>
                  <PasswordValidator
                    passwordChecks={passwordChecks}
                    passwordValidateArray={passwordValidateArray}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions className="passwordFooter">
          <Box sx={{ py: 4, px: 4 }} className="flex-basic-space-between w-100">
            <Box className="flex-basic-end w-60">
              <Button
                variant="outlined"
                type="submit"
                className="mr-24"
                btnText="CANCEL"
                onClick={() => {
                  getBackToAccountDetail(false);
                }}
                sx={{ py: '0.62rem', px: '2rem', minWidth: '125px' }}
              />
              <Button
                variant="contained"
                type="submit"
                btnText="SAVE"
                disabled={
                  !(
                    isBothNewAndConfirmPasswordMatch &&
                    passwords?.currentPassword &&
                    !errorAtNewPassword &&
                    validAllChecksOfPassword
                  )
                }
                onClick={handlePasswordChange}
                sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
              />
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ChangePasswordView;
