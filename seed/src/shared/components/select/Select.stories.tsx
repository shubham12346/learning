import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const themeOptions = [
  {
    id: 'PureLightTheme',
    name: 'PureLightTheme'
  },

  {
    id: 'NebulaFighterTheme',
    name: 'NebulaFighterTheme'
  }
];

export default {
  title: 'Avery/Select',
  component: Select,
  argTypes: {
    onChange: { action: 'Some Action' }
  }
} as Meta;

type Story = StoryObj<typeof Select>;


export const SelectField: Story = {
  args: {
    label: 'Select Theam',
    options: themeOptions,
    itemText:"id",
    itemValue: "name"  
  }
};