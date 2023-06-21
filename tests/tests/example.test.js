import { mount } from '@vue/test-utils'
import HelloWorld from "output/vue/vue3/src/components/radio/radio-option-component.vue";


test('displays message', () => {
  const wrapper = mount(HelloWorld)

  expect(wrapper.text()).toContain('Welcome to Your Vue.js App')
})