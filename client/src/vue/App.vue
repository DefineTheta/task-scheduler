<script>
import NavBar from './components/NavBar';

export default {
  name: 'App',
  components: { NavBar },
  data() {
    return {};
  },
};
</script>

<template>
  <div>
    <NavBar></NavBar>
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
</style>
