import { NewsType } from '../model/newsTypes';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { customInternationDate } from 'src/shared/utils/utils';

const HorizontalNewsCard = (props: NewsType) => {
  //const
  const {
    description,
    id,
    imgUrl,
    isBookmarked,
    isNew,
    newsUrl,
    publishDate,
    newsCategory,
    title,
    isNewsBookmarked,
    getLastReadNews
  } = props;

  //methods
  const bookmarkNews = (newsId, isbookmarked) => {
    isNewsBookmarked(newsId, isbookmarked);
  };

  const gotToNewDetails = () => {
    window.open(newsUrl, '_blank');
    getLastReadNews(id);
  };

  return (
    <Box className="horizontalCard">
      <Card className="mb-32 mt-16">
        <CardContent sx={{ p: 6 }}>
          <Box className="d-flex">
            <Box className="hcardImg p-relative">
              <Box
                className="newsSmallBackImg"
                sx={{ background: `url(${imgUrl})` }}
              ></Box>
              <Box
                className="p-absolute hcardBookmark flex-basic-end"
                sx={{ width: '100%', p: 4 }}
              >
                <Box
                  className={`bookMarkNews lastRead flex-basic-center cursorPointer ${
                    isBookmarked ? 'bookmarked' : 'unBookmarked'
                  }`}
                  onClick={() => bookmarkNews(id, isBookmarked)}
                >
                  <span className={'icon-ic_bookmark'}></span>
                </Box>
              </Box>
            </Box>
            <Box className="hcardText ml-24">
              <Box className="hcardHeader d-flex align-items-center mb-18">
                <Box>
                  {newsCategory.map((ele) => {
                    return (
                      <Typography
                        key={ele}
                        sx={{ mb: newsCategory?.length > 1 ? 1 : '' }}
                        variant="body2"
                        className="hcardTag"
                      >
                        {ele}
                      </Typography>
                    );
                  })}
                </Box>

                <Typography
                  variant="body2"
                  className="textWeightRegular ml-16 dateColor"
                >
                  {customInternationDate(publishDate)}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  className="mt-12 newsTextTruncate cursorPointer"
                  onClick={gotToNewDetails}
                >
                  {title}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HorizontalNewsCard;
