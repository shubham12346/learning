import { Box, Tooltip, Typography } from '@mui/material';

const CalenderEvent = ({ event, onEdit, onDelete, actions }) => {
  const eventLabel =
    event.eventTitle.length >= 20
      ? event.eventTitle.slice(0, 17) + '...'
      : event.eventTitle;
  return (
    <Box>
      <Box className="eventBox">
        {event.eventTitle.length >= 20 ? (
          <Tooltip title={event.eventTitle} arrow>
            <Box className="eventTitle" sx={{ mb: 2 }}>
              {event?.regulatoryBody
                ? event?.regulatoryBody + ' : ' + eventLabel
                : eventLabel}
            </Box>
          </Tooltip>
        ) : (
          <Box className="eventTitle" sx={{ mb: 2 }}>
            {event?.regulatoryBody
              ? event?.regulatoryBody + ' : ' + eventLabel
              : eventLabel}
          </Box>
        )}

        <Box className="eventDescritpion" sx={{ minHeight: '30px' }}>
          {event.description}
        </Box>
        {actions?.includes('edit-tasks') && (
          <Box className="bottomControls">
            <Box className="eventActionBtn p-absolute d-flex">
              <Box
                className="flex-basic-center"
                onClick={(e) => onEdit(e, event)}
                sx={{ mr: 4 }}
              >
                <span className="icon-edit iconStyle"></span>
              </Box>
              <Box
                className="flex-basic-center"
                onClick={(e) => onDelete(e, event)}
              >
                <span className="icon-trash iconStyle"></span>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CalenderEvent;
