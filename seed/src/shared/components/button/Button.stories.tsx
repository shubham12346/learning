import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default {
  title: 'Avery/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'Button clicked' },
    backgroundColor: { control: 'color' },
    size: {
      control: {
        type: 'inline-radio',
        options: ['small', 'medium', 'large']
      }
    },
    buttonType: {
      control: {
        type: 'inline-radio',
        options: ['contained', 'outlined', 'text']
      }
    }
  }
} as Meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    size: 'small',
    variant: 'contained',
    btnText: 'Save'
  }
};

export const SecondaryButton: Story = {
  args: {
    size: 'medium',
    variant: 'outlined',
    btnText: 'Save'
  }
};

export const TertiaryButton: Story = {
  args: {
    size: 'large',
    variant: 'text',
    btnText: 'Save'
  }
};

export const IconOnlyButton: Story = {
  args: {
    size: 'large',
    variant: 'outlined',
    icon: <CloudDownloadIcon />
  }
};

export const IconTextButton: Story = {
  args: {
    ...IconOnlyButton.args,
    btnText: 'Save'
  }
};

export const DisabledButton: Story = {
  args: {
    size: 'large',
    variant: 'outlined',
    btnText: ' Save',
    disabled: true
  }
};
