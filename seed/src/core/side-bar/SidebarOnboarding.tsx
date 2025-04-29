import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Logo, Scrollbar } from 'src/shared/components/index';

const SidebarOnboarding = (props) => {
  const { children } = props;
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = isLg ? 'large SidebarWrapper ' : 'small SidebarWrapper';
  const wrapperclass =
    theme.palette.mode === 'dark'
      ? 'sidebarwrapperDark'
      : 'sidebarwrapperLight';
  const finalclass = `${classes} ${wrapperclass}`;

  return (
    <Box className={finalclass}>
      <Scrollbar>
        <Box mt={3}>
          <Box>
            <Logo />
          </Box>
        </Box>
        <Box mx={5}>{children}</Box>
      </Scrollbar>
    </Box>
  );
};

export default SidebarOnboarding;
