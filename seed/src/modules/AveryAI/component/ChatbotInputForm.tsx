import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatbotInputForm = () => {
  return (
    <Box className="chatbotInputForm">
      <Box>
        <TextField
          className="chatBoxInputControl"
          variant="outlined"
          placeholder="Type your message..."
        />
      </Box>
      <Box>
        <Button variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotInputForm;
