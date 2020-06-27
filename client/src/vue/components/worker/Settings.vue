<script>
// MD5 hash package to hash the password
import md5 from 'md5';

// Used to make API calls
import API from '../../utility/API';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      errorMessage: [],
      errorPresent: false,
      successMessage: '',
      successPresent: false,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dayChecked: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
      },
    };
  },
  created() {
    Event.$on('profile-update-failed', (data) => {
      this.successPresent = false;
      this.errorPresent = true;
      this.errorMessage = data.errors;
    });

    Event.$on('profile-update-success', () => {
      this.errorPresent = false;
      this.successPresent = true;
      this.successMessage = 'Profile settings were updated successfully!';
    });

    Event.$on('profile-information-recieved', (data) => {
      this.firstName = data.profile.first_name;
      this.lastName = data.profile.last_name;
      this.email = data.profile.email;
      this.username = data.profile.username;

      for (let i = 0; i < data.profile.availability.length; ++i) {
        const shouldBeChecked =
          data.profile.availability.charAt(i) === '1' ? true : false;

        this.dayChecked[this.days[i]] = shouldBeChecked;
      }
    });

    API.get('/profile', 'profile-information-recieved', 200);
  },
  methods: {
    closePopup() {
      Event.$emit('settings-popup-button-clicked');
    },
    submitForm() {
      const pass = this.password.length > 5 ? md5(this.password) : '';
      let availability = '';

      for (const key in this.dayChecked) {
        const dayCheckbox = this.dayChecked[key];

        dayCheckbox === true ? (availability += '1') : (availability += '0');
      }

      API.put(
        '/profile',
        {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          username: this.username,
          pass: pass,
          availability: availability,
        },
        'profile-update-success',
        200,
        422,
        'profile-update-failed',
      );
    },
  },
};
</script>

<template>
  <!-- <div class="w-100 h-100 bg-white shadow-4dp absolute z-20"></div> -->
  <div
    class="w-screen h-screen flex items-center justify-center top-0 left-0 bg-black-transparent fixed"
    @mousedown.self="closePopup"
  >
    <div class="w-144 min-h-80 flex flex-col bg-white shadow-4dp fixed z-20">
      <div class="w-full h-12 bg-side-grey flex flex-row items-center justify-between">
        <span class="ml-3 text-xl font-bold">
          Settings
        </span>
        <button title="Close" class="mr-3 focus:outline-none" @click="closePopup">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M2.93002 17.07C1.97492 16.1475 1.21309 15.0441 0.689004 13.824C0.164914 12.604 -0.110948 11.2918 -0.122486 9.964C-0.134024 8.63621 0.118993 7.31941 0.621801 6.09045C1.12461 4.86148 1.86714 3.74496 2.80607 2.80604C3.745 1.86711 4.86151 1.12458 6.09048 0.621771C7.31944 0.118962 8.63624 -0.134055 9.96403 -0.122517C11.2918 -0.110979 12.604 0.164884 13.8241 0.688974C15.0441 1.21306 16.1476 1.97489 17.07 2.92999C18.8916 4.81601 19.8995 7.34203 19.8768 9.964C19.854 12.586 18.8023 15.0941 16.9482 16.9482C15.0941 18.8023 12.586 19.8539 9.96403 19.8767C7.34206 19.8995 4.81604 18.8916 2.93002 17.07V17.07ZM11.4 9.99999L14.23 7.16999L12.82 5.75999L10 8.58999L7.17002 5.75999L5.76002 7.16999L8.59002 9.99999L5.76002 12.83L7.17002 14.24L10 11.41L12.83 14.24L14.24 12.83L11.41 9.99999H11.4Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <form class="mx-3 mt-4 w-full flex flex-col" onsubmit="return false;">
        <div v-if="errorPresent" class="mb-2">
          <li
            v-for="(error, i) in errorMessage"
            :key="i"
            class="text-sm text-red-600 font-semibold"
          >
            {{ error }}
          </li>
        </div>
        <span v-if="successPresent" class="mb-2 font-semibold text-green-600 text-sm">
          {{ successMessage }}
        </span>
        <div class="flex flex-row">
          <div class="flex flex-col">
            <label for="first_name" class="font-semibold">First Name:</label>
            <input
              v-model="firstName"
              type="text"
              name="first_name"
              class="w-56 h-10 mt-2 px-1 text-sm font-semibold focus:outline-none bg-textbox-grey"
            />
          </div>
          <div class="pl-2 flex flex-col">
            <label for="last_name" class="font-semibold">Last Name:</label>
            <input
              v-model="lastName"
              type="text"
              name="last_name"
              class="w-56 h-10 mt-2 px-1 text-sm font-semibold bg-textbox-grey focus:outline-none"
            />
          </div>
        </div>
        <label for="email" class="mt-4 font-semibold">Email:</label>
        <input
          v-model="email"
          type="email"
          name="email"
          class="w-100 h-10 mt-1 px-1 text-sm font-semibold bg-textbox-grey focus:outline-none"
        />
        <div class="mt-4 flex flex-row">
          <div class="flex flex-col">
            <label for="username" class="font-semibold">Username:</label>
            <input
              v-model="username"
              type="text"
              name="username"
              class="w-56 h-10 mt-2 px-1 text-sm font-semibold bg-textbox-grey focus:outline-none"
            />
          </div>
          <div class="pl-2 flex flex-col">
            <label for="pass" class="font-semibold">Password:</label>
            <input
              v-model="password"
              type="password"
              name="pass"
              class="w-56 h-10 mt-2 px-1 text-sm font-semibold bg-textbox-grey focus:outline-none"
            />
          </div>
        </div>
        <label for="first_name" class="mt-2 font-semibold">Days Available For Work</label>
        <div class="ml-16 mr-24 mt-4 flex flex-row justify-between">
          <div
            v-for="day in days"
            :key="day"
            class="flex flex-col justify-between items-center"
          >
            <span class="text-sm font-semibold">
              {{ day }}
            </span>
            <input v-model="dayChecked[day]" type="checkbox" />
          </div>
        </div>
        <div class="w-full flex flex-col items-center justify-center">
          <button
            class="w-48 h-8 mt-4 mb-4 submit-btn font-semibold focus:outline-none"
            @click="submitForm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass">
.submit-btn {
  background: linear-gradient(359.1deg, #ADFE83 -277.82%, #A7FB81 -235.39%, #97F47D -181.28%, #7CE876 -120.41%, #58D86D -55.23%, #3DCD67 -14.03%, #31C36B 21.02%, #15AB75 124.33%, #0BA27A 184.59%);
}
</style>
