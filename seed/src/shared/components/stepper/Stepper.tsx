import * as React from 'react';
import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CombinedProps } from './services/stepperInterface';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  stepIcon: {
    color: 'red', // Custom color for the step icon
    '&$active': {
      color: '#4caf50' // Custom color for the active step icon
    },
    '&$completed': {
      color: '#2196f3' // Custom color for the completed step icon
    }
  },
  active: {},
  completed: {},
  stepper: {
    '& .MuiSvgIcon-root': {
      '& .MuiStepIcon-text': {
        visibility: 'visible'
      }
    }
  },
  stepperLineConnectore: {
    '& .MuiStepConnector-line': {
      display: 'none'
    }
  }
}));

export const Stepper = ({
  stepsList,
  activestep,
  orientation,

  ...props
}: CombinedProps) => {
  const classes = useStyles();
  const { t } = useTranslation('english');
  return (
    <MuiStepper
      activeStep={activestep}
      orientation={orientation}
      data-testid="muistepper"
      className={classes.stepperLineConnectore}
      {...props}
    >
      {stepsList.map((step) => (
        <Step key={step.key} {...props}>
          <StepLabel className={classes.stepper} {...props}>
            {t(step.value)}
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};
export default Stepper;
