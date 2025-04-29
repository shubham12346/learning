import { Box, useTheme } from '@mui/material';
import HeaderButtons from './buttons/HeaderButtons';
import HeaderUserbox from './user-box/HeaderUserbox';
import LoginFormLogo from '../../assets/svg/avery_logo_new.svg';
import { useSelector } from 'react-redux';
import { selectCommon } from 'src/modules/common/services/common.service';

export const ROLE_LIST = [
  'partner-admin-login-as',
  'administration-admin-login-as'
];

const TopNavBar = () => {
  const theme = useTheme();
  const { userData } = useSelector(selectCommon);

  return (
    <Box
      className={
        theme.palette.mode === 'dark'
          ? 'HeaderWrapperDarkTheme HeaderWrapper'
          : 'HeaderWrapperLightTheme HeaderWrapper'
      }
      display="flex"
      alignItems="center"
    >
      <Box>
        <img src={LoginFormLogo} width={165} />
      </Box>
      <Box className="flex-basic-center">
        <HeaderButtons userData={userData} />
        <Box sx={{ mr: 0.5 }} className="topNavBarDivider"></Box>
        <HeaderUserbox userData={userData} />
      </Box>
    </Box>
  );
};

export default TopNavBar;
