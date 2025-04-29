export type TcompanyTableComponent = {
  handleResetInvite: (selectedValue: any) => Promise<void>;
  checkboxSelection: boolean;
  apiLoadingFlag: boolean;
  getNextPaginationData: (data: any) => Promise<void>;
  heightClassName: string;
  tenantsList: any;
};
