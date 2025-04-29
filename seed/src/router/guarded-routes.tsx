import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthguardContext';
import * as ROUTES from '../shared/constants/routes';
import { checkPageAccess } from 'src/auth/RBAC/utils';

interface IGuardedRouteProps {
  component: any;
  path: string;
}

export const GuardedRoute = ({
  component: RouteComponent,
  path
}: IGuardedRouteProps) => {
  const { accessToken, logout, authorizedModules } = useAuth();

  const checkAccess = checkPageAccess(path, authorizedModules?.permissions);

  // Logic TODO
  // to be added  && checkAccess.isUserAuthorised
  if (accessToken && checkAccess.isUserAuthorised) {
    return <RouteComponent actions={checkAccess.allowedActionsName} />;
  } else if (accessToken) {
    return <Navigate to={ROUTES.ERROR_PAGE} replace />;
  } else {
    logout();
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
};
