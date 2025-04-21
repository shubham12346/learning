// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';
import MediaControlCard from './CardFirstType';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Card> = {
  title: 'Avery/Card Component',
  component: Card
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardWithAlert: Story = {
  render: (args) => <MediaControlCard color={args.color} /> ,
  args: {
    color: '#E73A35',
    elevation:2,
    
  }
  
};

export const CardWithWarning: Story = {
  render: (args) => <MediaControlCard color={args.color} /> ,
  args: {
    color: '#E89B29'
  }
};

export const CardWithSuccess: Story = {
  render: (args) => <MediaControlCard color={args.color} /> ,
  args: {
    color: '#54B7D3'
  }
};