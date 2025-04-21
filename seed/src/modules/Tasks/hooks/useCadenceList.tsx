import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { getCadenceDropDownOptions} from '../api/tasksApi';

const useCadenceList = () => {
  const cadenceDropdown = useSelector(
    (state: RootState) => state?.tasks?.cadenceDropDown
  );
  const dispatch = useDispatch();

  const fetchCadenceOptions = async () => {
    const cadenceOptions = await getCadenceDropDownOptions(); 
    dispatch({ type: 'tasks/addCadenceDropDown', payload: cadenceOptions });
  };

  useEffect(() => {
    if (!cadenceDropdown?.length) {
        fetchCadenceOptions();
    }
  }, []);
};

export default useCadenceList;
