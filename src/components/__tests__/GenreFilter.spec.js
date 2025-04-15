import { mount } from '@vue/test-utils'
import GenreFilter from '../GenreFilter.vue'
import AppButton from '../AppButton.vue'

describe('GenreFilter.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GenreFilter, {
      global: {
        components: { AppButton }
      }
    });
  });

  test('renders all genre buttons correctly', () => {
    const genres = ['Drama', 'Comedy', 'Sports', 'Action', 'Horror'];
    const buttons = wrapper.findAllComponents(AppButton);
    expect(buttons).toHaveLength(genres.length);
    
    buttons.forEach((button, index) => {
      expect(button.props('label')).toBe(genres[index]);
    });
  });

  test('emits "genre-selected" event when a button is clicked', async () => {
    const buttons = wrapper.findAllComponents(AppButton);
    await buttons[2].trigger('click'); // Clicking on "Sports"

    expect(wrapper.emitted('genre-selected')).toBeTruthy();
    expect(wrapper.emitted('genre-selected')[0]).toEqual(['Sports']);
  });

  test('updates selectedGenre data when a genre button is clicked', async () => {
    const buttons = wrapper.findAllComponents(AppButton);
    await buttons[1].trigger('click'); // Clicking on "Comedy"

    expect(wrapper.vm.selectedGenre).toBe('Comedy');
  });

  test('applies active class correctly to the selected button', async () => {
    const buttons = wrapper.findAllComponents(AppButton);

    // Initially no active button
    buttons.forEach(button => {
      expect(button.props('isActive')).toBe(false);
    });

    // Click on "Action" button
    await buttons[3].trigger('click');

    // Verify the clicked button is active
    expect(buttons[3].props('isActive')).toBe(true);
    
    // Verify other buttons remain inactive
    buttons.forEach((button, index) => {
      if (index !== 3) {
        expect(button.props('isActive')).toBe(false);
      }
    });
  });
});
