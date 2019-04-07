<template>
  <section>
    <h1>USER DETAILS:</h1>
    <ul>
      <li>
        Name: <span>{{ userDetails.name }}</span>
      </li>
      <li>
        Email: <span>{{ userDetails.email }}</span>
      </li>
      <li>
        Phone: <span>{{ userDetails.phone }}</span>
      </li>
      <li>
        Website: <span>{{ userDetails.website }}</span>
      </li>
      <li>
        Slogan: <span>{{ userDetails.company.catchPhrase }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'userDetails',

  data() {
    return {
      userDetails: {
        company: {},
      },
    };
  },

  beforeMount() {
    const userId = this.$route.params.id;

    this.userDetails = this.users.find(({ id }) => id === Number(userId));
  },

  computed: {
    ...mapState('users', ['users']),
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

ul {
  font-size: 30px;
  padding: 15px;
}

li {
  padding-top: 10px;
}

li > span {
  color: $vue-green-plus-5;
}
</style>
