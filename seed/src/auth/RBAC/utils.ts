import jwt_decode from 'jwt-decode';

import { ORGANIZATION_ROLE_ENUM } from 'src/shared/constants/constants';
import REGVERS_ADMIN from './permissions/RegversAdmin.json';
import PARTNER_ADMIN from './permissions/PartnerAdmin.json';
import PRIMARY_ADMIN from './permissions/PrimaryAdmin.json';
import REGVERS_ADMIN_LOGIN_AS from './permissions/RegversAdminLoginAs.json';
import PARTNER_ADMIN_LOGIN_AS from './permissions/PartnerAdminLoginAs.json';
import SECONDARY_ADMIN from './permissions/SecondaryAdmin.json';
import USER from './permissions/User.json';
export interface ModuleActionI {
  actionId: number;
  actionUrl: string;
  action: string;
  roleIsActive: boolean;
}
export interface ModulePermissionsI {
  modulePageUrl: string;
  moduleName: string;
  actions?: ModuleActionI[];
}
export interface AuthorizedModuleI {
  permissions: ModulePermissionsI[];
}

export const AuthorizedModuleDefault = {
  permissions: [
    {
      modulePageUrl: '',
      moduleName: ''
    }
  ]
};

// Check page access
export const checkPageAccess = (
  path: string,
  permittedPages: ModulePermissionsI[]
) => {
  let isUserAuthorised = false;
  let url = path.replace(/\//g, '');
  let allowedActionsName = [];

  // If permittedPages exists
  if (permittedPages?.length > 0) {
    isUserAuthorised =
      permittedPages.find((page) => page.modulePageUrl === url) != undefined;

    permittedPages.forEach((element) => {
      // If Url exists
      if (element?.modulePageUrl === url && element?.actions?.length > 0) {
        // If Action exists
        element?.actions?.forEach((item) => {
          allowedActionsName.push(item?.actionUrl);
        });
      }
    });
  }
  return {
    isUserAuthorised,
    allowedActionsName
  };
};

// GET permissions based on Role
export const Permissions = {
  [ORGANIZATION_ROLE_ENUM.ADMINISTRATION_ADMIN]: REGVERS_ADMIN,
  [ORGANIZATION_ROLE_ENUM.PARTNER_ADMIN]: PARTNER_ADMIN,
  [ORGANIZATION_ROLE_ENUM.BUSINESS_PRIMARY_ADMIN]: PRIMARY_ADMIN,
  [ORGANIZATION_ROLE_ENUM.BUSINESS_SECONDARY_ADMIN]: SECONDARY_ADMIN,
  [ORGANIZATION_ROLE_ENUM.REGVERS_ADMIN_LOGIN_AS]: REGVERS_ADMIN_LOGIN_AS,
  [ORGANIZATION_ROLE_ENUM.PARTNER_ADMIN_LOGIN_AS]: PARTNER_ADMIN_LOGIN_AS,
  [ORGANIZATION_ROLE_ENUM.USER]: USER
};

// Check user role and return permission
export const getUserAuthority = async (userData) => {
  let role = '';
  if ('impersonation' in userData) {
    role =
      userData.authorities[0].role ==
      ORGANIZATION_ROLE_ENUM.ADMINISTRATION_ADMIN
        ? ORGANIZATION_ROLE_ENUM.REGVERS_ADMIN_LOGIN_AS
        : ORGANIZATION_ROLE_ENUM.PARTNER_ADMIN_LOGIN_AS;
  } else {
    role = userData?.authorities[0].role;
  }
  const permissions = Permissions[role];
  return {
    role,
    permissions
  };
};

// set user data to local store
export const setUserDataToLocalStore = async (
  payload: any,
  fusionOne = false
) => {
  console.log('fusion1', fusionOne);
  const decodedData: any = jwt_decode(payload.token);
  const userAuthority = await getUserAuthority(decodedData);
  let permissions = fusionOne
    ? {
        permissions: [
          ...userAuthority?.permissions?.permissions,
          {
            modulePageUrl: 'data-copilot',
            moduleName: 'data-copilot',
            actions: []
          }
        ]
      }
    : {
        permissions: [...userAuthority?.permissions?.permissions]
      };

  const userData = {
    ...decodedData,
    onboardingStatus: payload.onboardingStatus,
    accessToken: payload.token,
    role: userAuthority.role,
    authrizedModules: permissions
  };

  localStorage.setItem('accessToken', payload.token);
  localStorage.setItem('userRoles', userAuthority.role);
  localStorage.setItem('authrizedModules', JSON.stringify(permissions));
  localStorage.setItem('userId', payload.userUid);
  localStorage.setItem('userData', JSON.stringify(userData));
  return userData;
};
