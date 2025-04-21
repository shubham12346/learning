export type taskHeaderType = {
  isMoreInfo?: boolean;
  taskTitle: string;
  riskStatus: string;
  actions: any[];
  handleDelete: (e: any) => void;
  taskStatus: {
    handleOptionChange: (e: React.MouseEvent) => void;
    selectedStatus: { id: string; label: string };
    options: { id: string; displayName: string }[];
  };
  titleTags: { title: string; value: string }[];
  handleEdit?: () => void;
};

export type actionPlanStatusType = 'SAVE' | 'DISCARD' | 'REJECTED';

export type saveEditGapTaskDetailsType = {
  taskName?: string;
  gapAnalysisRemediation?: string;
  revisedPolicy?: string;
  targetDate?: any;
  ownerUid?: string;
  taskStatusId?: string;
};
