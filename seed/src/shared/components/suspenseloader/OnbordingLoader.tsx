import { useEffect } from 'react';
import NProgress from 'nprogress';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Skeleton
} from '@mui/material';
import CircularProgressLoader from '../loader/loader';
import Typography from '../typography/Typography';
import { useTranslation } from 'react-i18next';

export const OnbordingScreenLoader = () => {
  const { t } = useTranslation('english');
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Container
      className="onboarding-section  h-100-vh"
      sx={{ px: 0 }}
      maxWidth={false}
    >
      <Grid container>
        <Grid
          className="onboarding-side-bar"
          sx={{ p: 10 }}
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
        >
          <Skeleton
            variant="rectangular"
            className="w-40 border-radius-8"
            height={60}
            sx={{ mb: 28 }}
          />
          <Skeleton
            variant="rectangular"
            className="w-100  mt-40 border-radius-8"
            height={30}
          />
          <Skeleton
            variant="rectangular"
            className="w-100  mt-40 border-radius-8"
            height={30}
          />
          <Skeleton
            variant="rectangular"
            className="w-100 mt-40 border-radius-8"
            height={30}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <Box className="h-100-vh w-100 flex-column-center">
            <CircularProgressLoader></CircularProgressLoader>
            <br />
            <Typography className="mt-44 " variant="body1">
             { t('loadingScreen')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
