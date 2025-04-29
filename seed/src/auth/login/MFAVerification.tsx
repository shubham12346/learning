import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Link, useTheme } from '@mui/material';
import { useAuth } from 'src/providers/AuthguardContext';
import {
  Button,
  TextField,
  Typography,
  showErrorMessage
} from 'src/shared/components/index';
import LoginFormLogo from '../../assets/svg/avery_logo_new.svg';
import { goToRoute } from './Utils';
import { LoginFormModalProps } from './model';
import {
  selectCommon,
  tokenExchange
} from 'src/modules/common/services/common.service';
import { confirmSignIn } from 'aws-amplify/auth';
import { getAuthenticatedUser } from 'src/shared/utils/mfa-methods';
import { getMFASettings } from 'src/modules/Setting/api/settingAPI';

const MFAVerification = ({
  toCheckLoginFrom,
  userEmail
}: LoginFormModalProps) => {
  // Constants
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation('english');
  const dispatch = useDispatch<any>();
  const { userData } = useSelector(selectCommon);


  //State Values
  const [error, setError] = useState('');
  const [verifiedCode, setVerifiedCode] = useState('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isMFATotp, setIsMFATotp] = useState(false);

  //useEffect
  useEffect(() => {
    if (Object.keys(userData).length) {
      if (userData?.accessToken) login(userData);
      const route = goToRoute(userData);
      navigate(route);
    }
  }, [userData]);

  useEffect(() => {
    getMFADetails();
  }, []);

  // Methods
  const getMFADetails = async () => {
    const mfaPreference = await getMFASettings(userEmail);
    if (mfaPreference?.preferredMfaType === 'TOTP') {
      setIsMFATotp(true);
    }
  };

  //Verification Code Input
  const verifiedCodeChange = (event) => {
    const inputValue = event.target.value;
    // Validate input
    if (/^\d{6}$/.test(inputValue)) {
      setError('');
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
      setError('Please enter a valid 6-digit code.');
    }
    setVerifiedCode(inputValue);
  };

  const verifyOTPWithLogin = async () => {
    try {
      const { isSignedIn, nextStep } = await confirmSignIn({
        challengeResponse: verifiedCode
      });
      if (isSignedIn && nextStep?.signInStep == 'DONE') {
        const { idToken } = await getAuthenticatedUser();
        const payload = {
          idToken: idToken
        };
        dispatch(tokenExchange(payload));
      } else {
        setError('Please enter a valid 6-digit code.');
      }
    } catch (err) {
      showErrorMessage(err.message, {
        position: 'top-right'
      });
    }
  };

  //back to login
  const goBackToLogin = () => {
    toCheckLoginFrom(false, '');
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
            {t('mfaVerification')}
          </Typography>
          <Typography
            className="textWeightRegular"
            sx={{ mt: 2 }}
            variant={'body2'}
          >
            {isMFATotp ? t('mfaTotpSubText') : t('mfaEmailSubText')}
          </Typography>
        </Box>

        <Box sx={{ mt: 15 }}>
          <Box className="mt-20">
            <Box className="w-100">
              <TextField
                maxWidth={100}
                name="passcode"
                defaultValue={null}
                label={'Verification Code'}
                type={'text'}
                id="passcode"
                value={verifiedCode}
                placeholder={'Enter verification code'}
                onChange={verifiedCodeChange}
                inputProps={{
                  pattern: '^[0-9]{6}$',
                  title: 'Please enter a 6-digit number',
                  minLength: 6,
                  maxLength: 6
                }}
              />
              {error && (
                <Box className="d-flex mt-4" style={{ color: 'red' }}>
                  {error}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 10, mb: 20 }} className="flex-column-center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
            btnText={t('SUBMIT')}
            onClick={verifyOTPWithLogin}
            className="w-100"
            disabled={disabledButton}
          ></Button>
          <Box sx={{ mt: 5 }} className="flex-basic-center">
            <Link
              sx={{ pr: 1 }}
              className="cursorPointer"
              onClick={goBackToLogin}
            >
              <Typography className="textweight" variant="body1">
                {t('backToLogin')}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default MFAVerification;
