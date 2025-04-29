import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiDelete, apiGet, apiPost } from 'src/shared/utils/api-request';
import { filterQueryTypes } from '../model/newsTypes';

// get news list
export const getNewsFeedsLatest = async (
  typeVal,
  filters: filterQueryTypes
) => {
  const res = await apiGet(`${APIEndPoint.newsFeed.news}` + typeVal, {
    params: filters
  });
  return res.data ?? [];
};

//last News
export const getNewsFeedsLastRead = async (typeVal) => {
  const res = await apiGet(`${APIEndPoint.newsFeed.news}` + typeVal);
  return res.data ?? [];
};

//bookmark News
export const getNewsFeedsBookmark = async (typeVal) => {
  const res = await apiGet(`${APIEndPoint.newsFeed.news}` + typeVal);
  return res.data ?? [];
};

//bookmark News
export const getNewsBookmarkedStatus = async (newsId) => {
  const res = await apiPost(
    `${APIEndPoint.newsFeed.news + 't/' + APIEndPoint.newsFeed.bookmark}` +
      newsId
  );
  return res.data ?? [];
};

//last read New
export const getUpdatedLastReadNews = async (newsId) => {
  const res = await apiPost(
    `${APIEndPoint.newsFeed.news + 't/' + APIEndPoint.newsFeed.lastRead}` +
      newsId
  );
  return res.data ?? [];
};

//get news agency
export const getNewsAgencyList = async () => {
  const res = await apiGet(
    `${APIEndPoint.newsFeed.news + 't/' + APIEndPoint.newsFeed.agency}`
  );
  return res.data ?? [];
};

//get  news category list
export const getNewsCategoryList = async () => {
  const res = await apiGet(
    `${APIEndPoint.newsFeed.news + 't/' + APIEndPoint.newsFeed.category}`
  );
  return res.data ?? [];
};

export const getNewsDeBookmarked = async (newsId: string) => {
  const res = await apiDelete(
    `${APIEndPoint.newsFeed.news}t/${APIEndPoint.newsFeed.bookmark}${newsId}`
  );
  return res.data ?? [];
};
