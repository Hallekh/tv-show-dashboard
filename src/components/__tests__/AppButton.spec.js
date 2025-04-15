import { mount } from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = mount(AppButton)
    expect(wrapper.classes()).toContain('app-button')
    expect(wrapper.classes()).toContain('primary')
  })

  test('renders with provided label', () => {
    const wrapper = mount(AppButton, {
      props: { label: 'Click me' }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  test('emits click event when clicked', async () => {
    const wrapper = mount(AppButton);
    await wrapper.trigger('click');
  
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click').length).toBeGreaterThanOrEqual(1);
  });
  
  

  test('does not emit click event when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  test('applies provided buttonClass prop correctly', () => {
    const wrapper = mount(AppButton, {
      props: { buttonClass: 'custom-class' }
    })
    expect(wrapper.classes()).toContain('custom-class')
  })

  test('applies active class when isActive is true', () => {
    const wrapper = mount(AppButton, {
      props: { isActive: true }
    })
    expect(wrapper.classes()).toContain('active')
  })

  test('renders correctly with secondary variant', () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'secondary' }
    })
    expect(wrapper.classes()).toContain('secondary')
    expect(wrapper.classes()).not.toContain('primary')
  })

  test('renders slot content correctly', () => {
    const wrapper = mount(AppButton, {
      slots: { default: '<span>Slot Content</span>' }
    })
    expect(wrapper.html()).toContain('Slot Content')
  })
})
