import { Box, CardContent } from '@mui/material';
import Sidenav from './Sidenav';
import { settingSidemenuProps } from '../model/settingModel';

const SettingSubmenu = (props: settingSidemenuProps) => {
  const { handleMenuChange, menuList, selectedMenu } = props;

  return (
    <Box
      sx={{ mr: { xl: 9, lg: 9, md: 0, sm: 0, xs: 0 } }}
      className="submenuWrapper"
    >
      <CardContent>
        {menuList?.map((menu) => (
          <Sidenav
            id={menu.id}
            selectedItem={menu.id === selectedMenu}
            menu={menu.menu}
            key={menu.id}
            menuChange={handleMenuChange}
          />
        ))}
      </CardContent>
    </Box>
  );
};

export default SettingSubmenu;
