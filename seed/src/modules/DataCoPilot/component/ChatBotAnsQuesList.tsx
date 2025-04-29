import { Box, Avatar, Typography } from '@mui/material';
import DynamicTable from './DynamicTable';
import { stringAvatar } from '../util';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { DataCopilotAnswer } from '../model';
import ToggleComponent from './ToggleComponent';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

type Props = {
  chatBotQuestionsAnsList: any[];
  userName: string;
  handleToggle?: (value: any, id: any) => void;
  loadingAnswer: boolean;
};

const ChatBotHistoryList = ({
  chatBotQuestionsAnsList,
  userName,
  handleToggle,
  loadingAnswer
}: Props) => {
  const scrollToRef = useRef(null);
  const { t } = useTranslation('english');

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loadingAnswer]);

  return (
    <>
      {chatBotQuestionsAnsList?.length > 0 && (
        <Box className="quesAnsListView">
          {chatBotQuestionsAnsList?.map((item, index) => (
            <Box key={`${index}-${item?.id}`}>
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
                      {item?.questions}
                    </Typography>
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

                <Box className="w-100">
                  <Box>
                    <Box className="flex-basic-space-between mb-20">
                      <Box
                        sx={{ mb: 4 }}
                      >{`Below is the information you asked for.`}</Box>

                      <ToggleComponent
                        toggles={[
                          { content: 'Text', value: 'text' },
                          { content: 'Table', value: 'table' }
                        ]}
                        view={item?.responseType}
                        handleViewChange={(e, v) => {
                          handleToggle(v, item?.id);
                        }}
                        defaultValue="table"
                      />
                    </Box>
                  </Box>

                  {item?.responseType === 'text' ? (
                    <ReactMarkdown>
                      {item?.summary || t('dataCopilot.noSummaryFound')}
                    </ReactMarkdown>
                  ) : (
                    <DynamicTable tableData={item?.answers} />
                  )}
                  <Box ref={scrollToRef}> </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default ChatBotHistoryList;
