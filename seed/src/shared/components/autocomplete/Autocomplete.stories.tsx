import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import { TextField } from '@mui/material';

export default {
  title: 'Avery/Autocomplete',
  component: Autocomplete,
  argTypes: {
    onChange: { action: 'Some Action' }
  },
} as Meta;

type Story = StoryObj<typeof Autocomplete>;

const optionList = [
  {
    label: 'Item 1',
    value: '1',
  },
  {
    label: 'Item 2',
    value: '2',
  },
  {
    label: 'Item 3',
    value: '3',
  },
];


export const SingleSelectAutocomplete: Story = {
  render : (args) =>  <Autocomplete {...args} />,
  args:  {
    options: optionList,
    style: {
      width: 500,
    },
    placeholder: 'Items',
    renderInput:(params) => <TextField {...params} label="Item" />
  }
};
 

export const MultiSelectAutocomplete: Story = {
  render : (args) =>  <Autocomplete {...args} />,
  args:  {
    options: optionList,
    style: {
      width: 500,
    },
    placeholder: 'Items',
    multiple: true,
    disableCloseOnSelect: true,
    renderInput:(params) => <TextField {...params} label="Item" />
  }
};
 

// export const Combobox: Story = {
//   render : (args) =>  <Autocomplete {...args} />,
//   args:  {
//     options: optionList,
//     multiple: true,
//     style: {
//       width: 500,
//     },
//     disableCloseOnSelect: true,
//     renderInput:(params) => <TextField {...params} label="Item" />
//   }
// };
 
 