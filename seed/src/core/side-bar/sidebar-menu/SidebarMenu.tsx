import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCommon } from 'src/modules/common/services/common.service';
import { SidebarMenus } from 'src/shared/components/index';
import * as ROUTES from 'src/shared/constants/routes';
import { SIDEBAR_MENU } from './utils';
import { RootState } from 'src/store/reducer';

export const PARTNER_ADMIN = [
  {
    pathname: ROUTES.BASEPATH,
    subpathname: ROUTES.COMPANIES,
    icon: <Box className="icon-company font-24" />,
    submenuname: 'companies'
  }
];

const SidebarMenu = () => {
  const { userData } = useSelector(selectCommon);
  const [userType, setUserType] = useState([]);

  const { fusion1 } = useSelector((state: RootState) => state.common);

  const generateSideBarOptions = (role, fusion1 = null) => {
    if (role) {
      const options = SIDEBAR_MENU[role];
      const sideBarMenu = options.map((ele) => {
        return { ...ele, icon: <Box className={`${ele.iconLabel} font-24`} /> };
      });
      let updatedMenu = fusion1
        ? [
            ...sideBarMenu,
            {
              pathname: ROUTES.BASEPATH,
              subpathname: ROUTES.DATA_COPILOT,
              iconLabel: 'icon-averyAI',
              submenuname: 'Data Copilot',
              icon: (
                <Box
                  className={` font-24 icon-robot-happy-outline DataCopilot`}
                />
              )
            }
          ]
        : sideBarMenu;

      setUserType(updatedMenu);
    }
  };

  useEffect(() => {
    if (fusion1) {
      generateSideBarOptions(userData?.role, true);
    } else {
      generateSideBarOptions(userData?.role);
    }
  }, [userData, fusion1]);

  return <SidebarMenus option={userType} />;
};

export default SidebarMenu;
