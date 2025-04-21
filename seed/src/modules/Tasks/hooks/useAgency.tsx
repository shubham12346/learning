import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { getAgencyList } from '../api/tasksApi';
import { setAgencyList } from '../services/task.service';

type props = {
  getNone?: boolean;
};
const useAgency = (props: props) => {
  const agencyList = useSelector((state: RootState) => state.tasks.agencyList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (agencyList?.length === 0) {
      setAgencyListToStore(props);
    }
  }, []);

  const setAgencyListToStore = async (props) => {
    const res = await getAgencyList(props);
    const { regulatoryOrganizations } = res;
    const filterListForAgency = regulatoryOrganizations?.map((item) => {
      return {
        label: item?.name,
        id: item?.id,
        value: item?.name
      };
    });
    dispatch(setAgencyList(filterListForAgency));
  };
};

export default useAgency;
