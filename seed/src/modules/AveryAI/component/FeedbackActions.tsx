import { Box, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type TfeedbackActions = {
  handleLike: (item, status) => void;
  handleDislike: (item, status) => void;
  response: any;
  selectedItem?: any;
  setSelectedItem?: any;
};

const FeedbackActions = (props: TfeedbackActions) => {
  const { handleDislike, handleLike, response, selectedItem, setSelectedItem } =
    props;
  const { t } = useTranslation('averyAiChatBot');
  const handleCopy = async (e, item) => {
    try {
      await navigator.clipboard.writeText(item?.answers);
      setSelectedItem(item);
      setTimeout(() => {
        setSelectedItem('');
      }, 5000);
    } catch (error) {}
  };
  return (
    <Box className="p-relative feedbackActioWrapper mb-20 mt-10">
      <Box className="flex-basic-start cursorPointer ">
        <Box
          onClick={(e) => {
            handleCopy(e, response);
          }}
          className={`mr-20 mt-22 p-4 ${
            selectedItem && selectedItem?.id === response?.id
              ? 'selectedActions'
              : ''
          }`}
        >
          <Tooltip
            title={
              selectedItem && selectedItem?.id === response?.id
                ? 'Copied'
                : t('copy')
            }
          >
            <Box className="icon-ic_copy-2 iconHeightAndWidth"> </Box>
          </Tooltip>
        </Box>

        <Box onClick={() => handleLike(response, true)} className="mr-15 mt-20">
          <Tooltip
            title={response?.detail?.isLike === true ? 'Liked' : t('like')}
          >
            <Box
              className={`p-4 ${
                response?.detail?.isLike === true ? ' selectedActions' : ''
              }`}
            >
              <Box className="icon-ic_like iconHeightAndWidth"> </Box>
            </Box>
          </Tooltip>
        </Box>
        <Box
          onClick={() => handleDislike(response, false)}
          className="mr-15 mt-20"
        >
          <Tooltip
            title={
              response?.detail?.isLike === false ? 'Disliked' : t('dislike')
            }
          >
            <Box
              className={`p-4 ${
                response?.detail?.isLike === false ? ' selectedActions' : ''
              }`}
            >
              <Box className={`icon-ic_dislike iconHeightAndWidth`}></Box>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box>
        {selectedItem && selectedItem?.id === response?.id && (
          <Box className="p-absolute copyDivTextWrapper w-25 mt-5  ">
            <Box sx={{ py: 2, px: 4 }}>
              <Typography className="copiedText">{t('copied')}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FeedbackActions;
