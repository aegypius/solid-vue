<template lang="html">
  <section>
    <template v-if="fullName">
      <h2>{{ fullName }}</h2>
      <p>{{ role }} @ {{ organizationName }}</p>
      <ul v-for="friend in friends" :key="friend">
        <li>{{ friend }}</li>
      </ul>
      <fieldset>
        <legend>Friends</legend>
        <div v-if="friends.length === 0">
          Sorry, you don't have any friends ! Go out and have a beer !
        </div>
      </fieldset>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfileViewer',
  computed: {
    ...mapState([
      'fullName',
      'role',
      'organizationName',
      'friends'
    ])
  }
}
</script>

<style lang="css">
</style>
