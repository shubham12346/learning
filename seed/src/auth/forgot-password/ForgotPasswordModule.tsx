import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from 'src/core/footer/Footer';
import Header from 'src/core/header/Header';
import { LOGIN } from 'src/shared/constants/routes';
import ForgotPasswordForm from './ForgotPasswordForm';
import SetPasswordForm from '../login/setPassword/SetPasswordForm';
import ConfirmateionScreen from '../login/setPassword/confirmationScreen';

const ForgotPasswordModule = () => {
  const [passwordStep, setPasswordStep] = useState(0);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  function backtoLogin(): void {
    navigate(LOGIN);
  }

  function goToNextStep(email = '') {
    setPasswordStep((step) => step + 1);
    setUserData({ email: email });
  }
  const rederStep = (passwordStep) => {
    switch (passwordStep) {
      case 0:
        return (
          <ForgotPasswordForm
            goToNextStep={goToNextStep}
            backtoLogin={backtoLogin}
          ></ForgotPasswordForm>
        );
      case 1:
        return (
          <SetPasswordForm
            subtitle="passwordScreen.emailId"
            isVerifictionScreen={true}
            userData={userData}
            goToNextStep={goToNextStep}
            backtoLogin={backtoLogin}
          ></SetPasswordForm>
        );
      case 2:
        return (
          <ConfirmateionScreen
            title="done"
            backtoLogin={backtoLogin}
            isVerifictionScreen={true}
            subtitle1="sussessfullyChangedMsg1"
            subtitle2="sussessfullyChangedMsg2"
          ></ConfirmateionScreen>
        );
      default:
        break;
    }
  };

  return (
    <Container maxWidth={false} className="forgotPasswordWrapper">
      <Header></Header>
      <Container
        sx={{ pt: 15, pb: 10 }}
        className="containerCenter h-100"
        maxWidth="md"
      >
        {rederStep(passwordStep)}
      </Container>
      <Footer />
    </Container>
  );
};

export default ForgotPasswordModule;
