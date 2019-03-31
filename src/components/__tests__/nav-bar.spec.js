import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NavBar from '../nav-bar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NavBar', () => {
  let wrapper;
  let store;
  let loadUsersMock;

  beforeEach(() => {
    loadUsersMock = jest.fn();

    store = new Vuex.Store({
      modules: {
        account: {
          namespaced: true,
          state: {
            accountName: 'accountName',
            accountAvatar: 'accountAvatar'
          }
        },
        users: {
          namespaced: true,
          state: {},
          mutations: {
            LOAD_USERS: loadUsersMock
          }
        }
      }
    })

    wrapper = shallowMount(NavBar, { store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders correctly', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  });
});
