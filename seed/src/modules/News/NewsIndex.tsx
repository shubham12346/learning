import { Box } from '@mui/system';
import NewsHeader from './component/NewsHeaders';
import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getNewsBookmarkedStatus,
  getNewsCategoryList,
  getNewsDeBookmarked,
  getNewsFeedsBookmark,
  getNewsFeedsLastRead,
  getNewsFeedsLatest,
  getUpdatedLastReadNews
} from './api/newsApi';
import { NEWSTYPE } from 'src/shared/constants/constants';
import { NewsType } from './model/newsTypes';
import NewsFeedLatest from './component/NewsFeedLatest';
import LastReadAndBookmarkedNews from './component/LastReadAndBookmarkedNews';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { filters } from './model/newsTypes';
import { convertIntoFiltersOptionsArrayType } from './component/utils';

let newsSearchDebounce = null;
const News = () => {
  //const
  const { t } = useTranslation('newsFeeds');

  //state variables
  const [NewsFeedsLatest, setNewsFeedsLatest] = useState<NewsType>();
  const [NewsFeedsLastRead, setNewsFeedsLastRead] = useState<NewsType>();
  const [NewsFeedsBookmark, setNewsFeedsBookmark] = useState<NewsType>();
  const [isNewsListLoading, setNewsListloading] = useState(false);
  const [NewsAgencyList, setNewsAgencyList] = useState<any>();
  const [NewsCategoryList, setNewsCategoryList] = useState<any>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<filters>();
  const [isBookmarkListloading, setBookmarkListloading] = useState(false);
  const [isApiCalling, setApiCalling] = useState<Boolean>(false);

  //useEffect
  useEffect(() => {
    fetchNewsAgencyList();
    fetchNewsData();
  }, []);

  // applying filters on the news
  useEffect(() => {
    fetchNewsFeedLatestData();
  }, [filters]);

  //methods
  const fetchNewsData = () => {
    fetchNewsFeedLastReadData();
    fetchNewsFeedBookmarkData();
  };

  //getgetNewsAgencyList
  const fetchNewsAgencyList = async () => {
    const respData = await getNewsCategoryList();
    const newsCategory = respData?.agencies?.map((item) => {
      return {
        newsCategory: item?.newsCategory,
        label: item.displayName,
        id: item.id,
        value: item.name
      };
    });
    setNewsAgencyList(newsCategory);
  };

  //get news latest
  const fetchNewsFeedLatestData = async () => {
    const newsAgencyAndCategoryString =
      convertingFiltersObjectArrayToString(filters);
    fetchFilteredNews(
      searchKeyword,
      newsAgencyAndCategoryString?.newsAgency,
      newsAgencyAndCategoryString?.newsCategory
    );
  };

  //get news last-read
  const fetchNewsFeedLastReadData = async () => {
    setBookmarkListloading(true);
    const respData = await getNewsFeedsLastRead(NEWSTYPE.LASTREAD);
    setNewsFeedsLastRead(respData?.news);
    setBookmarkListloading(false);
  };

  //get news bookmarked
  const fetchNewsFeedBookmarkData = async () => {
    setBookmarkListloading(true);
    const respData = await getNewsFeedsBookmark(NEWSTYPE.BOOKMARK);
    setNewsFeedsBookmark(respData?.news);
    setBookmarkListloading(false);
  };

  //bookmarked news
  const fetchNewsBookmarkedStatus = async (
    newsId: string,
    isbookmarked: boolean
  ) => {
    if (isApiCalling) {
      return;
    }
    setApiCalling(true);
    if (isbookmarked) {
      try {
        const respData = await getNewsDeBookmarked(newsId);
        if (respData?.message === t('newsDeBookmaredSuccess')) {
          showSuccessMessage(t('newsDeBookmaredSuccess'), '', {
            position: 'top-right'
          });
          fetchNewsData();
          fetchNewsFeedLatestData();
        }
      } catch (error) {
        showErrorMessage(t('newsDeBookmaredError'), {
          position: 'top-right'
        });
      } finally {
        setApiCalling(false);
      }
    } else {
      try {
        const respData = await getNewsBookmarkedStatus(newsId);
        if (respData?.message === t('newsBookmaredSuccess')) {
          showSuccessMessage(t('newsBookmaredSuccess'), '', {
            position: 'top-right'
          });
          fetchNewsData();
          fetchNewsFeedLatestData();
        }
      } catch (error) {
        showErrorMessage(t('newsBookmaredError'), {
          position: 'top-right'
        });
      } finally {
        setApiCalling(false);
      }
    }
  };

  //Last Read news
  const getLastReadNews = async (newsId) => {
    await getUpdatedLastReadNews(newsId);
    fetchNewsFeedLastReadData();
  };

  // handle searched text
  const handleSearchText = (e) => {
    const searchText = e.target.value;
    setSearchKeyword(searchText);
    clearTimeout(newsSearchDebounce);
    const newsAgencyAndCategoryString =
      convertingFiltersObjectArrayToString(filters);
    if (searchText.length >= 3 || searchText.length === 0) {
      newsSearchDebounce = setTimeout(() => {
        fetchFilteredNews(
          searchText.trim(),
          newsAgencyAndCategoryString?.newsAgency,
          newsAgencyAndCategoryString?.newsCategory
        );
      }, 500);
    }
  };

  // applied filters
  const handleApplyFilters = (appliedFilter: filters) => {
    if (appliedFilter?.newsAgency?.length > 0) {
      let createNewsCategoryList: any = convertIntoFiltersOptionsArrayType(
        appliedFilter?.newsAgency
      );
      setNewsCategoryList(createNewsCategoryList);
      setFilters({
        newsAgency: appliedFilter.newsAgency,
        newsCategory: appliedFilter.newsCategory
      });
    } else {
      setFilters({
        newsAgency: appliedFilter.newsAgency,
        newsCategory: []
      });
    }
  };

  // fetch applied filter news
  const fetchFilteredNews = async (
    searchKeyword: string,
    newsAgency: string,
    newsCategory: string
  ) => {
    setNewsListloading(true);
    const respData = await getNewsFeedsLatest(NEWSTYPE.LATEST, {
      searchKeyword: searchKeyword,
      agency: newsAgency,
      newsCategory: newsCategory
    });
    setNewsFeedsLatest(respData?.news);
    setNewsListloading(false);
  };

  const convertingFiltersObjectArrayToString = (filters) => {
    let newsAgency = '';
    let newsCategory = '';
    if (filters?.newsAgency) {
      newsAgency = filters?.newsAgency
        ?.map((item: any) => item?.value)
        .join(',');
    }
    if (filters?.newsCategory) {
      newsCategory = filters?.newsCategory
        ?.map((item: any) => item?.value)
        .join(',');
    }
    return { newsAgency, newsCategory };
  };

  return (
    <Container maxWidth="xl" className="newsScreen">
      <NewsHeader
        onFilterChange={handleApplyFilters}
        showFilters={true}
        newsAgencyList={NewsAgencyList}
        newsCategoryList={NewsCategoryList}
        searchKeyword={searchKeyword}
        handleSearchKeyword={handleSearchText}
      />
      <Box sx={{ mt: 6 }}>
        <Grid spacing={8} container>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={8}>
            <NewsFeedLatest
              updateLatestNewsFeed={fetchNewsBookmarkedStatus}
              newsFeedsLatest={NewsFeedsLatest}
              getLastReadNews={getLastReadNews}
              isNewsListLoading={isNewsListLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
            <LastReadAndBookmarkedNews
              NewsFeedsBookmark={NewsFeedsBookmark}
              NewsFeedsLastRead={NewsFeedsLastRead}
              updateLastNewsFeed={fetchNewsBookmarkedStatus}
              isNewsListLoading={isBookmarkListloading}
              getLastReadNewsFromBookmark={getLastReadNews}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default News;
