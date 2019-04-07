import Vue from 'vue';
import Router from 'vue-router';
import userList from './components/user-list.vue';
import userDetails from './components/user-details.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user-list',
      component: userList,
    },
    {
      path: '/user-details/:id',
      name: 'user-details',
      component: userDetails,
    },
  ],
});
