import { Box } from '@mui/material';
import './../../../scss/component/_loader.scss';

// Inspired by the former Facebook spinners.
function CircularProgressLoader() {
  return (
    <Box className="progress-container">
      <Box className="progress-outer">
        <Box className="progress-inner"></Box>
        <Box className="progress-end-dot"></Box>
      </Box>
    </Box>
  );
}
export default CircularProgressLoader;
