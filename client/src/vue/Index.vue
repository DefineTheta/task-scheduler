<script>
import Vue from 'vue';
import NavBar from './components/HomeNavBar';
import ReasonsContainer from './components/ReasonsContainer';
import SignUp from './components/SignUp';

// Used to pass data on events between different Vue components
window.Event = new Vue();

export default {
  name: 'Index',
  components: { NavBar, ReasonsContainer, SignUp },
};
</script>

<template>
  <div class="w-full h-full relative">
    <NavBar></NavBar>
    <div class="main pt-64 flex flex-row absolute items-center">
      <ReasonsContainer></ReasonsContainer>
      <SignUp></SignUp>
    </div>
  </div>
</template>

<style lang="scss">
/* purgecss start ignore */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/* purgecss end ignore */

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  background-color: #f5f5f8;
}

.main {
  width: 100%;
}
</style>
