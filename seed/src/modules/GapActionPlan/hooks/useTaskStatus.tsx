import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskStatusOptions } from 'src/modules/Tasks/api/tasksApi';
import { RootState } from 'src/store/reducer';

export type statusType = {
  id: string;
  value: string;
  label: string;
};
const useTaskStatus = () => {
  const taskStatusStoredInRedux = useSelector(
    (state: RootState) => state.gapAnalysis.taskStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskStatusStoredInRedux?.length == 0) {
      fetchTaskStatus();
    }
  }, []);

  const fetchTaskStatus = async () => {
    const res = await getTaskStatusOptions();
    const options = res?.status?.map((item) => {
      return { id: item?.id, value: item?.id, label: item?.displayName };
    });

    dispatch({
      type: 'gapAnalysisSlice/setTaskStatusOptions',
      payload: options
    });
  };
};

export default useTaskStatus;
