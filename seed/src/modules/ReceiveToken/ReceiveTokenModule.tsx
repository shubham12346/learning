import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  clearResults,
  selectCommon,
  setFusionOneUserData,
  setUserData
} from '../common/services/common.service';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataToLocalStore } from 'src/auth/RBAC/utils';
import { goToRoute } from 'src/auth/login/Utils';
import { useAuth } from 'src/providers/AuthguardContext';
import { BASEPATH, DATA_COPILOT } from 'src/shared/constants/routes';

const ReceiveTokenModule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { userData } = useSelector(selectCommon);
  const { login } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fusion1Url = queryParams.get('fusion1');

  const handleMessage = async (event) => {
    console.log(' event.origin', event.origin);
    if (
      event.origin !== process.env.REACT_APP_FUSION_ONE_DOMAIN_URL ||
      !event?.data?.data?.accessToken
    ) {
      return;
    }

    try {
      const { accessToken, userId, onboardingStatus } = event?.data?.data;
      console.log('event?.data :::', event?.data);
      console.log('event?.data?.data:::', event?.data?.data);
      const payload = {
        token: accessToken,
        onboardingStatus: onboardingStatus,
        userUid: userId
      };
      setTimeout(async () => {
        const newUserData = await setUserDataToLocalStore(
          payload,
          !!fusion1Url
        );
        await dispatch(setUserData(newUserData));
      }, 1000);
    } catch (error) {
      console.error('error', error);
    }
    //}
  };

  useEffect(() => {
    // Listen for postMessage events

    window.addEventListener('message', handleMessage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    dispatch(clearResults());
    localStorage.clear();
  }, []);

  // In ReceiveTokenModule.tsx
  useEffect(() => {
    if (!Object.keys(userData).length || !userData?.accessToken) {
      return;
    }

    const navigateToPath = async () => {
      try {
        await login(userData);
        if (fusion1Url) {
          dispatch(setFusionOneUserData('copilot'));
          navigate(`/${BASEPATH}/${DATA_COPILOT}`);
        } else {
          const route = goToRoute(userData);
          navigate(`/${route}`, { replace: true });
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    };

    const timeout = setTimeout(() => {
      navigateToPath();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [userData]);

  return (
    <Box className="spinnerWrapper flex-basic-center mt-100 mb-100 ">
      <Box className="spinnerLoading "></Box>
    </Box>
  );
};

export default ReceiveTokenModule;
