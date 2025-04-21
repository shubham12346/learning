import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet, apiPut } from 'src/shared/utils/api-request';

export const getTourComponent = async () => {
  const res = await apiGet(APIEndPoint.tour.getTourComponent);
  return (await res?.data) || [];
};

export const getTourStatus = async (tourComponentId) => {
  const res = await apiGet(
    `${APIEndPoint.tour.tour}/${tourComponentId}/${APIEndPoint.tour.status}`
  );

  return res.data || [];
};

export const changeTourStatus = async (tourStatusId, stepCount) => {
  const res = await apiPut(`${APIEndPoint.tour.changeTourStatus}${true}`, {
    tourComponentId: tourStatusId,
    tourSteps: [
      {
        stepCount: stepCount
      }
    ]
  });
  return res.data || [];
};

//tour/set/status/{:setStatus}
