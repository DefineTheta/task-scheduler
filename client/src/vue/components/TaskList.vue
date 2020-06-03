<script>
import Task from './Task';

const isToday = (date) => {
  let today = new Date();

  if (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

const isTomorrow = (date) => {
  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  if (
    date.getDate() == tomorrow.getDate() &&
    date.getMonth() == tomorrow.getMonth() &&
    date.getFullYear() == tomorrow.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

export default {
  components: { Task },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    date: {
      type: Number,
      required: true,
      default: () => {
        return 0;
      },
    },
  },
  computed: {
    taskDay: (vm) => {
      let convertedDate = new Date(vm.date * 1000);

      if (isToday(convertedDate)) return 'Today';
      if (isTomorrow(convertedDate)) return 'Tomorrow';

      return convertedDate.toLocaleString('en-us', { weekday: 'long' });
    },
    taskDate: (vm) => {
      let convertedDate = new Date(vm.date * 1000);

      return convertedDate.toLocaleString('en-us', { day: '2-digit', month: 'short' });
    },
  },
};
</script>

<template>
  <div class="px-3 pt-2 pb-3 flex flex-col items-center">
    <div class="w-full mb-1 flex flex-row items-center">
      <span class="font-semibold text-sm">{{ taskDay }}</span>
      <span class="ml-2 text-sm">{{ taskDate }}</span>
    </div>
    <Task
      v-for="(task, i) in tasks"
      :key="i"
      :title="task.title"
      :color="task.color"
      :completed="task.completed"
    ></Task>
  </div>
</template>
