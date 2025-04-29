import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AVERY_HELP_Link } from 'src/shared/constants/constants';
import LoginFormLogo from '../../assets/svg/avery_logo_new.svg';

const Header = () => {
  const { t } = useTranslation('english');
  return (
    <Box
      sx={{ p: 10 }}
      className="HeaderWrapper header-height flex-basic-space-between"
    >
      <Box sx={{ pt: 4 }}>
        <img src={LoginFormLogo} width={165} />
      </Box>
      <Box>
        <a
          href={AVERY_HELP_Link}
          target="_blank"
          className="cursorPointer d-flex"
          rel="noreferrer"
        >
          <Typography className="textsemiWeight" sx={{ mr: 1 }} variant="body1">
            {t('getHelp')}
          </Typography>
          <HelpOutlineOutlinedIcon />
        </a>
      </Box>
    </Box>
  );
};

export default Header;
