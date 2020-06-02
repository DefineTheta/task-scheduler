<script>
export default {
  data() {
    return {
      tab: 'all',
      tabStyle:
        'p-3 font-semibold border-r-2 border-grey-dark cursor-pointer focus:outline-none',
    };
  },
  methods: {
    changeTab() {
      this.tab = this.tab === 'all' ? 'mine' : 'all';
    },
  },
};
</script>

<template>
  <div class="w-162 min-h-120 mt-8 mb-10 flex flex-col bg-white rounded shadow-4dp">
    <div class="w-full h-12 bg-side-grey flex flex-row">
      <button :class="[tabStyle, tab === 'all' && 'bg-white']" @click="tab = 'all'">
        All Tasks
      </button>
      <button :class="[tabStyle, tab === 'mine' && 'bg-white']" @click="tab = 'mine'">
        My Tasks
      </button>
    </div>
    <div class="w-full flex flex-col items-center"></div>
  </div>
</template>
