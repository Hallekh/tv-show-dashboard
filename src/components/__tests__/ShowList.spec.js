import { mount, RouterLinkStub } from '@vue/test-utils'
import ShowList from '../ShowList.vue'

const mockShows = [
  {
    id: 1,
    name: 'Test Show 1',
    genres: ['Drama', 'Comedy'],
    rating: { average: 8 },
    image: { medium: 'https://placehold.co/250x375' }
  },
  {
    id: 2,
    name: 'Test Show 2',
    genres: ['Sports'],
    rating: { average: 9 },
    image: { medium: 'https://placehold.co/250x375' }
  }
];

describe('ShowList.vue', () => {
  test('renders the correct number of show cards', () => {
    const wrapper = mount(ShowList, {
      props: { shows: mockShows },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    const showCards = wrapper.findAll('.tv-show');
    expect(showCards).toHaveLength(mockShows.length);
  });

  test('displays show information correctly', () => {
    const wrapper = mount(ShowList, {
      props: { shows: mockShows },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    mockShows.forEach((show, index) => {
      const showCard = wrapper.findAll('.tv-show')[index];
      expect(showCard.text()).toContain(show.name);
      expect(showCard.text()).toContain(`Rating: ${show.rating.average}`);
      expect(showCard.text()).toContain(show.genres.join(', '));
    });
  });

  test('renders placeholder image if show image is missing', () => {
    const mockShowNoImage = [{ id: 3, name: 'No Image Show', genres: [], rating: {} }];
    const wrapper = mount(ShowList, {
      props: { shows: mockShowNoImage },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://placehold.co/250x375');
  });

  test('router-link points to the correct URL', () => {
    const wrapper = mount(ShowList, {
      props: { shows: mockShows },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links[0].props().to).toBe('/show/1');
    expect(links[1].props().to).toBe('/show/2');
  });

  test('handles empty shows array gracefully', () => {
    const wrapper = mount(ShowList, {
      props: { shows: [] }
    });

    expect(wrapper.findAll('.tv-show')).toHaveLength(0);
  });
});
