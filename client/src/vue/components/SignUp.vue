<script>
// MD5 hash package to hash the password
import md5 from 'md5';

// Used to make API calls
import API from '../utility/API';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      accountType: '',
      joinErrors: [],
      joinErrorPresent: false,
    };
  },
  created() {
    Event.$on('join-failed', (data) => {
      this.joinErrorPresent = true;
      this.joinErrors = data.errors;
    });
  },
  methods: {
    submitForm() {
      const pass = this.password.length >= 7 ? md5(this.password) : '';
      let account_type = null;

      if (this.accountType === 'manager') {
        account_type = 0;
      } else if (this.accountType === 'worker') {
        account_type = 1;
      }

      API.post(
        `/join`,
        {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          username: this.username,
          pass,
          account_type,
        },
        'join-failed',
        422,
      );
    },
  },
};
</script>

<template>
  <div
    class="min-w-120 max-w-160 mx-4 py-4 pl-4 flex flex-col bg-side-grey rounded shadow-4dp"
  >
    <span class="text-4xl font-bold text-red-500">JOIN NOW!</span>
    <li
      v-for="(error, i) in joinErrors"
      :key="i"
      class="text-sm text-red-600 font-semibold"
    >
      {{ error }}
    </li>
    <form class="mt-4 w-full flex flex-col" onsubmit="return false;">
      <div class="flex flex-row">
        <div class="flex flex-col">
          <label for="first_name" class="font-semibold">First Name:</label>
          <input
            v-model="firstName"
            type="text"
            name="first_name"
            class="w-56 h-10 mt-2 px-1 text-sm font-semibold focus:outline-none"
          />
        </div>
        <div class="pl-2 flex flex-col">
          <label for="last_name" class="font-semibold">Last Name:</label>
          <input
            v-model="lastName"
            type="text"
            name="last_name"
            class="w-56 h-10 mt-2 px-1 text-sm font-semibold focus:outline-none"
          />
        </div>
      </div>
      <label for="email" class="mt-4 font-semibold">Email:</label>
      <input
        v-model="email"
        type="email"
        name="email"
        class="w-100 h-10 mt-1 px-1 text-sm font-semibold focus:outline-none"
      />
      <div class="mt-4 flex flex-row">
        <div class="flex flex-col">
          <label for="username" class="font-semibold">Username:</label>
          <input
            v-model="username"
            type="text"
            name="username"
            class="w-56 h-10 mt-2 px-1 text-sm font-semibold focus:outline-none"
          />
        </div>
        <div class="pl-2 flex flex-col">
          <label for="pass" class="font-semibold">Password:</label>
          <input
            v-model="password"
            type="password"
            name="pass"
            class="w-56 h-10 mt-2 px-1 text-sm font-semibold focus:outline-none"
          />
        </div>
      </div>
      <label for="account_type" class="mt-4 font-semibold">Account Type:</label>
      <div class="w-48 h-10 mt-1 flex flex-row items-center relative">
        <svg
          class="left-0 ml-2 absolute"
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

        <select
          v-model="accountType"
          class="w-48 h-10 pl-10 text-sm font-semibold border-main appearance-none focus:outline-none"
        >
          <option value="manager">Manager</option>
          <option value="worker">Worker</option>
        </select>
        <svg
          class="absolute right-0 mr-1 mt-1"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.6 2.3L6 6.9L1.4 2.3L0 3.7L6 9.7L12 3.7L10.6 2.3Z" fill="black" />
        </svg>
      </div>
      <button
        class="w-32 h-10 mt-4 join-btn font-semibold focus:outline-none"
        @click="submitForm"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<style lang="sass">
.join-btn {
  background: linear-gradient(359.45deg, #52017C -126.97%, #59047D -122.58%, #861789 -93.65%, #A62691 -68.08%, #BA2E96 -46.64%, #C23298 -32.17%, #D13F92 -2.21%, #EA5588 55.13%, #F45D85 89.74%);
}
</style>
