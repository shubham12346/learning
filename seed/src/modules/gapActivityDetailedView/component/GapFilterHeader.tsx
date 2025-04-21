import { Box } from '@mui/material';
import GapFilters from './GapFilters';
import { gapActivityDetailedViewFilterHeaderProps } from '../models';
import { useNavigate } from 'react-router-dom';

const GapFilterHeader = (params: gapActivityDetailedViewFilterHeaderProps) => {
  const navigate = useNavigate();
  const {
    agencyFilterOptions,
    statusFilterOptions,
    gapActivityDetails,
    onFilterChange,
    isDisabled,
  } = params;

  const handleViewActionPlan = () => {
    if (gapActivityDetails?.gapAssessmentId) {
      navigate(
        `/avery/regulations/gapActionPlan?gapId=${gapActivityDetails?.gapAssessmentId}`
      );
    }
  };
  return (
    <Box>
      <GapFilters
        agencyFilterOptions={agencyFilterOptions}
        statusFilterOptions={statusFilterOptions}
        handleViewActionPlan={handleViewActionPlan}
        onFilterChange={onFilterChange}
        isDisabled={isDisabled}
      />
    </Box>
  );
};

export default GapFilterHeader;
