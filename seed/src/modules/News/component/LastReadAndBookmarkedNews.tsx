import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HorizontalNewsCard from './HorizontalNewsCard';
import TabView from 'src/shared/components/tabs/Tabs';
import EmptyBookmarkImage from 'src/assets/svg/emptyStateBookmark.svg';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';

interface LastReadAndBookmarkedNewsProps {
  NewsFeedsLastRead: any;
  NewsFeedsBookmark: any;
  updateLastNewsFeed?: (newsId: string, isbookmarked: boolean) => void;
  isNewsListLoading: boolean;
  getLastReadNewsFromBookmark?: (newsId: string) => void;
}

const LastReadAndBookmarkedNews = ({
  NewsFeedsLastRead,
  NewsFeedsBookmark,
  updateLastNewsFeed,
  isNewsListLoading,
  getLastReadNewsFromBookmark
}: LastReadAndBookmarkedNewsProps) => {
  //Constants
  const { t } = useTranslation('newsFeeds');
  const tablist = [t('lastReadText'), t('bookmarked')];

  //states variables
  const [tab, setTab] = useState<number>(0);

  //methods
  const handleTabChange = (event, tabNumber: number) => {
    setTab(tabNumber);
  };

  //methods
  const isNewsBookmarked = (newsId: string, isbookmarked: boolean) => {
    updateLastNewsFeed(newsId, isbookmarked);
  };

  const renderNewsCards = (newsItems) => {
    return newsItems?.map((item, index) => (
      <Box key={index}>
        <HorizontalNewsCard
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
          getLastReadNews={getLastReadNewsFromBookmark}
        />
      </Box>
    ));
  };

  const emptyPlaceholderContent = () => {
    return (
      <Box sx={{ backgroundColor: 'white', py: 20 }}>
        <EmptyPlaceholder
          imgWidth={'230'}
          imageUrl={EmptyBookmarkImage}
          titleText={tab === 0 ? t('noLastReadNewsYet') : t('noBookmarYet')}
          subText={tab === 0 ? t('lastReadNews') : t('bookmarkSectionSubText')}
        />
      </Box>
    );
  };

  return (
    <Box className="lastReadBookmark">
      <Box className="w-100">
        <TabView tabindex={tab} onChange={handleTabChange} tablist={tablist} />
        {isNewsListLoading ? (
          <Box className="flex-basic-center mt-100">
            <Box className="spinnerLoading mt-100"></Box>
          </Box>
        ) : (
          <Box>
            {
              (() => {
                if (tab === 0 && NewsFeedsLastRead?.length > 0) {
                  return renderNewsCards(NewsFeedsLastRead);
                } else if (tab !== 0 && NewsFeedsBookmark?.length > 0) {
                  return renderNewsCards(NewsFeedsBookmark);
                } else {
                  return emptyPlaceholderContent();
                }
              })()

              // tab === 0 && NewsFeedsLastRead?.length > 0
              //   ? renderNewsCards(NewsFeedsLastRead)
              //   : tab !== 0 && NewsFeedsBookmark?.length > 0
              //   ? renderNewsCards(NewsFeedsBookmark)
              //   : emptyPlaceholderContent()
            }
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LastReadAndBookmarkedNews;
