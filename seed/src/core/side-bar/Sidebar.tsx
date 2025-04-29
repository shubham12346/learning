import { Box, useTheme, useMediaQuery } from '@mui/material';
import LoginFormFooterLogo from '../../assets/svg/by-regvers-bottom-logo.svg';
import SidebarMenu from './sidebar-menu/SidebarMenu';

const Sidebar = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('md'));
  const classes = isLg ? 'large SidebarWrapper ' : 'small SidebarWrapper';
  const wrapperclass =
    theme.palette.mode === 'dark'
      ? 'sidebarwrapperDark'
      : 'sidebarwrapperLight';
  const finalclass = `${classes} ${wrapperclass}`;
  return (
    <Box className={finalclass}>
      <Box className="sidebarScroll">
        <SidebarMenu />
      </Box>
      <Box sx={{ px: 6, pt: 5 }}>
        <img alt="sidebarLogo" width={154} src={LoginFormFooterLogo} />
      </Box>
    </Box>
  );
};

export default Sidebar;
