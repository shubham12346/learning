import { Avatar, Box, Tooltip, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import { PRIMARY_COLOR } from 'src/shared/constants/constants';
import { getInitials } from 'src/shared/utils/utils';

const QuestionAns = ({
  checkToDisableAddTaskButtonOnChatbotResponse,
  handleSelectItem,
  item,
  chatBotQuesAnsResponse,
  userName
}) => {
  const { t } = useTranslation('averyAiChatBot');

  const stringAvatar = (name: string = 'User Name') => {
    return {
      sx: {
        bgcolor: PRIMARY_COLOR
      },
      children: getInitials(name)
    };
  };

  return (
    <Box>
      <Box
        sx={{ px: 32, pb: 8, pt: '22px' }}
        className="flex-basic-start chatBotQuestionSection"
      >
        <Box sx={{ mr: 5 }} className="flex-basic-center">
          <Avatar
            variant="rounded"
            alt={'user avatar'}
            {...stringAvatar(userName)}
          />
        </Box>
        <Box className="asnBox w-100">
          <Box className="p-relative">
            <Typography className="w-90" variant="body1">
              {item.questions}
            </Typography>
            <Box className="p-absolute addNewTaskBtn ">
              <Button
                variant="outlined"
                disabled={checkToDisableAddTaskButtonOnChatbotResponse(item)}
                sx={{
                  py: '0.5rem',
                  px: '1rem'
                }}
                onClick={() => {
                  handleSelectItem(item);
                }}
              >
                {t('addTaskBtn')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ px: 32, pt: 5, pb: 8 }}
        className="mb-10 flex-basic-start align-items-start chatBotAnswerSection"
      >
        <Box sx={{ mr: 5 }}>
          <Box className="usericonBox flex-basic-center">
            <Box className="icon-averyAI"></Box>
          </Box>
        </Box>
        {item?.isChecking ? (
          <Box sx={{ pl: 10 }} className="flex-basic-start">
            <Box className="dashLoader"></Box>
          </Box>
        ) : (
          <Box className="w-100">
            <Box>
              <Box className={`asnBox `}>
                <Markdown>{chatBotQuesAnsResponse?.answers}</Markdown>
              </Box>
              {chatBotQuesAnsResponse.sources && (
                <Box
                  sx={{
                    py: 2,
                    px: 4
                  }}
                  className="ansSources mt-5 mr-12 w-80"
                >
                  <Typography className="textweight" variant="body2">
                    {t('sourcesText')}
                  </Typography>
                  {chatBotQuesAnsResponse.sources?.map((item: any, index) => (
                    <Box key={`-${index}`}>
                      {item?.source_url !== null && (
                        <Tooltip title={item?.source_url} arrow>
                          <a
                            href={item?.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-ellipsis-oneline"
                          >
                            {item?.source_url}
                          </a>
                        </Tooltip>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QuestionAns;
