import { useEffect, useState } from 'react';
import { gapActionPlanOverviewApi } from '../api/gapActionPlanApi';
import { useDispatch } from 'react-redux';
import { setActionPlanSaved } from '../service/gapAction.service';
const useGapOverview = (taskId: string) => {
  const dispatch = useDispatch();
  const [gapOverview, setGapOverview] = useState({
    id: '',
    date: '',
    overview: '',
    name: ''
  });

  useEffect(() => {
    fetchGapOverview();
  }, []);

  const fetchGapOverview = async () => {
    const res = await gapActionPlanOverviewApi(taskId);
    setGapOverview(res?.gapAssessment);

    if (res?.isActionPlanExists) {
      dispatch(setActionPlanSaved(true));
    }
  };
  return gapOverview;
};

export default useGapOverview;
