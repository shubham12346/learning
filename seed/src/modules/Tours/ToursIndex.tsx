import MyDocTour from 'src/modules/Tours/component/MyDocTour';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { changeTourStatus } from 'src/core/layout/tourGuideApi';
import { showErrorMessage } from 'src/shared/components/toaster/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTour, fetchTourStatus } from './service/tour.service';
import { RootState } from 'src/store/reducer';
import { TourComponents } from './constant';
import DataCopilotTour from './component/dataCopilot/DataCopilotTourIndex';

export type tourDetailsType = {
  description: string;
  stepCount: number;
  stepStatus: boolean;
};
export type backgroundOverlayType = {
  tourDetails: tourDetailsType[];
  handleClose: (value: string, stepCount: number) => void;
  tourId: string;
};

const ToursIndex = () => {
  const dispatch = useDispatch<any>();
  const { tourDetails, tourComponents } = useSelector(
    (state: RootState) => state.tour
  );
  const fusion1 = useSelector((state: RootState) => state.common.fusion1);
  const [showBox, setShowBox] = useState(false);

  const checkForTours = async (tourComponents) => {
    let checkForMyDoComponent = tourComponents?.find(
      (component) => component.tourStatus === 'pending'
    );
    if (checkForMyDoComponent?.id) {
      await dispatch(
        fetchTourStatus({
          id: checkForMyDoComponent?.id,
          componentName: checkForMyDoComponent?.component
        })
      );
    }
  };

  const handleClose = async (changeTourId, stepCount) => {
    try {
      await changeTourStatus(changeTourId, stepCount);
    } catch (error) {
      showErrorMessage(error.message, {});
    }
  };

  useEffect(() => {
    dispatch(
      fetchTour({ tour: fusion1 === 'copilot' ? 'fusion-one' : 'avery' })
    );
  }, [fusion1]);

  useEffect(() => {
    if (tourDetails.tourStatus === 'pending') {
      setShowBox(false);
      const timer = setTimeout(() => {
        setShowBox(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowBox(true);
    }
  }, [tourDetails.tourStatus]);

  useEffect(() => {
    if (tourComponents.length > 0 && tourDetails.tourDetails.length === 0) {
      checkForTours(tourComponents);
    }
  }, [tourComponents]);

  const CheckTourComponentToDisplay = (component) => {
    switch (component) {
      case TourComponents.MyDocs:
        return (
          <MyDocTour
            handleClose={handleClose}
            tourDetails={tourDetails.tourDetails}
            tourId={tourDetails.id}
          />
        );
      case TourComponents.DataCopilot:
        return (
          <DataCopilotTour handleClose={handleClose} tourId={tourDetails.id} />
        );
      default:
        return <></>;
    }
  };
  if (tourDetails.tourStatus === 'completed') {
    return null;
  }

  return (
    showBox && (
      <Box className="backgroundOverlay">
        {CheckTourComponentToDisplay(tourDetails.componentName)}
      </Box>
    )
  );
};

export default ToursIndex;
