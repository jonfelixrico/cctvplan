import type { Meta, StoryObj } from '@storybook/vue3'
import FovCone from './FovCone.vue'

const meta: Meta<typeof FovCone> = {
  title: 'Visualizer/FovCone',
  component: FovCone,
  tags: ['autodocs'],
  // Wrap in an SVG since this is an SVG path component
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<svg width="500" height="500" viewBox="-250 -250 500 500"><story /></svg>',
    }),
  ],
  // Define default args
  args: {
    segments: [
      { distance: 50, color: 'rgba(255, 0, 0, 0.5)' },
      { distance: 50, color: 'rgba(0, 255, 0, 0.5)' },
      { distance: 50, color: 'rgba(0, 0, 255, 0.5)' },
    ],
    viewingAngle: 90,
    rotation: 0,
    origin: { x: 0, y: 0 },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic cone story
export const Default: Story = {}

// Wide angle cone
export const WideAngle: Story = {
  args: {
    viewingAngle: 135,
    segments: [
      { distance: 60, color: 'rgba(255, 0, 0, 0.5)' },
      { distance: 60, color: 'rgba(0, 255, 0, 0.5)' },
    ],
  },
}

// Narrow angle cone
export const NarrowAngle: Story = {
  args: {
    viewingAngle: 45,
    segments: [
      { distance: 80, color: 'rgba(255, 0, 0, 0.5)' },
      { distance: 40, color: 'rgba(0, 255, 0, 0.5)' },
      { distance: 40, color: 'rgba(0, 0, 255, 0.5)' },
    ],
  },
}

// Rotated cone
export const Rotated: Story = {
  args: {
    rotation: 45,
    segments: [
      { distance: 70, color: 'rgba(255, 0, 0, 0.5)' },
      { distance: 50, color: 'rgba(0, 255, 0, 0.5)' },
    ],
  },
}

// Single segment cone
export const SingleSegment: Story = {
  args: {
    segments: [{ distance: 100, color: 'rgba(255, 0, 0, 0.5)' }],
  },
}
