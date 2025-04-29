import { Divider, ListItemIcon, Menu, MenuItem, Box } from '@mui/material';

const MenuView = ({
  menuItemList,
  onMenuClick,
  handleClose,
  isOpen,
  anchorEl,
  isDisabled = false,
}) => {
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      className="dropMenuView"
      sx={{ p: 0 }}
    >
      {menuItemList.map((menuItem, index) => {
        const disableViewActionPlanMenuItem = menuItem.label=== 'View Action Plan' && isDisabled;
        return (
          <Box key={index}>
            <MenuItem
               onClick={() => onMenuClick(menuItem.id)}
               disabled={disableViewActionPlanMenuItem}
              className="tenant-menu-item"
            >
              <ListItemIcon 
              // onClick={() => onMenuClick(menuItem.id)} 
               >
                {menuItem.icon}
              </ListItemIcon>
              {menuItem.label}
            </MenuItem>
            <Divider />
          </Box>
        );
      })}
    </Menu>
  );
};

export default MenuView;
