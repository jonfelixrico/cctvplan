import type { Meta, StoryObj } from '@storybook/vue3'
import FloorPlan from './FloorPlan.vue'

// Meta information for the component
const meta: Meta<typeof FloorPlan> = {
  title: 'Visualizer/FloorPlan',
  component: FloorPlan,
  argTypes: {
    segments: {
      control: 'object',
      description: 'Array of segments defining the floor plan path',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic square floor plan
export const Square: Story = {
  args: {
    segments: [
      { direction: 'right', distance: 100 },
      { direction: 'down', distance: 100 },
      { direction: 'left', distance: 100 },
      { direction: 'up', distance: 100 },
    ],
  },
}

// L-shaped floor plan
export const LShape: Story = {
  args: {
    segments: [
      { direction: 'right', distance: 100 },
      { direction: 'down', distance: 150 },
      { direction: 'left', distance: 50 },
      { direction: 'up', distance: 100 },
      { direction: 'left', distance: 50 },
      { direction: 'up', distance: 50 },
    ],
  },
}

// Complex floor plan
export const Complex: Story = {
  args: {
    segments: [
      { direction: 'right', distance: 100 },
      { direction: 'down', distance: 50 },
      { direction: 'right', distance: 50 },
      { direction: 'down', distance: 75 },
      { direction: 'left', distance: 150 },
      { direction: 'up', distance: 125 },
    ],
  },
}
