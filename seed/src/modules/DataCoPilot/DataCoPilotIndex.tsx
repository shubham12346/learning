import { Box, Typography, Grid, Card } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import ChatbotStream from '../AveryAI/component/ChatbotStream';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCommon } from '../common/services/common.service';
import NoChatAveryAI from 'src/assets/svg/Avery-AI-Illustration.svg';
import { askChatBotQuestion } from './api/DataCopilot';
import { getLoggedInUserDetail } from '../Setting/api/settingAPI';
import ChatBotAndQuesList from './component/ChatBotAnsQuesList';
import ChatInputForm from './component/ChatInputForm';
import {
  getChatBotSession,
  getLeftSidePanel
} from '../AveryAI/api/averyChatBotApi';
import SidePanelWrapper from './component/SidePanelWrapper';
import useSampleQuestion from './hooks/useSampleQuetions';
import { useSampleContext } from './component/SampleQuestionContext';
import { transformSessions } from '../AveryAI/component/util';
import { DataCopilotAnswer } from './model';

const DataCoPilot = (props: any) => {
  const scrollToRef = useRef(null);
  const { t } = useTranslation('english');
  const { actions } = props;
  // hooks

  useSampleQuestion();
  //redux
  const { userData } = useSelector(selectCommon);

  const userId = userData?.userUid || '';
  //state variables

  const [chatBotQuestionsAnsList, setChatBotQuestionsAnsList] = useState<
    DataCopilotAnswer[] | []
  >([]);
  const [userName, setUserName] = useState('');
  const [streamText, setStreamText] = useState<any[]>([]);
  const [currentlyAskedQuestion, setCurrentlyAskedQuestion] = useState('');

  const [selectedChatHistory, setSelectedChatHistory] = useState({
    sessionId: ''
  });
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>();
  const [loadSidePanel, setLoadSidePanel] = useState<any[]>();

  const {
    selectedSampleQuestion,
    setLastSampleQuestionAsked,
    handleSampleQuestion
  } = useSampleContext();

  const fetchChatBotAiResponse = async (inputValue) => {
    setLoadingAnswer(true);
    setCurrentlyAskedQuestion(inputValue);
    let errorFlag = false;
    let item;
    try {
      const res = await askChatBotQuestion({
        query: inputValue,
        userId: userId,
        sessionId: selectedChatHistory?.sessionId
      });
      console.log(res);
      setStreamText(res?.llmResponse);
      item = {
        id: new Date().getTime(),
        questions: inputValue,
        answers: res?.llmResponse || '',
        sources: res?.sources || '',
        detail: '',
        status: '',
        sessionId: res?.sessionId,
        responseType: 'table'
      };
      errorFlag = false;
    } catch (err) {
      console.log('err', err);
      item = {
        id: new Date().getTime(),
        questions: inputValue,
        answers: err?.response?.data?.cause || '',
        sources: err?.sources || '',
        detail: '',
        status: '',
        sessionId: '',
        responseType: 'table'
      };
      setStreamText(err?.response?.data?.cause);
      errorFlag = true;
    } finally {
      if (!selectedChatHistory.sessionId && !errorFlag) {
        fetchSidePanelHistoryList();
      }
      if (selectedSampleQuestion?.question) {
        setLastSampleQuestionAsked(selectedSampleQuestion);
        handleSampleQuestion({ id: '', question: '' });
      }
      setCurrentlyAskedQuestion('');
      if (selectedChatHistory.sessionId && !selectedSampleQuestion?.question) {
        setChatBotQuestionsAnsList((prev) => [...prev, item]);
      } else {
        setChatBotQuestionsAnsList([item]);
      }

      setLoadingAnswer(false);
    }
  };

  //scroll to end Div
  const handleScroll = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchUserData = async () => {
    const respData = await getLoggedInUserDetail(userData?.userUid);
    setUserName(respData?.name);
  };

  // fetch chat bot session chat
  const fetchChatBotSessionChat = async (sessionId) => {
    const res = await getChatBotSession(sessionId);
    let updatedQuestionList2 = [];
    let flag: boolean = false;
    res?.chats?.forEach((element) => {
      const parseJsonAnswer = JSON.parse(element?.answer);
      let item = {
        id: element?.id,
        questions: element?.question,
        answers: parseJsonAnswer?.llmResponse,
        summary: element?.summary,
        responseType: 'table'
      };

      updatedQuestionList2.push(item);
    });

    setLoadingAnswer(flag);
    setChatBotQuestionsAnsList(updatedQuestionList2);
  };

  // fetch side panel list
  const fetchSidePanelHistoryList = async () => {
    // setLoadSidePanelList(true);
    const res = await getLeftSidePanel({ copilot: 'fusion-one' });
    const result = transformSessions(res);
    setLoadSidePanel(result);
    //crete a session and maintain it
    if (!selectedChatHistory?.sessionId) {
      let lastSessionId = res?.session[0]?.['id'];
      setSelectedChatHistory({ sessionId: lastSessionId || '' });
      fetchChatBotSessionChat(lastSessionId);
    }
  };

  // handle new chat
  const handleNewChat = () => {
    setSelectedChatHistory({ sessionId: '' });
    setChatBotQuestionsAnsList([]);
  };

  //handle toggle in response

  const handleToggle = (value, id) => {
    if (!value) return;
    setChatBotQuestionsAnsList((prev) =>
      prev?.map((item) =>
        item.id === id ? { ...item, responseType: value } : item
      )
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []); //

  useEffect(() => {
    handleScroll();
  }, [loadingAnswer]);

  useEffect(() => {
    if (selectedSampleQuestion?.question) {
      handleNewChat();
      fetchChatBotAiResponse(selectedSampleQuestion.question);
    }
  }, [selectedSampleQuestion]);

  return (
    <Box className="averyAiChatBot mt-0">
      <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
        <Typography variant={'h3'}>{t('dataCopilot.title')}</Typography>
      </Box>
      <Box className="w-100" sx={{ mt: 3 }}>
        <Grid container gap={1}>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Box className="leftPanel mr-33">
              <SidePanelWrapper
                fetchChatBotSessionChat={fetchChatBotSessionChat}
                loadingAnswer={loadingAnswer}
                selectedChatHistory={selectedChatHistory}
                setSelectedChatHistory={setSelectedChatHistory}
                handleNewChat={handleNewChat}
                fetchSidePanelHistoryList={fetchSidePanelHistoryList}
                loadSidePanel={loadSidePanel}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Card className="chatBotCard">
              {loadingAnswer ? (
                <Box sx={{ pb: 30 }} className="h-100">
                  <Box className="quesAnsListView ">
                    <ChatbotStream
                      isOnServerError={false}
                      question={currentlyAskedQuestion}
                      streamText={streamText}
                      userName={userName}
                      key={'chatResponseStreamComponent'}
                      actions={actions}
                      tableData={streamText}
                      type="copilot"
                      loading={loadingAnswer}
                    />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ pb: 30 }} className="h-100">
                  {!loadingAnswer && chatBotQuestionsAnsList?.length > 0 ? (
                    <ChatBotAndQuesList
                      chatBotQuestionsAnsList={chatBotQuestionsAnsList}
                      userName={userName}
                      handleToggle={handleToggle}
                      loadingAnswer={loadingAnswer}
                    />
                  ) : (
                    <Box className="flex-basic-center h-100 emptyPlaceHolderHeight">
                      <EmptyPlaceholder
                        imgWidth={'356'}
                        imageUrl={NoChatAveryAI}
                        titleText={t('dataCopilot.emptyTextTitle')}
                        subText={
                          <Box className="flex-direction-column mt-10 subText">
                            <Box>{t('dataCopilot.emptySubTextTitle')}</Box>
                            <Box>{t('dataCopilot.emptySubTextTitle2')}</Box>
                          </Box>
                        }
                      />
                    </Box>
                  )}
                </Box>
              )}

              <ChatInputForm
                fetchChatBotApiResponse={fetchChatBotAiResponse}
                isDisableInputFiled={loadingAnswer}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DataCoPilot;
