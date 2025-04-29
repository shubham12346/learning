import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Button } from 'src/shared/components/button/Button';
import ArrowSvg from 'src/assets/svg/tourPointer.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setTourStatus } from '../service/tour.service';

const MyDocTour = ({ handleClose, tourDetails, tourId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('english');
  const dispatch = useDispatch<any>();

  const handleNavigate = () => {
    handleClose(tourId, tourDetails[0].stepCount);
    dispatch(setTourStatus('completed'));
    navigate('/avery/mydoc?tour=gapanalysis');
  };

  const dismissTour = () => {
    handleClose(tourId, tourDetails[0].stepCount);
    dispatch(setTourStatus('completed'));
  };

  return (
    <Box className="overlayElement d-flex align-items-start ">
      <Box className="d-flex">
        <Box className=" mt-30 mydoc">
          <Button
            startIcon={<Box className="icon-ic_my-doc"> </Box>}
            onClick={handleNavigate}
            btnText={t('tourguide.mydocs')}
            sx={{ py: '0.62rem', px: '2rem' }}
            className="goToMyDocs"
          />
        </Box>
        <Box className="d-flex p-relative ">
          <Box className=" p-absolute">
            <img src={ArrowSvg} alt="image " />
          </Box>
          <Box className="content mt-22 w-40" sx={{ ml: 35 }}>
            <Typography className=" overlayFont  w-100 ">
              {tourDetails[0]?.description}
            </Typography>
            <Box className="  d-flex w-100 p-22">
              <Button
                onClick={dismissTour}
                btnText={t('tourguide.dismiss')}
                variant="contained"
                sx={{ py: '0.62rem', px: '2rem' }}
                className="mr-20 "
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyDocTour;
