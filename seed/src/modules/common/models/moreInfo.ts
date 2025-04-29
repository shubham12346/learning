export interface GroupsInfo {
  groupName: string;
  roleDisplayName: string;
}
export interface organizationsInfo {
  onboardedOn: string;
  orgName: string;
  orgUid: number;
}

export interface InfoModal {
  orgName?: string;
  status?: string;
  orgType?: string;
  onboardedOn?: string;
  name?: string;
  email?: string;
  fullName?: string;
  organizationsUnderIt?: organizationsInfo[];
  groups?: GroupsInfo[];
}

export interface GroupsMoreInfo {
  selectedValue: any;
  data: InfoModal;
  moreInfoTypes: string;
  open: boolean;
  handleClose: () => void;
  modalTitle?: string;
  organizationName?: string;
  isPartnerTabActive?: boolean;
}
