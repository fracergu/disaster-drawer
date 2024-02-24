import '../styles.scss'

import type { Meta, StoryObj } from '@storybook/react'

import { NeonButton } from '../components/Neon'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Disaster Drawer/Neon/Button',
  component: NeonButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: 'text' }
  }
} satisfies Meta<typeof NeonButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Click me!',
    onClick: () => alert('You clicked me!')
  }
}

export const Outline: Story = {
  args: {
    label: 'Click me!',
    variant: 'outline',
    onClick: () => alert('You clicked me!')
  }
}
