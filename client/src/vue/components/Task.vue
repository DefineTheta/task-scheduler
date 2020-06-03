<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: () => {
        return '';
      },
    },
    color: {
      type: String,
      required: true,
      default: () => {
        return 'navy';
      },
    },
    completed: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      },
    },
  },
};
</script>

<template>
  <div
    class="w-full py-1 border-l-4 task flex flex-row items-center"
    :class="`${color}-border`"
  >
    <button class="ml-2 focus:outline-none">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M2.344 13.6559C1.57992 12.9179 0.970462 12.0352 0.55119 11.0592C0.131918 10.0831 -0.0887722 9.03336 -0.0980027 7.97113C-0.107233 6.90889 0.0951804 5.85546 0.497427 4.87228C0.899675 3.88911 1.4937 2.9959 2.24484 2.24476C2.99598 1.49362 3.8892 0.899591 4.87237 0.497344C5.85554 0.0950964 6.90898 -0.107317 7.97121 -0.0980866C9.03345 -0.0888561 10.0832 0.131834 11.0592 0.551106C12.0353 0.970378 12.918 1.57984 13.656 2.34392C15.1133 3.85273 15.9196 5.87355 15.9014 7.97113C15.8832 10.0687 15.0418 12.0752 13.5585 13.5585C12.0753 15.0417 10.0688 15.8831 7.97121 15.9013C5.87364 15.9195 3.85282 15.1132 2.344 13.6559V13.6559ZM12.528 12.5279C13.7289 11.327 14.4036 9.69825 14.4036 7.99992C14.4036 6.30159 13.7289 4.67282 12.528 3.47192C11.3271 2.27102 9.69833 1.59636 8 1.59636C6.30167 1.59636 4.6729 2.27102 3.472 3.47192C2.2711 4.67282 1.59644 6.30159 1.59644 7.99992C1.59644 9.69825 2.2711 11.327 3.472 12.5279C4.6729 13.7288 6.30167 14.4035 8 14.4035C9.69833 14.4035 11.3271 13.7288 12.528 12.5279V12.5279ZM5.36 7.43192L7.2 9.27992L10.64 5.83992L11.76 6.97592L7.2 11.5199L4.24 8.55992L5.36 7.42392V7.43192Z"
            fill="#888888"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
    <span class="ml-2 font-semibold text-sm">{{ title }}</span>
  </div>
</template>

<style lang="sass">
.red-border {
  border-color: rgb(240, 17, 17);
}

.navy-border {
  border-color: rgb(35, 41, 67);
}

.teal-border {
  border-color: rgb(26, 159, 171);
}
</style>
