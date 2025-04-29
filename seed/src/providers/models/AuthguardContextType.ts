import { AuthorizedModuleI } from "src/auth/RBAC/utils";

export type AuthProviderType = {
  accessToken: string;
  roles: string[];
  login: (userData: any) => void;
  logout: () => void;
  authorizedModules:AuthorizedModuleI;
  updateAuthorizedModules: (authorizedModules:AuthorizedModuleI) => void;
  setRoles: (role: string) => void;
};
