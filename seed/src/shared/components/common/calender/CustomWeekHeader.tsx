import { Box } from '@mui/material';
import Typography from '../../typography/Typography';
import moment from 'moment';

const CustomWeekHeader = ({ date }) => {
  let dayNum = date.getDate();
  let todayDate = moment().format('D/MM/YYYY');
  let isCurrent = todayDate === moment(date).format('D/MM/YYYY') ? true : false;
  const weekCurrentDate = isCurrent ? 'weekHeaderClassCurrentDate' : '';

  return (
    <Box className={'customWeekHeaderClass'}>
      <Typography variant="overline">{moment(date).format('ddd')}</Typography>
      <Typography variant="h4" className={weekCurrentDate}>
        {dayNum}
      </Typography>
    </Box>
  );
};

export default CustomWeekHeader;