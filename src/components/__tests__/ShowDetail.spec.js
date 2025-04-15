import { mount } from '@vue/test-utils'
import ShowDetail from '../ShowDetail.vue'
import AppButton from '../AppButton.vue'
import { createRouter, createWebHistory } from 'vue-router'

const mockShowData = {
  id: 1,
  name: 'Test Show',
  image: { medium: 'https://placehold.co/250x375' },
  genres: ['Drama', 'Comedy'],
  rating: { average: 8.5 },
  summary: '<p>This is a <strong>test summary</strong></p>',
  premiered: '2024-01-01',
  language: 'English',
  url: 'https://example.com/test-show'
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockShowData)
  })
);

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Dashboard' }]
});

const mockRoute = {
  params: { id: '1' }
};

describe('ShowDetail.vue', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(ShowDetail, {
      global: {
        plugins: [router],
        mocks: { $route: mockRoute },
        components: { AppButton }
      }
    });

    await wrapper.vm.fetchShowDetails();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and sets show details correctly on mount', () => {
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1');
    expect(wrapper.vm.show.name).toBe('Test Show');
  });

  test('renders show details correctly after fetch', () => {
    expect(wrapper.find('h2').text()).toBe(mockShowData.name);
    expect(wrapper.find('img').attributes('src')).toBe(mockShowData.image.medium);
    expect(wrapper.find('p').html()).toContain(mockShowData.genres.join(', '));
    expect(wrapper.find('span').html()).toContain('test summary');
    expect(wrapper.html()).toContain('2024-01-01');
    expect(wrapper.html()).toContain('English');
    expect(wrapper.find('a').attributes('href')).toBe(mockShowData.url);
  });

  test('renders loading state before data is loaded', () => {
    const loadingWrapper = mount(ShowDetail, {
      global: {
        mocks: { $route: mockRoute },
        components: { AppButton }
      }
    });
    expect(loadingWrapper.text()).toContain('Loading show details...');
  });

  test('calls router push when "Back to Dashboard" button is clicked', async () => {
    router.push = jest.fn();
    await wrapper.findComponent(AppButton).trigger('click');

    expect(router.push).toHaveBeenCalledWith('/');
  });
});
