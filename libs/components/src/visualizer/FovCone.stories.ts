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
    distances: [50, 50, 50],
    viewingAngle: Math.PI / 2, // 90 degrees
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
    viewingAngle: Math.PI * 0.75, // 135 degrees
    distances: [60, 60],
    origin: { x: 0, y: 0 },
  },
}

// Narrow angle cone
export const NarrowAngle: Story = {
  args: {
    viewingAngle: Math.PI / 4, // 45 degrees
    distances: [80, 40, 40],
    origin: { x: 0, y: 0 },
  },
}

// Rotated cone
export const Rotated: Story = {
  args: {
    rotation: Math.PI / 4, // 45 degrees
    distances: [70, 50],
    origin: { x: 0, y: 0 },
  },
}

// Single distance cone
export const SingleDistance: Story = {
  args: {
    distances: [100],
    origin: { x: 0, y: 0 },
  },
}
