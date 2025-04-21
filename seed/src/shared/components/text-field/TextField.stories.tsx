import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { InputAdornment } from '@mui/material';

export default {
  title: 'Avery/TextField',
  component: TextField,
  argTypes: {
    onChange: { action: 'Some Action' }
  }
} as Meta;

type Story = StoryObj<typeof TextField>;

export const EmptyInput: Story = {
  args: {
    variant: 'outlined',
    label: 'Label'
  }
};

export const FilledInput: Story = {
  args: {
    variant: 'outlined',
    label: 'Filled',
    value: 'Label'
  }
};

export const ErrorInput: Story = {
  args: {
    variant: 'outlined',
    label: 'Error',
    error: true,
    helperText: 'Error'
  }
};

export const Textarea: Story = {
  args: {
    variant: 'outlined',
    label: 'Textarea',
    minRows: 8
  }
};

export const Disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled',
    disabled: true,
    defaultValue: 'Disabled Button'
  }
};

export const Password: Story = {
  args: {
    variant: 'outlined',
    label: 'Password Field',
    type: 'password'
  }
};

export const ReadOnly: Story = {
  args: {
    variant: 'outlined',
    label: 'ReadOnly',
    InputProps: {
      readOnly: true
    },
    defaultValue: 'ReadOnly Field'
  }
};

export const NumberOnly: Story = {
  args: {
    variant: 'outlined',
    label: 'Enter a Number',
    type: 'number'
  }
};

export const SearchField: Story = {
  args: {
    variant: 'outlined',
    label: 'Search',
    type: 'search'
  }
};

export const PrependIcon: Story = {
  args: {
    variant: 'outlined',
    label: 'Dollars',
    InputProps: {
      startAdornment: <InputAdornment position="start">$</InputAdornment>
    }
  }
};

export const AppendIcon: Story = {
  args: {
    variant: 'outlined',
    label: 'Weight',
    InputProps: {
      endAdornment: <InputAdornment position="end">kg</InputAdornment>
    }
  }
};

export const FullWidth: Story = {
  args: {
    variant: 'outlined',
    label: 'Full Width Field',
    fullWidth: true
  }
};
