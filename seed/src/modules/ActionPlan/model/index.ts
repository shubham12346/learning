import { SelectChangeEvent } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, ReactNode } from 'react';

export interface ActionPlanProps {
  isShowLoader: boolean;
  generatedActionPlanDetail: any;
  getUpdatedActionPlanDetails: any;
  actions: string[];
  taskListLoader: boolean;
}

export interface FilterAndFileUploadRedirectionTypes {
  isShowTotalCount: boolean;
  totalTasksCount?: number;
  totalNumberOfTaskCompleted?: number;
  actions?: string[];
  isActionPlanSaved?: boolean;
  regId?: string;
  actionId?: string;
  selectedFilter: string;
  handleFilterChange?: ((
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => void) &
    FormEventHandler<HTMLLabelElement> &
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
