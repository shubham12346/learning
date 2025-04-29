import { Box } from '@mui/system';
import moment from 'moment';
import Typography from '../../typography/Typography';

const CustomDayHeader = ({ label, date }) => {
  let dayNum = date.getDate();
  let dayName = moment(date).format('ddd');
  return (
    <Box className="flex-column-start dayHeader">
      <Typography variant="overline">{dayName}</Typography>
      <Typography variant="h4">{dayNum}</Typography>
    </Box>
  );
};

export default CustomDayHeader;
