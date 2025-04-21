import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';

export default {
  title: 'Avery/Chip component',
  component: Chip,
  argTypes: {}
} as Meta;

type Story = StoryObj<typeof Chip>;

export const DefaultChip: Story = {
  args: {
    lable: 'Avery',
    color: 'primary',
    variant: 'outlined'
  }
};
export const PrimaryDoneChip: Story = {
  args: {
    lable: 'Avery',
    color: 'primary',
    variant: 'outlined',
    deleteIcon: <DoneIcon />
  }
};
export const WarningDeleteChip: Story = {
  args: {
    lable: 'Avery',
    color: 'warning',
    variant: 'outlined',
    deleteIcon: <DeleteIcon />
  }
};
export const AvtarChip: Story = {
  args: {
    lable: 'Avery',
    color: 'info',
    variant: 'outlined',
    deleteIcon: <DeleteIcon />,
    avatar: <HdrAutoIcon />
  }
};
