import { Avatar, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DynamicTable from 'src/modules/DataCoPilot/component/DynamicTable';
import AddLineBreak from 'src/modules/Regulations/components/currentTab/AddLineBreak';
import { PRIMARY_COLOR } from 'src/shared/constants/constants';
import { getInitials } from 'src/shared/utils/utils';

const ChatbotStream = ({
  userName,
  streamText,
  question,
  isOnServerError,
  actions,
  type = 'string',
  tableData = [],
  loading = false
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
      <Box className="quesAnsListView">
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
                  {question}
                </Typography>
                <Box className="p-absolute addNewTaskBtn ">
                  {actions?.includes('add-task') && (
                    <Button
                      variant="outlined"
                      disabled={true}
                      sx={{ py: '0.5rem', px: '1rem' }}
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

            <Box className="w-100">
              {type === 'string' ? (
                <Box>
                  <Box
                    className={`asnBox ${isOnServerError ? 'oppsText' : ''}`}
                  >
                    <Box className="d-flex" style={{ alignItems: 'center' }}>
                      <Box>
                        <label>
                          <AddLineBreak text={streamText} />
                        </label>
                        <label className="streamTextLoader"></label>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : loading ? (
                <>
                  <Box className="flex-basic-center bgLoaderScreen ">
                    <Box className="spinnerLoading mt-100 mb-100"></Box>
                  </Box>
                </>
              ) : (
                <DynamicTable tableData={tableData} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatbotStream;

//
