<script>
import Vue from 'vue';
import datepicker from 'vue-date-picker';

import NavBar from './components/NavBar';
import Task from './components/Task';

// Used to make API calls
import API from './utility/API';

// Used to pass data on events between different Vue components
window.Event = new Vue();

export default {
  name: 'NewTask',
  components: { NavBar, Task, datepicker },
  data() {
    return {
      activeUserId: 1,
      title: 'Untitled Task',
      date: '',
      assignedUser: -1,
      workspaceUsers: [],
      color: 'navy',
    };
  },
  created() {
    Event.$on('worspace-users-retrived', (data) => {
      this.workspaceUsers = data;
    });

    API.get('/api/v1/manager/workspaces/workers', 'worspace-users-retrived');
  },
  methods: {
    createTask() {
      //Perform AJAX request here
      window.location.href = '/schedule.html';
    },
    goHome() {
      window.location.href = '/schedule.html';
    },
  },
};
</script>

<template>
  <div class="w-full h-full relative">
    <NavBar></NavBar>
    <div
      class="main w-full mt-16 pt-10 flex flex-col items-center right-0 absolute right-0"
    >
      <div class="w-162 h-16 min-h-16 px-5 py-4 bg-white rounded shadow-4dp">
        <Task :title="title" :color="color" :completed="false"></Task>
      </div>
      <div
        class="w-162 mt-8 mb-10 px-3 pt-2 pb-4 flex flex-col bg-white rounded shadow-4dp"
      >
        <span class="font-bold text-xl">Create New Task</span>
        <form class="mt-2" onsubmit="return false;">
          <input
            v-model="title"
            type="text"
            name="title"
            class="w-144 h-10 px-2 text-sm font-semibold bg-side-grey focus:outline-none"
          />
          <div class="mt-3 flex flex-row items-center">
            <div class="flex flex-col">
              <div class="flex flex-row items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.800003 3.2C0.800003 2.32 1.52 1.6 2.4 1.6H13.6C14.0243 1.6 14.4313 1.76857 14.7314 2.06863C15.0314 2.36869 15.2 2.77565 15.2 3.2V14.4C15.2 14.8243 15.0314 15.2313 14.7314 15.5314C14.4313 15.8314 14.0243 16 13.6 16H2.4C1.97566 16 1.56869 15.8314 1.26863 15.5314C0.968574 15.2313 0.800003 14.8243 0.800003 14.4V3.2ZM2.4 4.8V14.4H13.6V4.8H2.4ZM4 0H5.6V1.6H4V0ZM10.4 0H12V1.6H10.4V0ZM4 7.2H5.6V8.8H4V7.2ZM4 10.4H5.6V12H4V10.4ZM7.2 7.2H8.8V8.8H7.2V7.2ZM7.2 10.4H8.8V12H7.2V10.4ZM10.4 7.2H12V8.8H10.4V7.2ZM10.4 10.4H12V12H10.4V10.4Z"
                    fill="black"
                  />
                </svg>
                <label for="Date" class="ml-2 text-sm font-semibold">Date:</label>
              </div>
              <datepicker
                v-model="date"
                :value="date"
                name="date"
                format="DD-MM-YYYY"
                :input-class="[
                  'w-48 h-10 text-sm font-semibold border-main bg-side-grey focus:outline-none',
                ]"
              ></datepicker>
            </div>
            <div class="ml-2 flex flex-col">
              <div class="flex flex-row items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4V5.6C12 6.66087 11.5786 7.67828 10.8284 8.42843C10.0783 9.17857 9.06087 9.6 8 9.6C6.93913 9.6 5.92172 9.17857 5.17157 8.42843C4.42143 7.67828 4 6.66087 4 5.6V4ZM0 13.344C2.43081 11.936 5.19088 11.1963 8 11.2C10.912 11.2 13.648 11.976 16 13.344V16H0V13.344Z"
                    fill="black"
                  />
                </svg>

                <label for="assigned_user" class="ml-2 text-sm font-semibold"
                  >Assign To User:</label
                >
              </div>
              <div class="w-40 h-10 mt-1 flex flex-row items-center relative">
                <select
                  v-model="assignedUser"
                  name="assigned_user"
                  class="w-40 h-10 pl-4 text-sm font-semibold border-main bg-side-grey appearance-none focus:outline-none"
                >
                  <option
                    v-for="user in workspaceUsers"
                    :key="user.id"
                    :value="user.id"
                    >{{ user.name }}</option
                  >
                </select>
                <svg
                  class="absolute right-0 mr-1 mt-1"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6 2.3L6 6.9L1.4 2.3L0 3.7L6 9.7L12 3.7L10.6 2.3Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-2 flex flex-col">
              <div class="flex flex-row items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.2 16V14.64L7.208 14.448L12.056 9.6H14.408C15.288 9.6 16 10.312 16 11.2V14.4C16 14.8243 15.8314 15.2313 15.5314 15.5314C15.2313 15.8314 14.8243 16 14.4 16H7.2ZM7.2 13.328V4.272L8.864 2.616C9.01191 2.46748 9.1877 2.34964 9.38127 2.26923C9.57485 2.18882 9.78239 2.14742 9.992 2.14742C10.2016 2.14742 10.4092 2.18882 10.6027 2.26923C10.7963 2.34964 10.9721 2.46748 11.12 2.616L13.384 4.88C13.682 5.17978 13.8493 5.5853 13.8493 6.008C13.8493 6.4307 13.682 6.83622 13.384 7.136L7.2 13.328ZM0 1.592C0 0.72 0.712 0 1.6 0H4.8C5.22435 0 5.63131 0.168571 5.93137 0.468629C6.23143 0.768687 6.4 1.17565 6.4 1.6V14.4C6.4 14.8243 6.23143 15.2313 5.93137 15.5314C5.63131 15.8314 5.22435 16 4.8 16H1.6C1.17565 16 0.768687 15.8314 0.468629 15.5314C0.168571 15.2313 0 14.8243 0 14.4V1.6V1.592ZM3.2 13.6C3.41217 13.6 3.61566 13.5157 3.76569 13.3657C3.91571 13.2157 4 13.0122 4 12.8C4 12.5878 3.91571 12.3843 3.76569 12.2343C3.61566 12.0843 3.41217 12 3.2 12C2.98783 12 2.78434 12.0843 2.63431 12.2343C2.48429 12.3843 2.4 12.5878 2.4 12.8C2.4 13.0122 2.48429 13.2157 2.63431 13.3657C2.78434 13.5157 2.98783 13.6 3.2 13.6V13.6Z"
                    fill="black"
                  />
                </svg>
                <label for="color" class="ml-2 text-sm font-semibold">Color:</label>
              </div>
              <div class="w-40 h-10 mt-1 flex flex-row items-center relative">
                <select
                  v-model="color"
                  name="color"
                  class="w-40 h-10 pl-4 text-sm font-semibold border-main bg-side-grey appearance-none focus:outline-none"
                >
                  <option value="navy">Navy</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="teal">Teal</option>
                  <option value="purple">Purple</option>
                </select>
                <svg
                  class="absolute right-0 mr-1 mt-1"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6 2.3L6 6.9L1.4 2.3L0 3.7L6 9.7L12 3.7L10.6 2.3Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="mt-4 felx flex-row items-center">
            <button
              class="w-32 h-8 submit-btn font-semibold focus:outline-none"
              @click="createTask"
            >
              Create
            </button>
            <button
              class="w-32 h-8 ml-2 cancel-btn font-semibold focus:outline-none"
              @click="goHome"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
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

.submit-btn {
  background: linear-gradient(
    359.1deg,
    #adfe83 -277.82%,
    #a7fb81 -235.39%,
    #97f47d -181.28%,
    #7ce876 -120.41%,
    #58d86d -55.23%,
    #3dcd67 -14.03%,
    #31c36b 21.02%,
    #15ab75 124.33%,
    #0ba27a 184.59%
  );
}

.cancel-btn {
  background: linear-gradient(
    359.45deg,
    #52017c -126.97%,
    #59047d -122.58%,
    #861789 -93.65%,
    #a62691 -68.08%,
    #ba2e96 -46.64%,
    #c23298 -32.17%,
    #d13f92 -2.21%,
    #ea5588 55.13%,
    #f45d85 89.74%
  );
}
</style>
