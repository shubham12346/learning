import { Box, Card, styled } from '@mui/material';
import { useState } from 'react';
import ChatList from './ChatList';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';
import SampleQuestionAccordion from '../../DataCoPilot/component/SampleQuestionAccordion';

type Props = {
  handleDelete?: (event: any, deleteItem: any) => Promise<void>;
  handleSelected?: (selectedItem: any) => Promise<void>;
  handleEdit?: (event: any, editedItem: any) => Promise<void>;
  handleNewChat?: () => void;
  sidePanelList?: any;
  listLoader?: boolean;
  hadUserAskedQuestion?: boolean;
  sampleQuestion?: string;
};

const LeftSidePanel = (props: Props) => {
  const {
    handleDelete,
    handleSelected,
    handleEdit,
    handleNewChat,
    sidePanelList,
    listLoader,
    hadUserAskedQuestion,
    sampleQuestion = ''
  } = props;
  const { t } = useTranslation('averyAiChatBot');

  const [isEdit, setIsEdit] = useState<any>({
    id: '',
    title: ''
  });
  const [sampleQuestiionAtBootom, setSampleQuestiionAtBootom] =
    useState<string>(sampleQuestion);

  const setEdit = (id, title) => {
    setIsEdit({
      id: id,
      title: title
    });
  };
  interface ChatHistoryListProps {
    hasaccordion?: string;
  }

  // Create a styled component for the chat history list
  const ChatHistoryList = styled(Box)<ChatHistoryListProps>`
    height: ${({ hasaccordion }) =>
      hasaccordion ? 'calc(100vh - 310px - 30px)' : 'calc(100vh - 290px)'};
    min-height: ${({ hasaccordion }) =>
      hasaccordion ? 'calc(100vh - 310px - 30px)' : 'calc(100vh - 290px)'};
  `;

  const handleAccordion = () => {
    setSampleQuestiionAtBootom(sampleQuestiionAtBootom ? '' : sampleQuestion);
  };

  return (
    <Card
      sx={{ position: 'relative' }}
      className={`${
        sampleQuestion && !sampleQuestiionAtBootom ? 'backgroundGreyOut' : ''
      }`}
    >
      <Box className="mt-18">
        <Button
          className="w-86 ml-20  btnFont mb-14 d-flex "
          variant="contained"
          type="submit"
          size={'small'}
          btnText={t('newChat')}
          startIcon={
            <Box
              sx={{ color: 'white', ml: -3 }}
              className="icon-plus iconStyle"
            />
          }
          onClick={handleNewChat}
          sx={{ p: '18px' }}
          disabled={hadUserAskedQuestion}
        />
        <ChatHistoryList
          hasaccordion={sampleQuestiionAtBootom}
          className="chatHistoryList"
        >
          <Box>
            {sidePanelList?.map((chatHistory) => (
              <ChatList
                key={chatHistory?.title}
                list={chatHistory?.list}
                title={chatHistory?.title}
                isEdit={isEdit}
                setEdit={setEdit}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleSelected={handleSelected}
              />
            ))}
          </Box>
        </ChatHistoryList>
        {sampleQuestion ? (
          <SampleQuestionAccordion
            handleAccordion={handleAccordion}
            hadUserAskedQuestion={hadUserAskedQuestion}
          />
        ) : null}
      </Box>
    </Card>
  );
};

export default LeftSidePanel;
