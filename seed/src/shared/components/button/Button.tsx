import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ButtonProps } from './services/buttonInterface';

const useStyles = makeStyles({
  iconOnly: {
    '& .MuiButton-startIcon': {
      marginRight: 0,
      marginLeft: 0
    }
  }
});

export const Button = ({ btnText, icon, btnClass, ...props }: ButtonProps) => {
  const classes = useStyles();
  return (
    <MuiButton
      startIcon={icon}
      component="span"
      sx={{
        padding: btnText ? '6px 16px' : '6px'
      }}
      className={btnText ? btnClass : classes.iconOnly}
      {...props}
    >
      {btnText}
    </MuiButton>
  );
};
