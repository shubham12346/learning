import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet } from 'src/shared/utils/api-request';
import { BarGraph, EnforcementActionAPIArguments } from '../model/fineTypes';
import { DEFAULT_YEAR } from '../component/contants';

// agency list api
export const getAgenciesList = async () => {
  const res = await apiGet(APIEndPoint.fines.agencyList);
  return res.data ?? [];
};

// bar graph data api
export const getFineAmountForBarGraph = async (queries?: BarGraph) => {
  const res = await apiGet(APIEndPoint.fines.fine_Amount, {
    params: { ...queries }
  });
  return res.data ?? [];
};

// donut graph data api
export const getFineDeatilsForDonutGrap = async (queries?: BarGraph) => {
  const res = await apiGet(APIEndPoint.fines.enforcement_action, {
    params: { ...queries }
  });
  return res.data ?? [];
};

// Enforcement table data
export const getEnforcementActionsFines = async (
  args: EnforcementActionAPIArguments
) => {
  const res = await apiGet(APIEndPoint.fines.fine, {
    params: {
      ...args,
      year: (args.year ??= DEFAULT_YEAR)
    }
  });
  return res.data;
};

// year list options
export const getYearListOptions = async () => {
  const res = await apiGet(
    `${APIEndPoint.fines.enforcement_action}${APIEndPoint.fines.year}`
  );
  return res.data ?? [];
};

// fine list options
export const getFineListOptions = async () => {
  const res = await apiGet(
    `${APIEndPoint.fines.enforcement_action}${APIEndPoint.fines.fine_range}`
  );
  return res.data ?? [];
};
