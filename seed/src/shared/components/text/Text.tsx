import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Box from '@mui/material/Box';
interface TextProps {
  className?: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
    | 'black';
  flex?: boolean;
  children?: ReactNode;
}

export const Text: FC<TextProps> = ({
  className,
  color = 'secondary',
  flex,
  children,
  ...rest
}) => {
  return (
    <Box
      className={clsx('TextWrapper MuiText-' + color, { flexItem: flex })}
      {...rest}
    >
      {children}
    </Box>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'success',
    'info',
    'black'
  ])
};
