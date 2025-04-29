import React, { useState, MouseEvent, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ButtonToggle } from 'src/shared/components/index';
import { customInternationDate2 } from 'src/shared/utils/utils';

const CalenderHeader = ({
  label,
  onNavigate,
  view,
  handleViewOrientation,
  date
}) => {
  const [updatedLabel, setLabel] = useState(label);

  useEffect(() => {
    if (view === 'week') {
      const weekLabel = getWeekFormatHeaderForCalender(date);
      setLabel(weekLabel);
    } else if (view === 'day') {
      const weeklabel = customInternationDate2(date);
      setLabel(weeklabel);
    } else {
      setLabel(label);
    }
  }, [view, date]);

  return (
    <Box className="CalenderHeaderBar flex-basic-center p-relative">
      <Box className="d-flex nextPrevControls">
        <Box
          className="btnBox flex-basic-center cursorPointer"
          onClick={() => onNavigate('PREV')}
          sx={{ mr: 5 }}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </Box>
        <Box className="monthLabel">{updatedLabel}</Box>
        <Box
          className="btnBox flex-basic-center cursorPointer"
          onClick={() => onNavigate('NEXT')}
          sx={{ ml: 5 }}
        >
          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
        </Box>
      </Box>
      <Box className="cal-view-tabs p-absolute" sx={{ right: '18px' }}>
        <ButtonToggle
          buttons={[
            {
              content: 'Day',
              value: 'day'
            },
            {
              content: 'Week',
              value: 'week'
            },
            {
              content: 'Month',
              value: 'month'
            }
          ]}
          value={view}
          size="large"
          exclusive
          onChange={handleViewOrientation}
        />
      </Box>
    </Box>
  );
};

export default CalenderHeader;

export const getWeekFormatHeaderForCalender = (date: any): string => {
  const currentMonthNum = date.getMonth();
  if (currentMonthNum === 12) {
    const currentYear = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1
    ).getFullYear();
    const currentmonthName = date.toLocaleString('default', { month: 'long' });
    const nextMonthName = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1
    ).toLocaleString('default', { month: 'long' });
    return `${currentmonthName} - ${nextMonthName} ${currentYear}`;
  } else {
    const currentYear = date.getFullYear();
    const currentmonthName = date.toLocaleString('default', { month: 'long' });
    const nextMonthName = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1
    ).toLocaleString('default', { month: 'long' });
    return `${currentmonthName} - ${nextMonthName} ${currentYear}`;
  }
};
