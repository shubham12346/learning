import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from '@mui/material';
import VerticalNewsCard from './VerticalNewsCard';
import { NewsType } from '../model/newsTypes';
import { useTranslation } from 'react-i18next';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import EmptyBookmarkImage from 'src/assets/svg/emptyStateBookmark.svg';

interface NewsFeedLatestProps {
  newsFeedsLatest: any;
  updateLatestNewsFeed?: (newsId: string, isbookmarked: boolean) => void;
  getLastReadNews: (newsId) => void;
  isNewsListLoading: boolean;
}
const NewsFeedLatest = ({
  newsFeedsLatest,
  updateLatestNewsFeed,
  getLastReadNews,
  isNewsListLoading
}: NewsFeedLatestProps) => {
  //const
  const { t } = useTranslation('newsFeeds');
  //methods
  const isNewsBookmarked = (newsId: string, isbookmarked: boolean) => {
    updateLatestNewsFeed(newsId, isbookmarked);
  };

  return (
    <Box className="newsScrollWrapper">
      <Card>
        <CardHeader
          sx={{ px: 8, pt: 8 }}
          title={
            <Box className="flex-basic-start">
              <Typography className="textweight" variant="h4">
                {t('latestNews')}
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ px: 8, pb: 8, pt: 2, minHeight: '25vh' }}>
          {isNewsListLoading ? (
            <Box className="flex-basic-center mt-200  mb-400">
              <Box className="spinnerLoading mt-200"></Box>
            </Box>
          ) : (
            <Grid spacing={8} container>
              {newsFeedsLatest?.length > 0 ? (
                <>
                  {newsFeedsLatest?.map((item: NewsType, index) => (
                    <Grid key={index} item xs={12} md={12} lg={6} xl={6}>
                      <VerticalNewsCard
                        description={item?.description}
                        id={item?.id}
                        imgUrl={item?.imgUrl}
                        isBookmarked={item?.isBookmarked}
                        isNew={item?.isNew}
                        newsUrl={item?.newsUrl}
                        publishDate={item?.publishDate}
                        newsCategory={item?.newsCategory}
                        title={item?.title}
                        isNewsBookmarked={isNewsBookmarked}
                        getLastReadNews={getLastReadNews}
                      />
                    </Grid>
                  ))}
                </>
              ) : (
                <Box className="flex-basic-center w-100 mt-100 mb-100">
                  <EmptyPlaceholder
                    imgWidth={'230'}
                    imageUrl={EmptyBookmarkImage}
                    titleText={t('noReslutFound')}
                  />
                </Box>
              )}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewsFeedLatest;
