import { Box, Typography } from '@mui/material';
import ChatInputForm from 'src/modules/DataCoPilot/component/ChatInputForm';
import ArrowDown from 'src/assets/svg/arrowDown.svg';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';

const ChatbotInputFormTourComp = ({ tourDetails, handleClose, tourId }) => {
  const { t } = useTranslation('english');
  return (
    <Box className="step1">
      <Box className="d-flex calculateMarginTop">
        <Box className="content mt-22 w-25" sx={{ ml: 80, mb: 6 }}>
          <Typography className=" overlayFont  w-100 ">
            {tourDetails?.description}
          </Typography>
          <Box className="  d-flex w-100 p-22">
            <Button
              onClick={() => handleClose(tourId, tourDetails.stepCount)}
              btnText={t('tourguide.next')}
              variant="contained"
              sx={{ py: '0.62rem', px: '2rem' }}
              className="mr-10 "
            />
          </Box>
        </Box>
        <Box sx={{ mx: 2 }} className="arrowSvgBox">
          <img src={ArrowDown} className="arrowSvg" />
        </Box>
      </Box>
      <Box className="chatbotInputForm  " sx={{ mb: 10 }}>
        <ChatInputForm isDisableInputFiled={false} />
      </Box>
    </Box>
  );
};

export default ChatbotInputFormTourComp;
