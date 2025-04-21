import { Box, Typography } from '@mui/material';
import { riskStatusTypeClassWise } from 'src/shared/utils/utils';
export type statusChip = {
  chipVariant: 'Critical' | 'High' | 'Medium' | 'Low' | 'undefined';
};
const StatusChip = ({ chipVariant }) => {
  return (
    <Box
      className={`flex-basic-even-space ${riskStatusTypeClassWise[chipVariant]} `}
    >
      <Box className={`box`}></Box>
      <Typography className="chipText"> {chipVariant}</Typography>
    </Box>
  );
};

export default StatusChip;
