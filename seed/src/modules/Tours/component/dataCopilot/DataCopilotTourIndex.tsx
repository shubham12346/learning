import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from 'src/store/reducer';
import ChatbotInputFormTourComp from './ChatbotInputForm';
import ChatHistorySampleQuestions from './ChatHistorySampleQuestions';
import { useDispatch } from 'react-redux';
import { TourComponents } from '../../constant';
import { setTourStatus, setTourSteps } from '../../service/tour.service';

const DataCopilotTour = ({ handleClose, tourId }) => {
  const navigate = useNavigate();
  const { tourDetails } = useSelector((state: RootState) => state.tour);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tourDetails.componentName === TourComponents.DataCopilot) {
      navigate('/avery/data-copilot');
    }
  }, []);

  const handleTourStep = (tourId, stepCount) => {
    handleClose(tourId, stepCount);
    const component = tourDetails?.tourDetails?.find(
      (steps) =>
        steps?.stepCount !== stepCount && steps?.stepStatus === 'pending'
    );
    const updateTourDetails = tourDetails?.tourDetails?.map((item) => {
      if (item?.stepCount === stepCount) {
        return { ...item, stepStatus: 'completed' };
      }
      return item;
    });

    dispatch(setTourSteps(updateTourDetails));
    if (!component?.stepCount) {
      dispatch(setTourStatus('completed'));
    }
  };
  const checkToDisplayForEachStep = (tourDetails) => {
    const component = tourDetails?.tourDetails?.find(
      (steps) => steps?.stepStatus === 'pending'
    );

    switch (component?.stepCount) {
      case 1:
        return (
          <ChatbotInputFormTourComp
            handleClose={handleTourStep}
            tourDetails={component}
            tourId={tourId}
          />
        );
      case 2:
        return (
          <ChatHistorySampleQuestions
            handleClose={handleTourStep}
            tourDetails={tourDetails?.tourDetails[1] || component}
            tourId={tourId}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Box className="dataCopilotElement">
      {checkToDisplayForEachStep(tourDetails)}
    </Box>
  );
};

export default DataCopilotTour;
