import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Badge } from './Badge';

export default {
  title: 'Seed/Badge',
  component: Badge,
  argTypes: {}
} as Meta;

type Story = StoryObj<typeof Badge>;

export const PrimaryBadge: Story = {
  args: {
    classes: 'MuiBadge-badge',
    badgeContent: '1',
    color: 'primary',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }
};
export const SecondaryBadge: Story = {
  args: {
    classes: 'MuiBadge-badge',
    badgeContent: '1',
    color: 'secondary',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }
};
export const WarningBadge: Story = {
  args: {
    classes: 'MuiBadge-badge',
    badgeContent: '1',
    color: 'warning',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }
};
