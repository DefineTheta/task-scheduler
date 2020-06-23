<script>
import Vue from 'vue';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ExperienceBar from './components/ExperienceBar';
import TaskContainer from './components/TaskContainer';
import WorkspacePopUp from './components/WorkspacePopUp';
import Settings from './components/Settings';

// Used to make API calls
// import API from './utility/API';

// Used to pass data on events between different Vue components
window.Event = new Vue();

export default {
  name: 'ManagerScheduler',
  components: { NavBar, SideBar, ExperienceBar, TaskContainer, WorkspacePopUp, Settings },
  data() {
    return {
      workspacePopupActive: false,
      settingsActive: false,
    };
  },
  created() {
    Event.$on('workspace-popup-button-clicked', () => {
      this.workspacePopupActive = !this.workspacePopupActive;
    });
    Event.$on('settings-popup-button-clicked', () => {
      this.settingsActive = !this.settingsActive;
    });
  },
};
</script>

<template>
  <div class="w-full h-full relative">
    <NavBar></NavBar>
    <SideBar></SideBar>
    <div class="main mt-16 pt-10 flex flex-col items-center right-0 absolute right-0">
      <ExperienceBar></ExperienceBar>
      <TaskContainer type="today"></TaskContainer>
    </div>
    <WorkspacePopUp v-if="workspacePopupActive"></WorkspacePopUp>
    <Settings v-if="settingsActive"></Settings>
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
