<script>
import Task from './Task';

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
    name: {
      type: String,
      required: true,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
};
</script>

<template>
  <div class="w-full mx-3 mb-2 flex flex-col items-center bg-textbox-grey">
    <div class="w-full ml-4 mb-1 flex flex-row items-center">
      <button
        v-if="!toggled"
        class="font-semibold focus:outline-none"
        @click="toggled = !toggled"
      >
        ▶
      </button>
      <button v-else class="font-semibold focus:outline-none" @click="toggled = !toggled">
        ▼
      </button>
      <span class="ml-2 font-semibold text-sm">{{ name }}</span>
    </div>
    <div v-if="toggled" class="w-full pl-8 flex flex-col items-center">
      <Task
        v-for="(task, i) in tasks"
        :id="task.task_id"
        :key="i"
        :title="task.title"
        :color="task.color"
        :completed="task.completed"
      ></Task>
    </div>
  </div>
</template>
