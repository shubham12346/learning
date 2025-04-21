import { createContext, useContext, useState, useEffect } from 'react';
import { AuthProviderType } from './models/AuthguardContextType';
import { Amplify } from 'aws-amplify';
import { AWS_EXPORTS } from 'src/shared/utils/aws-config';
import { useDispatch } from 'react-redux';
import { clearResults } from 'src/modules/common/services/common.service';
import {
  AuthorizedModuleDefault,
  AuthorizedModuleI
} from 'src/auth/RBAC/utils';
import { signOut } from 'aws-amplify/auth';

export const useAuthProvider = () => {
  const dispatch = useDispatch();
  // State Values
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || ''
  );
  const [roles, setUserRoles] = useState(
    localStorage.getItem('userRoles') || ''
  ); // TODO:: Update user roles on change of redux value

  const [authorizedModules, setAuthorizedModules] = useState<AuthorizedModuleI>(
    JSON.parse(localStorage.getItem('authrizedModules')) ||
      AuthorizedModuleDefault
  );
  // Methods
  const login = (userData) => {
    setAccessToken(userData?.accessToken);
    setAuthorizedModules(userData?.authrizedModules);
    setRoles(userData?.role);
  };

  // Methods
  const updateAuthorizedModules = (authrizedModules: AuthorizedModuleI) => {
    setAuthorizedModules(authrizedModules);
  };

  const logout = () => {
    signOut();
    localStorage.clear();
    dispatch(clearResults());
    setAccessToken('');
  };
  const setRoles = (userRoles: string) => {
    setUserRoles(userRoles);
  };

  return {
    accessToken,
    roles,
    login,
    logout,
    authorizedModules,
    updateAuthorizedModules,
    setRoles
  };
};
const defaultAuthContext = {};

const AuthContext = createContext<AuthProviderType>(defaultAuthContext as any);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const auth = useAuthProvider();

  useEffect(() => {
    Amplify.configure(AWS_EXPORTS);
  }, []);

  return (
    <AuthContext.Provider value={auth as any}>{children}</AuthContext.Provider>
  );
};
