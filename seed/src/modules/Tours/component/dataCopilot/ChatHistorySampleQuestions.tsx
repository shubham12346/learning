import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/components/button/Button';
import LeftTourArrow from 'src/assets/svg/leftTourArrow.svg';
import LeftSidePanel from './leftPanelSampleTour';

const ChatHistorySampleQuestions = ({ tourDetails, handleClose, tourId }) => {
  const { t } = useTranslation('english');

  return (
    <Grid container className="step2" sx={{ mt: 38, ml: 70 }}>
      <Grid item xs={12} sm={5} md={5} lg={3} xl={3}>
        <Box className="leftPanel w-85" sx={{}}>
          <LeftSidePanel />
        </Box>
      </Grid>
      <Grid item xs={12} sm={5} md={7} lg={9} xl={9}>
        <Box className="flex-column" sx={{ mt: 10 }}>
          <Box sx={{ mx: 2, mb: 5 }} className="arrowSvgBox">
            <img src={LeftTourArrow} className="arrowSvg" />
          </Box>
          <Box className="content  w-40" sx={{ ml: 18, mb: 6 }}>
            <Typography className=" overlayFont  w-100 ">
              {tourDetails?.description}
            </Typography>
            <Box className="  d-flex w-100 p-22">
              <Button
                onClick={() => handleClose(tourId, tourDetails.stepCount)}
                btnText={t('tourguide.done')}
                variant="contained"
                sx={{ py: '0.62rem', px: '2rem' }}
                className="mr-10 "
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatHistorySampleQuestions;
