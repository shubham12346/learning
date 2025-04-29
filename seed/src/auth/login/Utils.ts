import { ORGANIZATION_ROLE_ENUM } from 'src/shared/constants/constants';
import * as ROUTES from '../../shared/constants/routes';

export const goToRoute = (userData) => {
  // check impersonation key is present in object
  if ('impersonation' in userData) {
    return `${ROUTES.BASEPATH}/${ROUTES.DASHBOARD}`;
  }
  if (
    userData?.role === ORGANIZATION_ROLE_ENUM.BUSINESS_PRIMARY_ADMIN &&
    userData.onboardingStatus == 'invited'
  ) {
    return ROUTES.ONBOARDING;
  } else {
    switch (userData?.role) {
      case ORGANIZATION_ROLE_ENUM.ADMINISTRATION_ADMIN:
        return `${ROUTES.BASEPATH}/${ROUTES.COMPANIES}`;
      case ORGANIZATION_ROLE_ENUM.PARTNER_ADMIN:
        return `${ROUTES.BASEPATH}/${ROUTES.COMPANIES}`;
      case ORGANIZATION_ROLE_ENUM.BUSINESS_PRIMARY_ADMIN:
      case ORGANIZATION_ROLE_ENUM.BUSINESS_SECONDARY_ADMIN:
      case ORGANIZATION_ROLE_ENUM.USER:
        return `${ROUTES.BASEPATH}/${ROUTES.DASHBOARD}`;
      default:
        break;
    }
  }
};
