<script>
export default {
  data() {
    return {
      currentTimeline: 0,
      timelines: ['Today', 'This Week', 'All Time'],
    };
  },
  methods: {
    changeTimeline(newTimeline) {
      if (newTimeline !== this.currentTimeline) {
        this.currentTimeline = newTimeline;
        Event.$emit('timeline-changed', newTimeline);
      }
    },
  },
};
</script>

<template>
  <div class="w-full flex flex-col">
    <button
      v-for="(timeline, i) in timelines"
      :key="i"
      class="mt-3 flex flex-row items-center timeline-item focus:outline-none"
      @click="changeTimeline(i)"
    >
      <svg
        class="text-black-primary"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="i === currentTimeline"
          d="M1.20001 4.8C1.20001 3.48 2.28001 2.4 3.60001 2.4H20.4C21.0365 2.4 21.647 2.65286 22.0971 3.10294C22.5472 3.55303 22.8 4.16348 22.8 4.8V21.6C22.8 22.2365 22.5472 22.847 22.0971 23.2971C21.647 23.7471 21.0365 24 20.4 24H3.60001C2.96349 24 2.35304 23.7471 1.90296 23.2971C1.45287 22.847 1.20001 22.2365 1.20001 21.6V4.8ZM3.60001 7.2V21.6H20.4V7.2H3.60001ZM6.00001 0H8.40001V2.4H6.00001V0ZM15.6 0H18V2.4H15.6V0ZM6.00001 10.8H8.40001V13.2H6.00001V10.8ZM6.00001 15.6H8.40001V18H6.00001V15.6ZM10.8 10.8H13.2V13.2H10.8V10.8ZM10.8 15.6H13.2V18H10.8V15.6ZM15.6 10.8H18V13.2H15.6V10.8ZM15.6 15.6H18V18H15.6V15.6Z"
          fill="rgba(0, 0, 0, 0.87)"
        />
        <path
          v-else
          d="M1.20001 4.8C1.20001 3.48 2.28001 2.4 3.60001 2.4H20.4C21.0365 2.4 21.647 2.65286 22.0971 3.10294C22.5472 3.55303 22.8 4.16348 22.8 4.8V21.6C22.8 22.2365 22.5472 22.847 22.0971 23.2971C21.647 23.7471 21.0365 24 20.4 24H3.60001C2.96349 24 2.35304 23.7471 1.90296 23.2971C1.45287 22.847 1.20001 22.2365 1.20001 21.6V4.8ZM3.60001 7.2V21.6H20.4V7.2H3.60001ZM6.00001 0H8.40001V2.4H6.00001V0ZM15.6 0H18V2.4H15.6V0ZM6.00001 10.8H8.40001V13.2H6.00001V10.8ZM6.00001 15.6H8.40001V18H6.00001V15.6ZM10.8 10.8H13.2V13.2H10.8V10.8ZM10.8 15.6H13.2V18H10.8V15.6ZM15.6 10.8H18V13.2H15.6V10.8ZM15.6 15.6H18V18H15.6V15.6Z"
          fill="rgba(0, 0, 0, 0.60)"
        />
      </svg>
      <span
        class="ml-2 text-lg"
        :class="{
          'font-bold text-black-primary': i === currentTimeline,
          'font-semibold text-black-secondary': i !== currentTimeline,
        }"
        >{{ timeline }}</span
      >
    </button>
  </div>
</template>

<style lang="sass">
.timeline-item {
  &:hover {
    background-color: #CCCCCC;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
