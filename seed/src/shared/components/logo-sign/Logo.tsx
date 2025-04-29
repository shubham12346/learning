import { Container } from '@mui/material';
import LoginFormLogo from '../../../assets/svg/avery_logo_new.svg';

export const Logo = () => {
  return (
    <img width={'160px'} className="logoIMG" src={LoginFormLogo} alt="Logo" />
  );
};
