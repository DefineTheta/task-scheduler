<script>
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ExperienceBar from './components/ExperienceBar';
import TaskContainer from './components/TaskContainer';

export default {
  name: 'App',
  components: { NavBar, SideBar, ExperienceBar, TaskContainer },
  data() {
    return {
      workspaces: [
        { id: 1, name: '🎀 WOTBOS New York' },
        { id: 2, name: '📜 Quest Workspaces' },
        { id: 3, name: '🎶 The Farm SoHo NYC' },
      ],
    };
  },
};
</script>

<template>
  <div class="w-full h-full relative">
    <NavBar></NavBar>
    <SideBar :workspaces="workspaces"></SideBar>
    <div class="main mt-16 pt-10 flex flex-col items-center right-0 absolute right-0">
      <ExperienceBar></ExperienceBar>
      <TaskContainer></TaskContainer>
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
  width: calc(100% - 18.5rem);
}
</style>
