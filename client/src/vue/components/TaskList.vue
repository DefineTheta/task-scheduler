<script>
import Task from './Task';
import GroupTaskList from './GroupTaskList';

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
  components: { Task, GroupTaskList },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    groups: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    date: {
      type: String,
      required: true,
      default: () => {
        return '';
      },
    },
  },
  computed: {
    taskDay: (vm) => {
      let convertedDate = new Date(vm.date);

      if (isToday(convertedDate)) return 'Today';
      if (isTomorrow(convertedDate)) return 'Tomorrow';

      return convertedDate.toLocaleString('en-us', { weekday: 'long' });
    },
    taskDate: (vm) => {
      let convertedDate = new Date(vm.date);

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
      :id="task.task_id"
      :key="i"
      :title="task.title"
      :color="task.color"
      :completed="task.completed"
    ></Task>
    <GroupTaskList
      v-for="(group, i) in groups"
      :key="i"
      :name="group.name"
      :tasks="group.tasks"
    ></GroupTaskList>
  </div>
</template>
