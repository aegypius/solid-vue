<template>
  <div id="app">
    <HeaderNav>
      <LoginPanel />
    </HeaderNav>
    <ProfileViewer />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import LoginPanel from './components/LoginPanel.vue'
import ProfileViewer from './components/ProfileViewer.vue'

export default {
  name: 'App',
  components: {
    HeaderNav,
    ProfileViewer,
    LoginPanel
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
