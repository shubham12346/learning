import {
  Avatar,
  Box,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Button
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoChatAveryAI from 'src/assets/svg/Avery-AI-Illustration.svg';
import {
  deleteSession,
  editSessionTitle,
  getChatBotSession,
  getChatbotFeedback,
  getLeftSidePanel
} from './api/averyChatBotApi';
import Breadcrumb from 'src/shared/components/Breadcrum/Breadcrumb';
import AddTask from './component/AddTask';
import { PRIMARY_COLOR, SERVER_API_URL } from 'src/shared/constants/constants';
import { getInitials } from 'src/shared/utils/utils';
import { selectCommon } from '../common/services/common.service';
import { useSelector } from 'react-redux';
import { getLoggedInUserDetail } from '../Setting/api/settingAPI';
import LeftSidePanel from './component/LeftsidePanel';
import {
  transformSessions,
  DISABLE_ADD_TASK_BUTTON_KEYS,
  getChatResponseStringInToObject,
  convertChatbOtAnswerStringToObject,
  CHATBOT_RESPONSE,
  TimeInSeconds
} from './component/util';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import DeleteModal from '../common/component/DiscardModel';
import ChatbotStream from './component/ChatbotStream';
import FeedbackActions from './component/FeedbackActions';
import AddLineBreak from '../Regulations/components/currentTab/AddLineBreak';

const AveryAIModule = (props) => {
  //const
  const scrollToRef = useRef(null);
  const { t } = useTranslation('averyAiChatBot');
  const { actions } = props;

  //redux
  const { userData } = useSelector(selectCommon);

  //state variables
  const [inputValue, setInputValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [chatBotQuestionsAnsList, setChatBotQuestionsAnsList] = useState<any[]>(
    []
  );
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [isOnServerError] = useState<boolean>(false);
  const [isOnAddTask, setIsOnAddTask] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<any>({});
  const [userName, setUserName] = useState('');
  const [sidePanelList, setSidePanelList] = useState();
  const [loadSidePanelList, setLoadSidePanelList] = useState<boolean>();
  const [selectedChatHistory, setSelectedChatHistory] = useState({
    sessionId: ''
  });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<any>();
  const [streamText, setStreamText] = useState('');
  const [hadUserAskedQuestion, setHadUserAskedQuestion] =
    useState<boolean>(false);
  const [currentlyAskedQuestion, setCurrentlyAskedQuestion] = useState('');
  const [selectedItemForFeedBack, setSelectedItemForFeedBack] = useState<any>(
    {}
  );
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);
  const timRef = useRef(null);

  //useEffect
  useEffect(() => {
    if (inputValue.length > 0) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [inputValue]);

  useEffect(() => {
    fetchUserData();
    fetchSidePanelHistoryList();
  }, []); //

  useEffect(() => {
    handleScroll();
  }, [hadUserAskedQuestion]);

  useEffect(() => {
    let intervalId;

    if (loadingAnswer && selectedChatHistory?.sessionId) {
      intervalId = setInterval(() => {
        fetchChatBotSessionChat(selectedChatHistory?.sessionId);
      }, TimeInSeconds);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loadingAnswer, selectedChatHistory]);

  // stream
  const fetchData = async () => {
    let streamUrl = `${SERVER_API_URL}chatbot/stream?input=${inputValue}&sessionId=${selectedChatHistory?.sessionId}`;
    let controller = null; // Store the AbortController instance

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;
    let arrayOfResponse = [];
    let partialLine = ''; // To store incomplete lines across chunks
    let answers = '';
    let chatBotId = '';

    try {
      // Fetch the response from the API
      const response = await fetch(streamUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.accessToken}`
        },

        signal // Pass the signal to the fetch request
      });
      if (!response.ok) {
        if (controller) {
          controller.abort();
          controller = null;
        }
        setStatesAfterChatBotResponse();
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Massage and parse the chunk of data
        // Combine the current chunk with any remaining partial line from the previous chunk
        const chunk = partialLine + decoder.decode(value);
        const lines = chunk.split('\n');
        partialLine = lines.pop() || '';
        const pattern = /data: data: (.*)/;
        const ChatIdPattern = /chatbotAccessId:([a-f0-9-]+)/;
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        lines.forEach((line) => {
          const dataMatch = line.match(pattern);
          const idMatch = line.match(ChatIdPattern);
          if (idMatch) {
            chatBotId = idMatch[1];
          }
          if (dataMatch) {
            const data = dataMatch[1].replace(/<br>/g, '\n');
            arrayOfResponse.push(data);
            setStreamText((prev) => prev + ' ' + data);
            answers += ' ' + data;
          }
        });
      }
    } catch (error) {
      if (!signal.aborted) {
        setStreamText(error.message);
      }
      setHadUserAskedQuestion(false);
      answers = error;
    }
    setStreamAnswerToPreviousList(arrayOfResponse, answers, chatBotId);
  };

  // set streams answer to the previous list
  const setStreamAnswerToPreviousList = (
    arrayOfResponse,
    answers,
    chatBotId
  ) => {
    let citationObject = getChatResponseStringInToObject(
      arrayOfResponse[arrayOfResponse.length - 1]
    );

    let newQuesAns = {
      id: chatBotId || '',
      questions: inputValue,
      answers: citationObject?.output || answers || '',
      sources: citationObject?.sources || '',
      isChecking: false,
      isTaskAdded:
        citationObject?.status === CHATBOT_RESPONSE.PENDING ||
        CHATBOT_RESPONSE.FAILED
    };
    if (citationObject?.status === CHATBOT_RESPONSE.PENDING) {
      setLoadingAnswer(true);
    }
    setChatBotQuestionsAnsList([...chatBotQuestionsAnsList, newQuesAns]);
    setStatesAfterChatBotResponse();
  };
  //methods
  const setStatesAfterChatBotResponse = () => {
    setHadUserAskedQuestion(false);
    fetchSidePanelHistoryList();
    setIsDisabled(false);
    setIsBtnDisabled(false);
    setInputValue('');
  };
  // handle thumbs up and down
  const handleThumbsDownOnOrUpOnAResponse = async (item, status) => {
    const isLike = item?.detail?.isLike === status ? 'undo' : status;
    try {
      const res = await getChatbotFeedback({
        chatbotAccessHistoryId: item?.id || '',
        isLike: isLike
      });
      if (res?.message === 'Status updated') {
        fetchChatBotSessionChat(selectedChatHistory?.sessionId);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || '', {
        position: 'top-right'
      });
    }
  };

  //  handle copy

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPressOnEditSideBarSession = (event) => {
    setInputValue(event.target.value);
    if (event.key === 'Enter' && inputValue) {
      fetchChatBotAiResponse();
    }
  };
  const handleButtonClick = () => {
    if (inputValue) {
      fetchChatBotAiResponse();
    }
  };

  const fetchUserData = async () => {
    const respData = await getLoggedInUserDetail(userData?.userUid);
    setUserName(respData?.name);
  };

  // fetch side panel list
  const fetchSidePanelHistoryList = async () => {
    setLoadSidePanelList(true);
    const res = await getLeftSidePanel({ copilot: 'avery' });
    const result = transformSessions(res);
    setSidePanelList(result);
    setLoadSidePanelList(false);
    // crete a session and maintain it
    if (!selectedChatHistory?.sessionId) {
      let lastSessionId = res?.session[0]?.['id'];
      setSelectedChatHistory({ sessionId: lastSessionId || '' });
      fetchChatBotSessionChat(lastSessionId);
    }
  };
  //fetchChatBotAiResponse
  async function fetchChatBotAiResponse() {
    setStreamText('');
    setHadUserAskedQuestion(true);
    setCurrentlyAskedQuestion(inputValue);
    setIsDisabled(true);
    setIsBtnDisabled(true);
    fetchData();
  }

  //scroll to end Div
  const handleScroll = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goBackToAveryAI = (taskObject: any) => {
    const indexToUpdate = chatBotQuestionsAnsList.findIndex(
      (obj) => obj.id === taskObject.id
    );

    if (indexToUpdate !== -1) {
      chatBotQuestionsAnsList[indexToUpdate] = taskObject;
    }

    setIsOnAddTask(false);
    setChatBotQuestionsAnsList([...chatBotQuestionsAnsList]);
  };

  const handleSelectItem = (value: any) => {
    setIsOnAddTask(true);
    setTaskData(value);
  };

  //Avatar initials
  const stringAvatar = (name: string = 'User Name') => {
    return {
      sx: {
        bgcolor: PRIMARY_COLOR
      },
      children: getInitials(name)
    };
  };

  // left panel methods

  // delete selected chat history
  const handleElementToDelete = async (event, deleteItem) => {
    event.stopPropagation();
    setDeleteItem(deleteItem);
    setOpen(true);
  };

  // on selecting chat from chat history
  const handleSelected = async (selectedItem) => {
    clearTimeout(timRef.current);
    setSelectedChatHistory({
      sessionId: selectedItem?.id
    });
    if (selectedItem?.id) {
      fetchChatBotSessionChat(selectedItem?.id);
    }
  };

  // on edit of chat history title
  const handleEdit = async (event, editedItem) => {
    if (event?.target?.value.trim() !== editedItem?.sessionTitle) {
      try {
        const res = await editSessionTitle(editedItem?.id, {
          newTitle: event?.target?.value.trim()
        });
        showSuccessMessage(res?.message, '', {
          position: 'top-right'
        });
        fetchSidePanelHistoryList();
      } catch (error) {
        showErrorMessage(error.message, {
          position: 'top-right'
        });
      }
    }
  };

  // hande new chat
  const handleNewChat = () => {
    setChatBotQuestionsAnsList([]);
    setSelectedChatHistory({ sessionId: '' });
  };
  //close delete model

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteSession(deleteItem?.id);
      showSuccessMessage(res?.message, '', {
        position: 'top-right'
      });
      fetchSidePanelHistoryList();
      if (selectedChatHistory?.sessionId === deleteItem?.id) {
        handleNewChat();
      }
    } catch (error) {
      showErrorMessage(error.message, {
        position: 'top-right'
      });
    }
    setOpen(false);
  };

  // fetch chat bot session chat

  const fetchChatBotSessionChat = async (sessionId) => {
    const res = await getChatBotSession(sessionId);
    let updatedQuesationList2 = [];
    let flag: boolean = false;
    res?.chats?.forEach((element) => {
      let ans: any = convertChatbOtAnswerStringToObject(element?.answer);
      if (element?.status === CHATBOT_RESPONSE.PENDING) {
        flag = true;
      }
      let item = {
        id: element?.id,
        questions: element?.question,
        answers: ans?.output || `${ans}` || '',
        sources: ans?.sources || '',
        isChecking: false,
        isTaskAdded: element?.detail?.isTaskCreated,
        detail: element?.detail,
        status: element?.status
      };

      updatedQuesationList2.push(item);
    });

    if (flag) {
      setLoadingAnswer(true);
    } else {
      setLoadingAnswer(false);
    }
    setChatBotQuestionsAnsList(updatedQuesationList2);
  };

  // check to disable task
  const checkToDisableAddTaskButtonOnChatbotResponse = (
    chatbotResponseForQuestion
  ) => {
    if (
      chatbotResponseForQuestion?.isTaskAdded ||
      chatbotResponseForQuestion?.status === CHATBOT_RESPONSE.PENDING ||
      chatbotResponseForQuestion?.status === CHATBOT_RESPONSE.FAILED
    ) {
      return true;
    } else if (
      chatbotResponseForQuestion?.answers?.includes(
        DISABLE_ADD_TASK_BUTTON_KEYS[0]
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container maxWidth={'xl'}>
      {isOnAddTask ? (
        <>
          <Breadcrumb
            parentName={'Avery Co-Pilot'}
            childNamePath={'Create Task'}
            goBackToReports={() => {
              setIsOnAddTask(false);
            }}
          />
          <AddTask
            isTaskAddedSuccess={goBackToAveryAI}
            taskData={taskData}
            cancelAddTask={() => {
              setIsOnAddTask(false);
            }}
          />
        </>
      ) : (
        <Box className="averyAiChatBot mt-0">
          <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
            <Typography variant={'h3'}>{t('averyAIText')}</Typography>
          </Box>
          <Box className="w-100" sx={{ mt: 3 }}>
            <Grid container gap={1}>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Box className="leftPanel mr-33">
                  <LeftSidePanel
                    handleDelete={handleElementToDelete}
                    handleSelected={handleSelected}
                    handleEdit={handleEdit}
                    handleNewChat={handleNewChat}
                    sidePanelList={sidePanelList}
                    listLoader={loadSidePanelList}
                    hadUserAskedQuestion={hadUserAskedQuestion}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                <Card className="chatBotCard">
                  {hadUserAskedQuestion ? (
                    <Box sx={{ pb: 30 }} className="h-100">
                      <Box>
                        <Box className="quesAnsListView">
                          <ChatbotStream
                            isOnServerError={isOnServerError}
                            question={currentlyAskedQuestion}
                            streamText={streamText}
                            userName={userName}
                            key={'chatResponseStreamComponent'}
                            actions={actions}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ pb: 30 }} className="h-100">
                      {chatBotQuestionsAnsList?.length > 0 ? (
                        <Box>
                          <Box className="quesAnsListView">
                            {chatBotQuestionsAnsList?.map((item, index) => (
                              <Box key={index}>
                                <Box
                                  sx={{ px: 32, pb: 8, pt: '22px' }}
                                  className="flex-basic-start chatBotQuestionSection"
                                >
                                  <Box
                                    sx={{ mr: 5 }}
                                    className="flex-basic-center"
                                  >
                                    <Avatar
                                      variant="rounded"
                                      alt={'user avatar'}
                                      {...stringAvatar(userName)}
                                    />
                                  </Box>
                                  <Box className="asnBox w-100">
                                    <Box className="p-relative">
                                      <Typography
                                        className="w-90"
                                        variant="body1"
                                      >
                                        {item.questions}
                                      </Typography>
                                      <Box className="p-absolute addNewTaskBtn ">
                                        {actions?.includes('add-task') && (
                                          <Button
                                            variant="outlined"
                                            disabled={checkToDisableAddTaskButtonOnChatbotResponse(
                                              item
                                            )}
                                            sx={{ py: '0.5rem', px: '1rem' }}
                                            onClick={() => {
                                              handleSelectItem(item);
                                            }}
                                          >
                                            {t('addTaskBtn')}
                                          </Button>
                                        )}
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
                                    <Box
                                      sx={{ pl: 10 }}
                                      className="flex-basic-start"
                                    >
                                      <Box className="dashLoader"></Box>
                                    </Box>
                                  ) : (
                                    <Box className="w-100">
                                      <Box>
                                        <Box
                                          className={`asnBox ${
                                            isOnServerError ? 'oppsText' : ''
                                          }`}
                                        >
                                          <AddLineBreak text={item?.answers} />
                                        </Box>
                                        {chatBotQuestionsAnsList[index]
                                          ?.sources && (
                                          <Box
                                            sx={{
                                              py: 2,
                                              px: 4
                                            }}
                                            className="ansSources mt-5 mr-12 w-80"
                                          >
                                            <Typography
                                              className="textweight"
                                              variant="body2"
                                            >
                                              {t('sourcesText')}
                                            </Typography>
                                            {chatBotQuestionsAnsList[
                                              index
                                            ]?.sources?.map(
                                              (item: any, index) => (
                                                <Box key={index}>
                                                  {item?.source_url !==
                                                    null && (
                                                    <Tooltip
                                                      title={item?.source_url}
                                                      arrow
                                                    >
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
                                              )
                                            )}
                                          </Box>
                                        )}
                                      </Box>
                                      {!item?.answers?.includes(
                                        DISABLE_ADD_TASK_BUTTON_KEYS[0]
                                      ) && (
                                        <FeedbackActions
                                          handleDislike={
                                            handleThumbsDownOnOrUpOnAResponse
                                          }
                                          handleLike={
                                            handleThumbsDownOnOrUpOnAResponse
                                          }
                                          response={item}
                                          key={item?.id}
                                          selectedItem={selectedItemForFeedBack}
                                          setSelectedItem={
                                            setSelectedItemForFeedBack
                                          }
                                        />
                                      )}
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            ))}
                            <Box
                              sx={{ py: 2 }}
                              ref={scrollToRef}
                              id="emptyBox"
                            ></Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box className="flex-basic-center h-100 emptyPlaceHolderHeight">
                          <EmptyPlaceholder
                            imgWidth={'356'}
                            imageUrl={NoChatAveryAI}
                            titleText={t('emptyTextTitle')}
                            subText={
                              <Box className="flex-direction-column mt-10 subText">
                                <Box>{t('emptySubTextTitle')}</Box>
                                <Box>{t('emptySubTextTitle2')}</Box>
                              </Box>
                            }
                          />
                        </Box>
                      )}
                    </Box>
                  )}

                  <Box
                    sx={{ px: 32 }}
                    className="flex-basic-center chatBoxInputControl w-65"
                  >
                    <FormControl>
                      <TextField
                        placeholder={t('inputPlaceholder')}
                        variant="outlined"
                        value={inputValue}
                        disabled={isDisabled}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPressOnEditSideBarSession}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                disabled={isBtnDisabled}
                                onClick={handleButtonClick}
                              >
                                <Box className="icon-message-sent"></Box>
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        inputProps={{
                          className: 'text-ellipsis'
                        }}
                      />
                    </FormControl>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      <DeleteModal
        handleLeavePage={handleClose}
        handleStayPage={handleDelete}
        open={open}
        text={{
          acceptTitle: t('yes'),
          discardTitle: t('no'),
          description: t('deleteDescription'),
          title: t('')
        }}
      />
    </Container>
  );
};

export default AveryAIModule;
