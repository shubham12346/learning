import { Box, Typography } from '@mui/material';
import { NewsType } from '../model/newsTypes';
import { customInternationDate } from 'src/shared/utils/utils';

const VerticalNewsCard = (props: NewsType) => {
  //const
  const {
    description,
    id,
    imgUrl,
    isBookmarked,
    newsUrl,
    publishDate,
    newsCategory,
    title,
    isNewsBookmarked,
    getLastReadNews
  } = props;

  //methods
  const gotToNewDetails = (newsId) => {
    window.open(newsUrl, '_blank');
    getLastReadNews(newsId);
  };

  const toggleBookmark = (newsId, isbookmarked) => {
    isNewsBookmarked(newsId, isbookmarked);
  };

  return (
    <Box className="flex-column-start verticalCard">
      <Box className="p-relative w-100">
        <Box
          className="imgBackSection"
          sx={{ background: `url(${imgUrl})` }}
        ></Box>

        <Box
          sx={{ px: 4, pb: 2 }}
          className=" p-absolute tags flex-basic-space-between flex-wrap "
        >
          <Box className="d-flex mb-2">
            {newsCategory?.map((ele) => {
              return (
                <Typography
                  key={ele}
                  variant="body2"
                  className="vcardTag mr-12"
                >
                  {ele}
                </Typography>
              );
            })}
          </Box>
          <Box
            className={`bookMarkNews flex-basic-center cursorPointer ${
              isBookmarked ? 'bookmarked' : 'unBookmarked'
            }`}
            onClick={() => toggleBookmark(id, isBookmarked)}
          >
            <span className={'icon-ic_bookmark'}></span>
          </Box>
        </Box>
      </Box>
      <Box className="mt-16">
        <Typography variant="body2" className="textWeightRegular dateColor">
          {customInternationDate(publishDate)}
        </Typography>
        <Typography
          variant="body1"
          className="textsemiWeight mt-12 newsTextTruncate cursorPointer"
          onClick={() => gotToNewDetails(id)}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'rgba(18, 20, 51, 0.90)' }}
          className="mt-4 textWeightRegular newsTextTruncate"
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default VerticalNewsCard;
