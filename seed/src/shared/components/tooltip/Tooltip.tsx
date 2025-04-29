import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

export const Tooltip = (props) => {
  const {
    open = false,
    title,
    arrow = true,
    placement = 'right',
    onClose = () => null,
    children
  } = props;

  return (
    <MuiTooltip
      arrow={arrow}
      open={open}
      placement={placement}
      onClose={onClose}
      title={<React.Fragment>{title}</React.Fragment>}
    >
      {children}
    </MuiTooltip>
  );
};
