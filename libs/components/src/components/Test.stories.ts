import type { Meta, StoryObj } from '@storybook/vue3'
import Test from './Test.vue'

const meta: Meta<typeof Test> = {
  component: Test,
  title: 'Test',
}
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
