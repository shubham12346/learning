import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

export default {
  title: 'Avery/Stepper Component',
  component: Stepper,
  argTypes: {}
} as Meta;

type Story = StoryObj<typeof Stepper>;

export const HorizontalStepper: Story = {
  args: {
    stepsList: [
      {
        value: 'Hello team1',
        key: 1
      },
      {
        value: 'Hello team2',
        key: 2
      },
      {
        value: 'Hello team3',
        key: 3
      },
      {
        value: 'Hello team4',
        key: 4
      }
    ],
    activestep: 0,
    orientation: 'horizontal'
  }
};
export const VerticalStepper: Story = {
  args: {
    stepsList: [
      {
        value: 'Hello team1',
        key: 1
      },
      {
        value: 'Hello team2',
        key: 2
      },
      {
        value: 'Hello team3',
        key: 3
      },
      {
        value: 'Hello team4',
        key: 4
      }
    ],
    activestep: 0,
    orientation: 'vertical'
  }
};
