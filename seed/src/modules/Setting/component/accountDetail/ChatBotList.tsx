import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteFileModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';
import { Button } from 'src/shared/components/button/Button';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { deleteChatbot, getChatbotList } from '../../api/settingAPI';
import ChatbotCard from './ChatbotCard';
import { useNavigate } from 'react-router-dom';

const ChatBotList = () => {
  const { t } = useTranslation('setting');
  const navigate = useNavigate();

  const [chatbotList, setChatbotList] = useState([]);
  const [showDeleteChatbotModal, setShowDeleteChatbotModal] =
    useState<boolean>(false);
  const [deleteChatbotId, setDeleteChatbotId] = useState();
  useEffect(() => {
    getChatbotData();
  }, []);
  const [loader, setLoader] = useState<boolean>(false);

  const getChatbotData = async () => {
    setLoader(true);
    const res = await getChatbotList();
    setChatbotList(res);
    setLoader(false);
  };

  const handleDeleteChatbotModal = async (chatbotId) => {
    setDeleteChatbotId(chatbotId);
    if (chatbotList?.length === 1) {
      setShowDeleteChatbotModal(true);
    } else {
      handleDelete(chatbotId, false);
    }
  };

  const handleDelete = async (chatbotId, isLastChatbot) => {
    try {
      const res = await deleteChatbot(chatbotId, {
        deleteInstance: isLastChatbot
      });
      await getChatbotData();
      setShowDeleteChatbotModal(false);
      if (res?.message === 'Chatbot instance deleted successfully') {
        showSuccessMessage(res?.message, '', {});
      } else {
        showErrorMessage(res?.message || '', {
          position: 'top-right'
        });
      }
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause || '', {
        position: 'top-right'
      });
    }
  };

  const handleCloseDeleteChatbotModal = () => {
    setDeleteChatbotId(null);
    setShowDeleteChatbotModal(false);
  };
  


  const handleAddEditChatbot = (chatbotId) => {
    if (chatbotId) navigate(`chatbot?chatbotId=${chatbotId}`);
    else navigate('chatbot');
  };
  return (
    <>
      {!loader && showDeleteChatbotModal && (
        <DeleteFileModal
          open={showDeleteChatbotModal}
          handleDelete={() => {
            handleDelete(deleteChatbotId, true);
          }}
          handleClose={handleCloseDeleteChatbotModal}
          subText={t('chatbotDeleteModal.messageText')}
          modalTitle={t('chatbotDeleteModal.title')}
          btnPrimaryText={t('chatbotDeleteModal.continueBtnText')}
        />
      )}

      <Card className="mfaDetails">
        <CardHeader
          title={
            <Box className=" flex-direction-column w-100">
              <Box className="flex-basic-space-start">
                <Typography className="ad-title">Chatbot Instances</Typography>
                <Box className="flex-basic-end">
                  <Button
                    sx={{ padding: '0.75rem 2rem' }}
                    type="submit"
                    variant="contained"
                    btnText={t('addNewChatbot')}
                    onClick={()=>{handleAddEditChatbot('')}}
                    className="w-100"
                    startIcon={<AddIcon />}
                  ></Button>
                </Box>
              </Box>
            </Box>
          }
        />
        <Divider className="divider" />
        <CardContent className="mfaContent">
          <>
            {loader && (
              <Box className="spinnerWrapper flex-basic-center mt-100 mb-100 ">
                <Box className="spinnerLoading "></Box>
              </Box>
            )}
            {!loader &&
              chatbotList.map((chatbot) => (
                <ChatbotCard
                  key={chatbot.id}
                  chatbot={chatbot}
                  handleDelete={handleDeleteChatbotModal}
                  handleEdit={handleAddEditChatbot}
                />
              ))}
          </>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatBotList;
