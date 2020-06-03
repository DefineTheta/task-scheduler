<script>
import TaskList from './TaskList';

export default {
  name: 'TaskContainer',
  components: { TaskList },
  props: {
    userId: {
      type: Number,
      required: true,
      default: () => {
        return -1;
      },
    },
  },
  data() {
    return {
      tab: 'all',
      tabStyle:
        'p-3 font-semibold border-r-2 border-grey-dark cursor-pointer focus:outline-none',
      taskTimetable: [
        {
          date: 1591109736,
          tasks: [
            { title: 'Hi I am a Task', user: 1, completed: false },
            { title: 'Hi Gary', user: 1, completed: false, color: 'red' },
            { title: 'Look at me', user: 3, completed: false },
            { title: 'I am Mr. Meeseeks', user: 2, completed: false },
            { title: 'SAY MY NAME!', user: 1, completed: false },
            { title: ':)', user: 4, completed: false },
          ],
        },
        {
          date: 1591196136,
          tasks: [
            { title: 'Hi I am a Task', user: 1, completed: false },
            { title: 'Hi Gary', user: 1, completed: false },
            { title: 'Look at me', user: 3, completed: false, color: 'teal' },
            { title: 'I am Mr. Meeseeks', user: 2, completed: false },
            { title: 'SAY MY NAME!', user: 1, completed: false },
            { title: ':)', user: 4, completed: false },
          ],
        },
        {
          date: 1591368936,
          tasks: [
            { title: 'Hi I am a Task', user: 1, completed: false },
            { title: 'Hi Gary', user: 1, completed: false },
            { title: 'Look at me', user: 3, completed: false },
            { title: 'I am Mr. Meeseeks', user: 2, completed: false },
            { title: 'SAY MY NAME!', user: 1, completed: false },
            { title: ':)', user: 4, completed: false },
          ],
        },
      ],
    };
  },
  computed: {
    filteredTaskTimetable: (vm) => {
      if (vm.tab === 'mine') {
        return vm.taskTimetable.map((taskDay) => {
          let filteredObj = { date: taskDay.date };
          filteredObj.tasks = taskDay.tasks.filter((task) => {
            return task.user === vm.userId;
          });

          return filteredObj;
        });
      } else {
        return vm.taskTimetable;
      }
    },
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
      <button
        :class="[tabStyle, tab === 'all' && 'font-bold bg-white']"
        @click="tab = 'all'"
      >
        All Tasks
      </button>
      <button
        :class="[tabStyle, tab === 'mine' && 'font-bold bg-white']"
        @click="tab = 'mine'"
      >
        My Tasks
      </button>
    </div>
    <TaskList
      v-for="taskDay in filteredTaskTimetable"
      :key="taskDay.date"
      :tasks="taskDay.tasks"
      :date="taskDay.date"
    ></TaskList>
  </div>
</template>
