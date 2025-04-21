import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from 'src/shared/utils/api-request';
import { gapActivityListViewType } from '../models';

export const gapActivityRegulations = async (
  filters: gapActivityListViewType
) => {
  const res = await apiGet(
    `${APIEndPoint.detailedGapActivityView.gapActivity}${APIEndPoint.detailedGapActivityView.gapActivityListView}`,
    { params: { ...filters } }
  );
  return res?.data || {};
};
