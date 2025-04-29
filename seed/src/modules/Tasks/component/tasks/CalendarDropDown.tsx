import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { customInternationDate, getTimeStamp } from 'src/shared/utils/utils';
import { DropDownProps } from '../../model/taskModel';

const CalendarDropDown = (props: DropDownProps) => {
  const {
    anchorEl,
    handleCloseDownDown,
    handleMenuItemClick,
    handleMenuClick,
    lastSyncedDate
  } = props;

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleMenuClick}
        className="maxContent dropDown"
      >
        Sync With Calendar
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseDownDown}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          disablePadding: true,
          sx: { p: 0 }
        }}
      >
        <MenuItem onClick={handleMenuItemClick} className="dropDownList">
          <Box>
            <Box sx={{ px: 1.2, py: 0.8 }}>
              <Box className="d-flex align-items-center">
                <Box className="mr-10">{'MICROSOFT OUTLOOK'}</Box>
                {lastSyncedDate?.lastSyncAt && !lastSyncedDate?.syncAvailable && (
                  <Box
                    className="syncedBox text-font-12"
                    sx={{ py: 1, px: 1.2 }}
                  >
                    {'SYNCED'}
                  </Box>
                )}
              </Box>
              {lastSyncedDate?.lastSyncAt && (
                <Box className="text-font-12">
                  {customInternationDate(
                    lastSyncedDate?.lastSyncAt || new Date().toISOString()
                  )}
                  ,
                  {getTimeStamp(
                    lastSyncedDate?.lastSyncAt || new Date().toISOString()
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CalendarDropDown;
