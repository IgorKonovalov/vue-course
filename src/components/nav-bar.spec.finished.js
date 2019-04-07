import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NavBar from './nav-bar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NavBar', () => {
  let wrapper;
  let store;
  let addUserMock;

  beforeEach(() => {
    addUserMock = jest.fn();

    store = new Vuex.Store({
      modules: {
        account: {
          namespaced: true,
          state: {
            accountName: 'accountName',
            accountAvatar: 'accountAvatar',
          },
        },
        users: {
          namespaced: true,
          state: {},
          mutations: {
            ADD_USER: addUserMock,
          },
        },
      },
    });

    wrapper = shallowMount(NavBar, { store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders correctly', () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('user can be added by filling name and pressing ether enter or button', () => {
    const button = wrapper.find('.aqa-button-add');
    const input = wrapper.find('.aqa-input-add-user');

    input.element.value = 'New user name';
    button.trigger('click');

    expect(addUserMock).toBeCalledWith({}, 'New user name');

    input.element.value = 'Another user name';
    input.trigger('keyup.enter');

    expect(addUserMock).toBeCalledWith({}, 'Another user name');
  });

  it('user is not added if input is empty', () => {
    const button = wrapper.find('.aqa-button-add');
    const input = wrapper.find('.aqa-input-add-user');

    input.element.value = '';
    button.trigger('click');

    expect(addUserMock).not.toBeCalled();
  });
});
