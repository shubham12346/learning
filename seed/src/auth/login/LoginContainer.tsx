import {
  Box,
  Container,
  Typography,
  Link,
  useMediaQuery,
  useTheme
} from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LoginForm from './LoginForm';
import Footer from 'src/core/footer/Footer';
import { useTranslation } from 'react-i18next';
import { AVERY_HELP_Link } from 'src/shared/constants/constants';
import MFAVerification from './MFAVerification';
import { useState } from 'react';

const Login = () => {
  //const
  const theme = useTheme();
  const { t } = useTranslation('english');
  const extraSmallDevice = useMediaQuery(theme.breakpoints.down('md'));

  //state variables
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  //methods
  const toCheckLoginForm = (isLogin, email) => {
    setUserEmail(email);
    if (isLogin) {
      setIsLoginForm(true);
    } else {
      setIsLoginForm(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      className="loginWrapper background-login-image bg-position-lg"
    >
      <Box
        className={
          extraSmallDevice
            ? 'displayNone flex-basic-space-between p-fixed header-help'
            : 'flex-basic-space-between p-fixed header-help'
        }
      >
        <Link className="d-flex" href={AVERY_HELP_Link} target="_blank">
          <Typography className="textsemiWeight mr-5 " variant="body1">
            {t('getHelp')}
          </Typography>
          <HelpOutlineOutlinedIcon />
        </Link>
      </Box>
      <Container className="containerCenter" maxWidth="md">
        {isLoginForm ? (
          <MFAVerification
            userEmail={userEmail}
            toCheckLoginFrom={toCheckLoginForm}
          />
        ) : (
          <LoginForm toCheckLoginFrom={toCheckLoginForm} />
        )}
      </Container>
      <Footer />
    </Container>
  );
};

export default Login;
