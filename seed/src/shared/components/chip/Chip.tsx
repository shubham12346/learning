import * as React from 'react';
import { Chip as MuiChip } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ChipProps } from './services/chipInterface';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  avtarStyle: {
    '& .MuiAvatar-root': {
      display: 'none'
    }
  }
});

export const Chip = ({
  lable,
  color,
  variant,
  deleteIcon,
  avatar,
  ...props
}: ChipProps) => {
  const classes = useStyles();
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <MuiChip
        label={lable}
        color={color}
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={deleteIcon}
        variant={variant}
        avatar={avatar ?? <Avatar src="{avatar}" variant="circular"></Avatar>}
        className={classes.avtarStyle}
        {...props}
      />
    </Stack>
  );
};
