import { useEffect, useState } from 'react';
import { gapActionTasks } from '../api/gapActionPlanApi';

export type gapActionTaskListType = {
  regulationId?: string;
  statusId?: string;
  riskLevelId?: string;
};

export type gapTask = {
  id: string;
  owner: string;
  taskName: string;
  riskLevel: string;
  status: string;
  targetDate: string;
  regulation: string;
  taskDisplayOrder: string;
};

const useFilters = (
  gapId: string,
  deleteSuccess: string,
  saveActionPlanSaved
) => {
  const [gapAssessmentTask, setGapAssessmentTask] = useState<gapTask[] | []>(
    []
  );
  const [gapActionTaskLoader, setGapActionTaskLoader] =
    useState<boolean>(false);

  useEffect(() => {
    setGapActionTaskLoader(true);
    fetchTaskList({});
  }, [deleteSuccess]);

  const fetchTaskList = async (param: gapActionTaskListType) => {
    const res = await gapActionTasks(gapId, param);
    const taskList = res?.tasks?.map((item) => {
      return {
        id: item?.taskUid,
        taskId: item?.taskId,
        owner: item?.owner?.name,
        taskName: item?.taskName,
        riskLevel: item?.riskLevel,
        status: item?.taskStatus?.displayName,
        targetDate: item?.taskTargetDate,
        regulation: item?.regulationName,
        taskDisplayOrder: item?.taskDisplayOrder
      };
    });
    saveActionPlanSaved(res?.isActionPlanExists);
    setGapAssessmentTask(taskList);
    setGapActionTaskLoader(false);
  };

  const handleFilterUpdated = (filters) => {
    setGapActionTaskLoader(true);
    const regulationId = filters?.regulation?.map((item) => item?.id).join(',');
    const riskLevel = filters?.riskLevel?.map((item) => item?.id).join(',');
    const statusId = filters?.status?.map((item) => item?.id)?.join(',');

    const param: gapActionTaskListType = {
      regulationId: regulationId,
      statusId: statusId,
      riskLevelId: riskLevel
    };

    fetchTaskList(param);
  };

  return {
    gapAssessmentTask,
    gapActionTaskLoader,
    handleFilterUpdated,
    taskExist: gapAssessmentTask?.length
  };
};

export default useFilters;
