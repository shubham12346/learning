import { useEffect } from 'react';
import { getUserList } from 'src/modules/Users/apis/UserApis';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';

const useOwnerList = () => {
  const ownerList = useSelector(
    (state: RootState) => state.gapAnalysis.ownerList
  );
  const dispatch = useDispatch();

  const fetchOwnerList = async () => {
    const res = await getUserList({});
    const userList = res?.users?.map((item) => {
      return {
        userUid: item?.userUid,
        fullName: item?.fullName
      };
    });

    dispatch({
      type: 'gapAnalysisSlice/setOwnersListOptions',
      payload: userList
    });
  };

  useEffect(() => {
    if (ownerList?.length == 0) {
      fetchOwnerList();
    }
  }, []);
};

export default useOwnerList;
