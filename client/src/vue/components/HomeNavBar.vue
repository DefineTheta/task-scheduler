<script>
// MD5 hash package to hash the password
import md5 from 'md5';

// Used to make API calls
import API from '../utility/API';

export default {
  data() {
    return {
      username: '',
      password: '',
      accountType: '',
      loginError: '',
      loginErrorPresent: false,
    };
  },
  created() {
    // eslint-disable-next-line
    Event.$on('login-failed', (data) => {
      this.loginErrorPresent = true;
      this.loginError = '✖️ Invalid account information provided';
    });
  },
  methods: {
    submitForm() {
      const pass = md5(this.password);
      let account_type = null;

      if (this.accountType === 'manager') {
        account_type = 0;
      } else if (this.accountType === 'worker') {
        account_type = 1;
      }

      API.post(
        `/login`,
        {
          username: this.username,
          pass,
          account_type,
        },
        'login-failed',
        401,
      );
    },
  },
};
</script>

<template>
  <nav
    class="w-full h-16 bg-nav-blue flex flex-row justify-between items-center fixed z-10"
  >
    <div class="ml-4 flex flex-row items-center">
      <span class="text-white text-2xl font-semibold">TS PLUS</span>
    </div>
    <div class="mr-4 flex flex-col justify-center">
      <div v-if="loginErrorPresent" class="mb-1 text-sm text-white font-semibold">
        {{ loginError }}
      </div>
      <form class="flex flex-row items-center" onsubmit="return false;">
        <input
          v-model="username"
          type="text"
          name="username"
          class="w-40 h-6 px-1 text-sm font-semibold focus:outline-none placeholder-gray-600"
          placeholder="Username"
        />
        <input
          v-model="password"
          type="password"
          name="pass"
          class="w-40 h-6 ml-4 px-1 text-sm font-semibold focus:outline-none placeholder-gray-600"
          placeholder="Password"
        />
        <div class="w-32 h-6 ml-4 flex flex-row items-center relative">
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
            class="w-32 h-6 pl-8 text-sm font-semibold border-main appearance-none focus:outline-none"
          >
            <option value="manager" selected="selected">Manager</option>
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
          class="w-20 h-6 ml-4 submit-btn text-sm font-semibold focus:outline-none"
          @click="submitForm"
        >
          Log In
        </button>
      </form>
    </div>
  </nav>
</template>

<style lang="sass">
.submit-btn {
  background: linear-gradient(359.1deg, #ADFE83 -277.82%, #A7FB81 -235.39%, #97F47D -181.28%, #7CE876 -120.41%, #58D86D -55.23%, #3DCD67 -14.03%, #31C36B 21.02%, #15AB75 124.33%, #0BA27A 184.59%);
}
</style>
