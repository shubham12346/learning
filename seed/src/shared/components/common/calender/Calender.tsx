import { useCallback, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalenderHeader from './CalenderHeader';
import CalenderEvent from './CalenderEvent';
import CustomDayHeader from './CustomDayHeader';
import CustomWeekHeader from './CustomWeekHeader';
import { Box } from '@mui/material';
import CustomDayEvent from './CustomDayEvent';

const localizer = momentLocalizer(moment);
export type CalendarEventType = {
  id?: string;
  eventTitle?: string;
  description?: string;
  start: Date;
  end: Date;
  regulatoryBody?: string;
  navigateLink?: string;
};

export type calenderTypeProp = {
  handleEventClick?: (event: any) => void;
  handleEdit: (e, event: any) => void;
  handleDelete: (e, event: any) => void;
  events: CalendarEventType[];
  actions?: string[];
  loader?: boolean;
};

const MyCalendar = (props: calenderTypeProp) => {
  //const
  const {
    handleDelete,
    handleEdit,
    handleEventClick,
    events,
    actions,
    loader
  } = props;
  const [views, setViews] = useState<'month' | 'day' | 'week'>(Views.MONTH);
  const handleviews = useCallback(
    (newValue) => {
      setViews(newValue);
    },
    [setViews]
  );

  const handleViewOrientation = (
    _event: any,
    newValue: 'day' | 'month' | 'week' | null
  ) => {
    if (newValue) {
      setViews(newValue);
    }
  };
  return (
    <>
      {loader ? (
        <Box className="flex-basic-center mt-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <Box className="calenderWrapper">
          <Calendar
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventClick}
            showAllEvents={false}
            onView={handleviews}
            view={views}
            views={[Views.DAY, Views.WEEK, Views.MONTH]}
            components={{
              month: {
                event: (props) => (
                  <CalenderEvent
                    {...props}
                    actions={actions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )
              },
              toolbar: (props) => (
                <CalenderHeader
                  {...props}
                  handleViewOrientation={handleViewOrientation}
                  view={views}
                />
              ),
              day: {
                header: CustomDayHeader,
                event: (props) => (
                  <CustomDayEvent
                    {...props}
                    actions={actions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )
              },
              week: {
                header: CustomWeekHeader,
                event: (props) => (
                  <CalenderEvent
                    {...props}
                    actions={actions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )
              }
            }}
          />
        </Box>
      )}
    </>
  );
};

export default MyCalendar;
