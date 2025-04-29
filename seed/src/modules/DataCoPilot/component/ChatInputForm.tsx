import { FormControl } from '@mui/material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  isDisableInputFiled?: boolean;
  fetchChatBotApiResponse?: (inputValue: string) => Promise<void>;
};

const ChatInputForm = ({
  isDisableInputFiled,
  fetchChatBotApiResponse: fetchChatBotAiResponse
}: Props) => {
  const { t } = useTranslation('english');

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPressOnEditSideBarSession = (event) => {
    setInputValue(event.target.value);
    if (event.key === 'Enter' && inputValue) {
      fetchChatBotAiResponse(inputValue);
      setInputValue('');
    }
  };

  const handleButtonClick = () => {
    if (inputValue) {
      fetchChatBotAiResponse(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <Box
        sx={{ px: 32 }}
        className="flex-basic-center chatBoxInputControl w-65"
      >
        <FormControl>
          <TextField
            placeholder={t('dataCopilot.inputPlaceholder')}
            variant="outlined"
            value={inputValue}
            disabled={isDisableInputFiled}
            onChange={handleInputChange}
            onKeyDown={handleKeyPressOnEditSideBarSession}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={isDisableInputFiled}
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
    </div>
  );
};

export default ChatInputForm;
