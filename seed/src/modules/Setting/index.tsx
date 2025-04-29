import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AccountDetails from './component/accountDetail/AccountDetails';
import SettingSubmenu from './component/SettingSubmenu';
import { sidebaritems } from './component/constant';
import { useTranslation } from 'react-i18next';
import MFASetup from './component/accountDetail/MFASetup';
import ChatBotList from './component/accountDetail/ChatBotList';
import { useSelector } from 'react-redux';
import { selectCommon } from 'src/modules/common/services/common.service';
import { ORGANIZATION_ROLE_ENUM } from 'src/shared/constants/constants';
const Setting = () => {
  //const
  const { userData } = useSelector(selectCommon);
  const { t } = useTranslation('setting');
  const role = userData?.role;

  //get default menu
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page'); // Extract 'id' parameter
  //states variables
  const [menuList, setMenuList] = useState(sidebaritems || []);
  const [selectedMenu, setSelectedMenu] = useState(page?'3':'1');

  useEffect(() => {
    if (role === ORGANIZATION_ROLE_ENUM.ADMINISTRATION_ADMIN) {
      setMenuList((prevMenu) => [
        ...prevMenu,
        { menu: 'Chatbot Config', id: '3' }
      ]);
    }
  }, []);

  // metods
  const handleMenuChange = (event, menuobj) => {
    setSelectedMenu(menuobj.id);
  };

  const renderSelectedMenu = (selectedMenu) => {
    switch (selectedMenu) {
      case '1':
        return <AccountDetails />;
      case '2':
        return <MFASetup />;
      case '3':
        return <ChatBotList />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="setting">
        <Box className="settingHead mb-28">
          <Typography variant="h3"> {t('settingTitle')}</Typography>
        </Box>
        <Grid container>
          <Grid
            sx={{ mb: { xs: 5, sm: 5, md: 5, lg: 0, xl: 0 } }}
            item
            xs={12}
            md={12}
            lg={3}
            xl={3}
          >
            <SettingSubmenu
              handleMenuChange={handleMenuChange}
              menuList={menuList}
              selectedMenu={selectedMenu}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={9} xl={9}>
            <Box>{renderSelectedMenu(selectedMenu)}</Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Setting;
