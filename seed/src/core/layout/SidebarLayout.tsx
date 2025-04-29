import { FC, ReactNode, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

// components
import Sidebar from '../side-bar/Sidebar';
import TopNavBar from '../top-navbar/TopNavBar';

// methods
import {
  selectCommon,
  setAfterLoginFlag
} from 'src/modules/common/services/common.service';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'src/providers/AuthguardContext';
import { goToRoute } from 'src/auth/login/Utils';
import { RootState } from 'src/store/reducer';
import { DATA_COPILOT } from 'src/shared/constants/routes';
import ToursIndex from 'src/modules/Tours/ToursIndex';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const TourRoles = ['business-secondary-admin', 'business-primary-admin'];

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();
  const { userData, afterLogin } = useSelector(selectCommon);
  const dispatch = useDispatch<any>();

  const { login } = useAuth();
  const navigate = useNavigate();
  const fusion1 = useSelector((state: RootState) => state.common.fusion1);

  const handleNavigation = () => {
    if (!afterLogin) {
      const route = goToRoute(userData);
      navigate('../' + route, { replace: true });
      dispatch(setAfterLoginFlag());
    }
  };

  // Impersonate User
  useEffect(() => {
    let userToken = localStorage.getItem('accessToken');
    if (Object.keys(userData)?.length && userToken?.length > 1) {
      if (userData?.accessToken) login(userData);

      handleNavigation();
    }
  }, [userData]);

  useEffect(() => {
    if (fusion1 === 'copilot') {
      navigate(`${DATA_COPILOT}`, {
        replace: true,
        state: { fromFusion1: true }
      });
    }
  }, [fusion1]);

  return (
    <Box
      className={
        theme.palette.mode === 'dark'
          ? 'layoutbox MuiPageTitlewrapperDark p-relative screenSize'
          : 'layoutbox MuiPageTitlewrapperLight p-relative screenSize '
      }
    >
      <ToursIndex />
      <TopNavBar></TopNavBar>
      <Sidebar />
      <Box
        className="main"
        sx={{
          pt: `${theme.header.height}`,
          [theme.breakpoints.up('md')]: {
            ml: `${theme.sidebar.width}`
          }
        }}
      >
        <Box sx={{ mb: 7, mx: 3, px: 5 }} className="">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
