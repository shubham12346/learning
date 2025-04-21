import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { taskTypeDropDownOptions } from '../api/tasksApi';

const useTaskTypesOptions = () => {
  const taskDropdown = useSelector(
    (state: RootState) => state?.tasks?.taskDropDown
  );
  const dispatch = useDispatch();

  const fetchTaskOptions = async () => {
    const res = await taskTypeDropDownOptions();
    const taskOptions = res?.map((item) => {
      return {
        id: item?.name,
        value: item?.name,
        label: item?.displayName
      };
    });
    dispatch({ type: 'tasks/addTaskDropDown', payload: taskOptions });
  };

  useEffect(() => {
    if (!taskDropdown?.length) {
      fetchTaskOptions();
    }
  }, []);
};

export default useTaskTypesOptions;
