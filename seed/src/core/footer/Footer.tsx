import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginFormFooterLogo from '../../assets/svg/by-regvers-bottom-logo.svg';

function Footer() {
  const { t } = useTranslation('english');
  return (
    <Box
      sx={{ py: 4, px: 7 }}
      className="footer-wrapper flex-basic-space-between"
    >
      <Box className="flex-basic-center">
        <Box className="flex-basic-center" sx={{ mr: 2 }}>
          <img alt="footerLogo" src={LoginFormFooterLogo} />
        </Box>
      </Box>
      <Box className="flex-basic-center termsofService">
        {/* <Box sx={{ mr: 10 }}>
          <Typography variant="body1">{t('termsofService')}</Typography>
        </Box> */}
        <Box>
          <Link
            href={`https://www.regverse.com/privacy-policy`}
            target="_blank"
          >
            <Typography variant="body1">{t('privacyPolicy')}</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
