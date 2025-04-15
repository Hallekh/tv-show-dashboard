import { mount } from '@vue/test-utils'
import TvDashboard from '../TvDashboard.vue'
import GenreFilter from '../GenreFilter.vue'
import ShowList from '../ShowList.vue'
import AppButton from '../AppButton.vue'

let wrapper;

const flushPromises = () => new Promise(setImmediate);

const createWrapper = async (mockedFetchData = []) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedFetchData)
    })
  );

  wrapper = mount(TvDashboard, {
    global: {
      components: { GenreFilter, ShowList, AppButton }
    }
  });

  await flushPromises();
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('TvDashboard.vue', () => {
  test('fetches and displays shows initially on mount', async () => {
    await createWrapper([
      { show: { name: 'Test Show 2', genres: ['Sports'], rating: { average: 9 } } }
    ]);

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Sports');
    expect(wrapper.vm.shows).toHaveLength(1);
    expect(wrapper.vm.shows[0].name).toBe('Test Show 2');
  });

  test('searchShows fetches and sets the shows based on search query', async () => {
    await createWrapper();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { show: { name: 'Test Show 1', genres: ['Drama'], rating: { average: 8 } } },
          { show: { name: 'Test Show 2', genres: ['Comedy'], rating: { average: 7 } } }
        ])
      })
    );

    wrapper.vm.searchQuery = 'Test Show';
    await wrapper.vm.searchShows();
    await flushPromises();

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Test%20Show');
    expect(wrapper.vm.shows).toHaveLength(2);
    expect(wrapper.vm.shows[0].name).toBe('Test Show 1');
    expect(wrapper.vm.shows[1].name).toBe('Test Show 2');
  });

  test('clears search input after explicit submission', async () => {
    await createWrapper();

    wrapper.vm.searchQuery = 'Test';
    await wrapper.vm.handleExplicitSubmit();
    await flushPromises();

    expect(wrapper.vm.searchQuery).toBe('');
  });

  test('toggles sort order correctly', async () => {
    await createWrapper();

    wrapper.vm.sortOrder = 'asc';
    wrapper.vm.toggleSortOrder();
    expect(wrapper.vm.sortOrder).toBe('desc');

    wrapper.vm.toggleSortOrder();
    expect(wrapper.vm.sortOrder).toBe('asc');
  });

  test('sorts shows correctly by rating', async () => {
    await createWrapper();

    wrapper.vm.shows = [
      { name: 'Lower Rated Show', rating: { average: 5 } },
      { name: 'Higher Rated Show', rating: { average: 9 } }
    ];

    wrapper.vm.sortOrder = 'asc';
    wrapper.vm.sortShows();
    expect(wrapper.vm.shows[0].name).toBe('Lower Rated Show');

    wrapper.vm.sortOrder = 'desc';
    wrapper.vm.sortShows();
    expect(wrapper.vm.shows[0].name).toBe('Higher Rated Show');
  });

  test('handles debounced search input', async () => {
    jest.useFakeTimers();
    await createWrapper();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { show: { name: 'Debounce Show', genres: ['Drama'], rating: { average: 6 } } }
        ])
      })
    );

    wrapper.vm.searchQuery = 'Debounce Test';
    wrapper.vm.handleDebouncedSearch();

    jest.advanceTimersByTime(300);
    await flushPromises();

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Debounce%20Test');

    jest.useRealTimers();
  });

  test('GenreFilter emits genre-selected event and triggers fetch', async () => {
    await createWrapper();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { show: { name: 'Drama Show', genres: ['Drama'], rating: { average: 8 } } }
        ])
      })
    );

    const genreFilter = wrapper.findComponent(GenreFilter);
    await genreFilter.vm.$emit('genre-selected', 'Drama');
    await flushPromises();

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Drama');
  });
});
