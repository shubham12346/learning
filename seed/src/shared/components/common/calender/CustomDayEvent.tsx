import { Box, Tooltip } from '@mui/material';

const CustomDayEvent = ({ event, onEdit, onDelete, actions }) => {
  return (
    <Box>
      <Box className="eventBox">
        <Tooltip title={event.eventTitle} arrow>
          <Box className="eventTitle" sx={{ mb: 2 }}>
            {event?.regulatoryBody
              ? event?.regulatoryBody + ' : ' + event.eventTitle
              : event.eventTitle}{' '}
          </Box>
        </Tooltip>
        <Box className="eventDescritpion">
          {event?.description?.length >= 1
            ? event?.description
            : 'No description'}
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

export default CustomDayEvent;
