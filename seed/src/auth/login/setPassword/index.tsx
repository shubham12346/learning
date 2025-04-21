import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Footer from 'src/core/footer/Footer';
import Header from 'src/core/header/Header';
import SetPasswordForm from './SetPasswordForm';
import { LOGIN } from 'src/shared/constants/routes';
import { useNavigate } from 'react-router';
import { getTokenStatus } from 'src/auth/apis/AuthApi';
import { useTranslation } from 'react-i18next';
import {
  InvitationStatusCard,
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/index';
import userOnboarded from '../../../assets/svg/user_onboarded.svg';
import warning from '../../../assets/svg/warning.svg';
import loginConfirmationCheckLogo from '../../../assets/svg/SuccessImage.svg';
import { resendInvitation } from 'src/modules/Users/apis/UserApis';

const SetPassword = () => {
  const { t } = useTranslation('setPassword');
  const [passwordStep, setPasswordStep] = useState(0);
  const [userData, setUserData] = useState<any>({});
  const [userEmail, setUserEmail] = useState<string>('');

  const navigate = useNavigate();
  function backtoLogin(): void {
    navigate(LOGIN);
  }

  const getTokenApiCall = async () => {
    try {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      const resp = await getTokenStatus(token);
      setUserData(resp);
    } catch (error) {
      if (error.response.data.cause == 'Invalid token') {
        setPasswordStep(3);
        showErrorMessage(
          'This link is expired, please request admin to resend invitation',
          {}
        );
      }
      if (error.response.data.cause == 'Token already verified') {
        setPasswordStep(4);
      }
      if (error.response.data.cause?.startsWith('Invitation expired')) {
        setPasswordStep(2);
        let errorMessage: string = error.response.data.cause.split(':');
        setUserEmail(errorMessage[1]?.trim());
      }
    }
  };

  const handleClick = async () => {
    if (userEmail) {
      try {
        const res = await resendInvitation(userEmail);
        showSuccessMessage(res?.message, '', {});
      } catch (error) {
        showErrorMessage(error?.response?.data?.cause || error?.message, {});
      }
    } else {
      showErrorMessage(
        'This link is expired, please request admin to resend invitation',
        {}
      );
    }
  };

  useEffect(() => {
    getTokenApiCall();
  }, []);

  async function goToNextStep() {
    setPasswordStep((step) => step + 1);
  }
  const rederStep = (passwordStep) => {
    switch (passwordStep) {
      case 0:
        return (
          <SetPasswordForm
            userData={userData}
            isVerifictionScreen={false}
            subtitle="passwordScreen.emailId"
            goToNextStep={goToNextStep}
            backtoLogin={backtoLogin}
          ></SetPasswordForm>
        );
      case 1:
        return (
          <InvitationStatusCard
            titleText={t('well_done')}
            subText={t('you_are_registerd_with_portal')}
            subText2={t('you_are_registerd_with_portal_line_2')}
            imgUrl={loginConfirmationCheckLogo}
            buttonText={'Back to Login'}
            onClickBtn={backtoLogin}
            customStyle={true}
          />
        );
      case 2:
        return (
          <InvitationStatusCard
            titleText={t('sorry')}
            subText={t('invitation_expired')}
            imgUrl={warning}
            buttonText={t('request_new_link')}
            onClickBtn={handleClick}
          />
        );
      case 3:
        return (
          <InvitationStatusCard
            titleText={t('sorry')}
            subText={t('invalid_token')}
            imgUrl={warning}
            buttonText={t('request_new_link')}
            onClickBtn={handleClick}
          />
        );
      case 4:
        return (
          <InvitationStatusCard
            titleText={t('already_exist')}
            subText={t('please_return_to_login')}
            imgUrl={userOnboarded}
            buttonText={t('Login')}
            onClickBtn={backtoLogin}
          />
        );
      default:
        break;
    }
  };
  return (
    <Container maxWidth={false} className="loginWrapper">
      <Header></Header>
      <Container sx={{ py: 10 }} className="containerCenter" maxWidth="md">
        {rederStep(passwordStep)}
      </Container>
      <Footer />
    </Container>
  );
};

export default SetPassword;
