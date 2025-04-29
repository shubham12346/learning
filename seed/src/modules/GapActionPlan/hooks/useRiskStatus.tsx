import { useEffect } from 'react';
import { riskStatusLevelDropdown } from '../api/gapActionPlanApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';

const useRiskStatus = () => {
  const RiskStatusOptionsStoredInRedux = useSelector(
    (state: RootState) => state.gapAnalysis.riskStatusLevelOptions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (RiskStatusOptionsStoredInRedux?.length === 0) {
      fetchRiskStatus();
    }
  }, []);

  const fetchRiskStatus = async () => {
    const res = await riskStatusLevelDropdown();
    const options = res?.map((item) => {
      return { id: item?.id, value: item?.id, label: item?.displayName };
    });
    dispatch({
      type: 'gapAnalysisSlice/setRiskLevelOptions',
      payload: options
    });
  };
};

export default useRiskStatus;
