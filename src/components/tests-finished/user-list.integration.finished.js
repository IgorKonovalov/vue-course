import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserList from '../user-list.vue';
import UserModule from '../../store/modules/users';
import usersData from './mock-data/users.json';

global.fetch = require('jest-fetch-mock');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('NavBar', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        users: UserModule,
      },
    });

    wrapper = shallowMount(UserList, { store, localVue });
    fetch.resetMocks();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('user can click on load users button and see 10 users from server', async () => {
    fetch.once(JSON.stringify(usersData));

    const getUsersButton = wrapper.find('.aqa-load-users');

    getUsersButton.trigger('click');

    expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/users');

    await localVue.nextTick();
    await localVue.nextTick();

    const usersCount = wrapper.find('.aqa-user-count');
    const userListItemsArray = wrapper.findAll('.aqa-user-list-item');

    expect(usersCount.text()).toBe('Count: 10');
    expect(userListItemsArray.length).toBe(10);
  });
});
