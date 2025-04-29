import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

interface LabelProps {
  className?: string;
  color?:
    | 'primary'
    | 'black'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info';
  children?: ReactNode;
}

export const Label: FC<LabelProps> = ({
  className,
  color = 'secondary',
  children,
  ...rest
}) => {
  return (
    <Box className={'LabelWrapper MuiLabel-' + color} {...rest}>
      {children}
    </Box>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'black',
    'secondary',
    'error',
    'warning',
    'success',
    'info'
  ])
};
