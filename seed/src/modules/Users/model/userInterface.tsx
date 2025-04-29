export const UserInitialState = {
  users: [],
  pager: {
    totalItems: 0,
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalPages: 0
  }
};

export type groupData = {
  fullname: string;
  email: string;
  groups: groupNameData[];
  roles: groupRoleData[];
};

export type groupNameData = {
  groupId: number;
  groupName: string;
  groupDetails: string;
};

export type groupRoleData = {
  id: number;
  name: string;
  displayName: string;
  description: string;
};

//To do
export type UserListData = {
  organization: OrganizationDataType;
  users: UserDataType;
  pager: {
    totalItems: number;
    currentPage: number;
    limit: number;
    startIndex: number;
    totalPages: number;
  };
};

export type OrganizationDataType = {
  id: string;
  uid: string;
  name: string;
};

export type UserDataType = {
  userUid: string;
  fullName: string;
  email: string;
  onboardedOn: string;
  status: string;
  groups: [
    {
      groupId: string;
      groupName: string;
      roleId: string;
      roleName: string;
      roleDisplayName: string;
    }
  ];
};
