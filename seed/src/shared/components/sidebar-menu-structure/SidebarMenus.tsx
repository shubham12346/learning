import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, List, Button, ListItem } from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { SidebarContext } from 'src/providers/SidebarContext';
import { RootState } from 'src/store/reducer';
import { useSelector } from 'react-redux';

interface sidebarmenuprops {
  option: sidebarprop[];
}

export interface sidebarprop {
  pathname: string;
  subpathname: string;
  icon: JSX.Element;
  submenuname: string;
}
export const SidebarMenus = ({ option }: sidebarmenuprops) => {
  const { closeSidebar } = useContext(SidebarContext);
  const { t } = useTranslation('sidebarmenu');
  const location = useLocation();
  const { tourDetails } = useSelector((state: RootState) => state.tour);

  useEffect(() => {
    let element;
    if (tourDetails?.tourStatus === 'pending' && tourDetails?.componentName) {
      let comCls = tourDetails.componentName.split(' ').join('');
      element = document.querySelectorAll(`.${comCls}`);
    } else {
      element = document.getElementsByClassName('active');
    }
    element[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [location, tourDetails]);

  return (
    <Box className="MenuWrapper ">
      <List component="div">
        <Box className="SubMenuWrapper">
          <List component="div">
            {option.map((item, index) => {
              return (
                <ListItem
                  component="div"
                  className={` ${item?.submenuname.split(' ').join('')} `}
                  key={item.subpathname}
                >
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={`/${item.pathname}/${item.subpathname}`}
                    startIcon={item.icon}
                  >
                    {t(item.submenuname)}
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </List>
    </Box>
  );
};
