import { Box, Typography } from '@mui/material';
import { sidenavPropType } from '../model/settingModel';

const Sidenav = (props: sidenavPropType) => {
  const { id, menu, menuChange, selectedItem } = props;

  const handleChange = (e) => {
    menuChange(e, { menu, id });
  };
  return (
    <Box className="navItem cursorPointer" onClick={handleChange}>
      <Box
        className={`d-flex flex-basic-space-between ${
          selectedItem ? 'selectedNav ' : 'nav'
        } `}
      >
        <Typography className={`${selectedItem ? 'textweight' : ''}`}>
          {menu}
        </Typography>
        {selectedItem && (
          <Box className="d-flex flex-basic-center justify-content-center align-items-center rightArrow">
            <span className="icon-ic_right-arrow  "></span>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidenav;
