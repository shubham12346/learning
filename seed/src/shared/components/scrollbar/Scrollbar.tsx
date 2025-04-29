import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box, useTheme } from '@mui/material';

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
}

export const Scrollbar: FC<ScrollbarProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <Scrollbars
      autoHide
      renderThumbVertical={() => {
        return <Box className="Scrollbar" />;
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
