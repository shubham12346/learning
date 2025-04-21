import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Hidden, Popover } from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { useAuth } from 'src/providers/AuthguardContext';
import { Typography } from 'src/shared/components/index';
import { ROLE_LIST } from '../TopNavBar';
import { getLoggedInUserDetail } from 'src/modules/Setting/api/settingAPI';
import { selectCommon } from 'src/modules/common/services/common.service';
import { useSelector } from 'react-redux';
import { getInitials } from 'src/shared/utils/utils';
import { PRIMARY_COLOR } from 'src/shared/constants/constants';

const HeaderUserbox = (props) => {
  //const
  const { userData } = props;

  //redux
  const { loggedInUserData } = useSelector(selectCommon);

  //state variables
  const [userName, setUserName] = useState<string>('');

  //logout options
  const options = [
    {
      id: 'logout',
      icon: 'icon-logout',
      label: 'Logout'
    }
  ];

  //state variables
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useAuth();

  useEffect(() => {
    fetchUserData();
  }, [loggedInUserData]);

  //methdos
  async function fetchUserData() {
    try {
      const respData = await getLoggedInUserDetail(userData?.userUid);
      setUserName(respData?.name);
    } catch (err) {
      console.log('err : ', err.message);
    }
  }

  const navigateTo = (item) => {
    switch (item?.id) {
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  };

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  //Avatar initials
  const stringAvatar = (name: string = 'User Name') => {
    return {
      sx: {
        bgcolor: PRIMARY_COLOR
      },
      children: getInitials(name)
    };
  };

  return (
    <>
      <Button
        className={`${
          ROLE_LIST.includes(userData.role) ? 'text-blur' : ''
        } topNavUserSection`}
        color="secondary"
        ref={ref}
        onClick={handleOpen}
      >
        <Avatar
          variant="circular"
          alt={'user avatar'}
          {...stringAvatar(userName)}
        />
        <Hidden mdDown>
          <Box className="UserBoxText">
            <Typography className="text-ellipsis userNameWidth" variant="body2">
              {userName}
            </Typography>
          </Box>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </Button>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        className="logOutButton"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box>
          {options?.map((item, index) => (
            <Box
              className="logoutDropBox"
              key={`${index}-${item?.label || ''}`}
              onClick={() => navigateTo(item)}
            >
              <Box
                sx={{ px: 6, py: 4 }}
                className="flex-basic-start logoutDropBoxList"
              >
                <Box sx={{ pr: 3 }} className="flex-basic-center">
                  <Box className={`${item?.icon}`}></Box>
                </Box>
                <Box>{item?.label}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default HeaderUserbox;
