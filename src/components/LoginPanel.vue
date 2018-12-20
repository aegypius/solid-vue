<template lang="html">
  <aside>
    <template v-if="person">
      <p>Hello, <strong>{{ fullName }}</strong></p>
      <button @click="() => logout()">Logout</button>
    </template>
    <template v-else>
      <button @click="() => login()">Login</button>
    </template>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoginPanel',
  computed: {
    ...mapState([
      'person',
      'fullName',
    ])
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ])
  }
}
</script>

<style lang="css">
</style>
