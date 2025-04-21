import * as React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, SimpleDialog } from 'src/shared/components/index';
import LoadingFileAnimation from './LoadingFileAnimation';
import { styled } from '@mui/material/styles';
import './../../../scss/component/_loadingFileAnimation.scss';
import { useTranslation } from 'react-i18next';

interface CircularWithValueLabelProps {
  progressValue?: number;
  openProgressBar: boolean;
  handleProgressBarOpen: () => void;
  handleProgressBarClose: () => void;
  handleCancel: () => void;
}

const GradientCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: 'transparent',
  [`& .MuiCircularProgress-circle`]: {
    stroke: 'url(#gradient)'
  },
  circle: {
    strokeLinecap: 'round'
  }
}));

function CircularProgressWithLabel(props: CircularWithValueLabelProps) {
  const theme = useTheme();
  const { t } = useTranslation('onboarding');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <SimpleDialog
        model_content={
          <Box
            className="flex-column-center"
            sx={{
              px: 8,
              minWidth: smallDevice ? '360px' : '670px'
            }}
          >
            <Box className="loaderWithFileAnimation">
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#31125F" />
                    <stop offset="100%" stopColor="#6625C5" />
                  </linearGradient>
                </defs>
              </svg>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Box className="p-absolute backgroundProgressBarPosition">
                  <CircularProgress
                    variant="determinate"
                    color="inherit"
                    value={100}
                    thickness={2.5}
                    size={220}
                  />
                </Box>
                <GradientCircularProgress
                  color="primary"
                  size={220}
                  thickness={2.5}
                  variant="determinate"
                  value={props?.progressValue}
                />
                <Box className="flex-basic-center p-absolute fileAnimationPosition">
                  <LoadingFileAnimation />
                </Box>
              </Box>
            </Box>

            <Typography
              className="p-15 progressBarPercentage textsemiWeight"
              variant="h3"
            >
              {props.progressValue}%
            </Typography>
            <Box className="flex-column-center circularProgressBar_titleContainer">
              <Typography variant="h2" className="circularProgressBar_title">
                {t('circularProgressBarModal.crdVerification')}
              </Typography>
              <Typography
                variant="body1"
                className="circularProgressBar_subTitle"
              >
                {`${t('circularProgressBarModal.pullingADVFormLoadingText')}`}
              </Typography>
            </Box>
          </Box>
        }
        model_actions={
          <Box className="flex-basic-center w-100">
            <Button
              onClick={props.handleCancel}
              variant="outlined"
              btnText={`${t('circularProgressBarModal.cancel')}`}
              sx={{ py: '0.62rem', px: '2rem' }}
            />
          </Box>
        }
        open={props.openProgressBar}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
    </Box>
  );
}

export default function CircularWithValueLabel(
  props: CircularWithValueLabelProps
) {
  return (
    <CircularProgressWithLabel
      progressValue={props.progressValue}
      openProgressBar={props.openProgressBar}
      handleProgressBarOpen={props.handleProgressBarOpen}
      handleProgressBarClose={props.handleProgressBarClose}
      handleCancel={props.handleCancel}
    />
  );
}
