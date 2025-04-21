import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCommon } from 'src/modules/common/services/common.service';
import { Button, showSuccessMessage, TextField } from 'src/shared/components/index';
import {
  getAuthenticatedUser,
  handleTOTPSetup,
  handleTOTPVerification,
  handleUpdateMFAPreference
} from 'src/shared/utils/mfa-methods';
import { getMFASettings, updateMFASettings } from '../../api/settingAPI';

const MFASetup = () => {
  //const
  const { t } = useTranslation('setting');

  //redux
  const { authUserData } = useSelector(selectCommon);

  //state variables
  const [isOTPString, setIsOTPString] = useState<any>('');
  const [verifiedCode, setVerifiedCode] = useState('');
  const [error, setError] = useState('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [showTheMFAType, setShowTheMFAType] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isVerifiedMFA, setIsVerifiedMFA] = useState<boolean>(false);
  const [value, setValue] = React.useState('');

  // useEffect
  useEffect(() => {
    getCurrentAuthenticatedUser();
  }, []);

  //methods
  const getCurrentAuthenticatedUser = async () => {
    const userDetails = await getAuthenticatedUser();
    if (userDetails) {
      const email = userDetails?.user?.signInDetails?.loginId;
      const mfaPreference = await getMFASettings(email);
      if (mfaPreference.isMfaActive) {
        setIsChecked(true);
        setShowTheMFAType(true);
        setValue(mfaPreference.preferredMfaType === 'TOTP' ? 'totp' : 'email');
      } else {
        setIsChecked(false);
      }
    }
  };

  //setupMFA Type
  const setUserData = async () => {
    const qrCode = await handleTOTPSetup();
    setIsLoader(false);
    setIsOTPString(qrCode);
  };

  //verify User with MFA Type
  const userVerifyMFAType = async () => {
    setIsVerifiedMFA(true);
    const resp = await handleTOTPVerification(verifiedCode);
    if (resp) {
      getCurrentAuthenticatedUser();
      setIsVerifiedMFA(false);
      setIsOTPString('');
      setVerifiedCode('');
      await updateMFASettings({
        isMfaActive: true,
        preferredMfaType: 'TOTP'
      });
    } else {
      setError('Please enter a valid 6-digit code.');
      setIsVerifiedMFA(false);
    }
  };

  //Handle Radio
  const handleChange = async (event) => {
    setValue(event.target.value);
    if (event.target.checked && event.target.value === 'totp') {
      setIsLoader(true);
      setUserData();
      setError('');
      setDisabledButton(true);
    } else {
      await handleUpdateMFAPreference('DISABLED');
      const resp = await updateMFASettings({
        isMfaActive: true,
        preferredMfaType: 'EMAIL'
      });
      if (resp?.isMfaActive === true) {
        showSuccessMessage('MFA Type Email Activated Succesfully!!!', '', {
          position: 'top-right'
        });
      }
      setIsOTPString('');
      setVerifiedCode('');
      setError('');
      setDisabledButton(true);
    }
  };

  //Verification Code Input
  const verifiedCodeChange = (event) => {
    const inputValue = event.target.value;
    let trimmedValue = inputValue?.trim();
    let updatedValue = '';
    if (trimmedValue !== '') {
      updatedValue = event?.target?.value?.replace(/\s+/g, ' ');
      if (/^\d{6}$/.test(updatedValue)) {
        setError('');
        setDisabledButton(false);
      } else {
        setError(t('pleaseEnterOnlyDigits'));
        setDisabledButton(true);
      }
      setVerifiedCode(updatedValue);
    } else {
      setError('');
      setVerifiedCode('');
    }
  };

  //MFA active/Inactive
  const handleToggle = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
      setShowTheMFAType(true);
    } else {
      setShowTheMFAType(false);
      setIsChecked(false);
      setIsOTPString('');
      setNoMFA();
      setValue('');
    }
  };

  const setNoMFA = async () => {
    setIsVerifiedMFA(true);
    await handleUpdateMFAPreference('DISABLED');
    await updateMFASettings({
      isMfaActive: false
    });
    setIsVerifiedMFA(false);
  };

  return (
    <Container maxWidth={'xl'}>
      <Box className="mfaDetails">
        <Card>
          <CardHeader
            title={
              <Box>
                <Typography className="ad-title">{t('setupMFA')}</Typography>
              </Box>
            }
          />
          <Divider className="divider" />
          <CardContent className="mfaContent">
            <Box className="mt-10" sx={{ px: 4 }}>
              <Box className="flex-basic-start">
                <Box>
                  <Typography variant="subtitle1">
                    {t('mfaEnabledDisabled')}
                  </Typography>
                </Box>
                <Box sx={{ ml: 4 }} className="customToggle p-relative">
                  <input
                    type="checkbox"
                    id="switch"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <label htmlFor="switch">Toggle</label>
                </Box>
              </Box>

              {isChecked && (
                <Box className="flex-basic-start mt-32">
                  <Typography sx={{ mr: 4 }} variant="body1">
                    {'Preferred MFA Types:'}
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      sx={{ flexDirection: 'row' }}
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      onChange={handleChange}
                      value={value}
                    >
                      <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="EMAIL"
                      />
                      <FormControlLabel
                        value="totp"
                        control={<Radio />}
                        label="Authenticator App"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              {showTheMFAType && (
                <>
                  {isLoader ? (
                    <Box className="spinnerLoading mt-100 ml-100"></Box>
                  ) : (
                    <>
                      {isOTPString &&
                        (authUserData ||
                          authUserData?.challengeName ===
                            'SOFTWARE_TOKEN_MFA') && (
                          <>
                            <Box sx={{ mx: 5, mt: 8, mb: 3 }}>
                              <QRCodeCanvas size={230} value={isOTPString} />
                            </Box>
                            <Box className="mb-30">
                              <Typography
                                className="textItalic"
                                variant="body2"
                              >
                                {t('scanCode')}
                              </Typography>
                            </Box>
                            <Box className="mb-20">
                              <Box className="w-30">
                                <TextField
                                  maxWidth={100}
                                  name="passcode"
                                  defaultValue={null}
                                  label={'Verification Code'}
                                  type={'text'}
                                  id="passcode"
                                  value={verifiedCode}
                                  placeholder={t('enterVerificationCode')}
                                  onChange={verifiedCodeChange}
                                  inputProps={{
                                    pattern: '^[0-9]{6}$',
                                    title: t('pleaseEnterOnlyDigits'),
                                    minLength: 6,
                                    maxLength: 6
                                  }}
                                />
                                {error && (
                                  <div style={{ color: 'red' }}>{error}</div>
                                )}
                              </Box>
                              <Box className="flex-basic-start mt-20">
                                <Button
                                  type="submit"
                                  variant="contained"
                                  sx={{ my: 4 }}
                                  btnText={'Verify MFA'}
                                  disabled={disabledButton}
                                  onClick={() => {
                                    userVerifyMFAType();
                                  }}
                                  className="w-20"
                                ></Button>
                              </Box>
                            </Box>
                          </>
                        )}
                    </>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isVerifiedMFA}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default MFASetup;
