import { useEffect, useState, useCallback } from 'react';
import LeftSidePanel from '../../AveryAI/component/LeftsidePanel';
import {
  deleteSession,
  editSessionTitle
} from '../../AveryAI/api/averyChatBotApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import DeleteModal from '../../common/component/DiscardModel';
import { useTranslation } from 'react-i18next';
import { useSampleContext } from './SampleQuestionContext';

const SidePanelWrapper = ({
  selectedChatHistory,
  setSelectedChatHistory,
  loadingAnswer,
  fetchChatBotSessionChat,
  handleNewChat,
  fetchSidePanelHistoryList,
  loadSidePanel
}) => {
  const { t } = useTranslation('averyAiChatBot');
  // states varaibales
  const [deleteItem, setDeleteItem] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { lastSampleQuestionAsked, setLastSampleQuestionAsked } =
    useSampleContext();

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

  // on selecting chat from chat history
  const handleSelected = async (selectedItem) => {
    setSelectedChatHistory({
      sessionId: selectedItem?.id
    });
    if (selectedItem?.id) {
      await fetchChatBotSessionChat(selectedItem?.id);
    }
  };

  // handle close
  const handleClose = useCallback(() => {
    setDeleteItem('');
    setDeleteModalOpen(false);
  }, []);

  const handleDeleteModal = useCallback(async (event, deleteItem) => {
    event.stopPropagation();
    setDeleteItem(deleteItem?.id);
    setDeleteModalOpen(true);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteItem) return;
    try {
      const res = await deleteSession(deleteItem);
      showSuccessMessage(res?.message, '', {
        position: 'top-right'
      });
      fetchSidePanelHistoryList();
      if (selectedChatHistory?.sessionId === deleteItem) {
        setSelectedChatHistory({
          sessionId: ''
        });
      }
    } catch (error) {
      showErrorMessage(error.message, {
        position: 'top-right'
      });
    } finally {
      handleClose();
    }
  }, [deleteItem]);

  useEffect(() => {
    if (lastSampleQuestionAsked) {
      fetchSidePanelHistoryList();
    } else {
      setLastSampleQuestionAsked({ id: '', question: '' });
    }
  }, [lastSampleQuestionAsked]);

  return (
    <>
      <LeftSidePanel
        hadUserAskedQuestion={loadingAnswer}
        handleDelete={handleDeleteModal}
        handleEdit={handleEdit}
        handleSelected={handleSelected}
        handleNewChat={handleNewChat}
        sidePanelList={loadSidePanel}
        sampleQuestion={'true'}
      />

      <DeleteModal
        handleLeavePage={handleClose}
        handleStayPage={handleDelete}
        open={deleteModalOpen}
        text={{
          acceptTitle: t('yes'),
          discardTitle: t('no'),
          description: t('deleteDescription'),
          title: t('')
        }}
      />
    </>
  );
};

export default SidePanelWrapper;
