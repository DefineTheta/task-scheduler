<script>
import TaskList from './TaskList';

// Used to make API calls
import API from '../utility/API';

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
    userType: {
      type: String,
      required: true,
      default: () => {
        return '';
      },
    },
    type: {
      type: String,
      require: true,
      default: () => {
        return 'today';
      },
    },
  },
  data() {
    return {
      tab: 'all',
      tabStyle: 'p-3 font-semibold border-r-2 border-grey-dark focus:outline-none',
      taskTimetable: [],
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
  created() {
    Event.$on('tasksRetrieved', (data) => {
      this.taskTimetable = data;
    });

    Event.$on('timeline-changed', (i) => {
      let timelines = ['today', 'week', 'all'];

      API.get(
        `/api/v1/${this.userType}/tasks?timeline=${timelines[i]}`,
        'tasksRetrieved',
      );
    });

    API.get(`/api/v1/${this.userType}/tasks?timeline=today`, 'tasksRetrieved');
  },
  methods: {
    changeTab() {
      this.tab = this.tab === 'all' ? 'mine' : 'all';
    },
    addNewTask() {
      window.location.href = '/new_task.html';
    },
  },
};
</script>

<template>
  <div class="w-162 min-h-120 mt-8 mb-10 flex flex-col bg-white rounded shadow-4dp">
    <div class="w-full h-12 bg-side-grey flex flex-row justify-between">
      <div class="flex flex-row">
        <button
          :class="[tabStyle, tab === 'all' && 'font-bold bg-white']"
          @click="tab = 'all'"
        >
          All Tasks
        </button>
        <button
          v-if="userType === 'worker'"
          :class="[tabStyle, tab === 'mine' && 'font-bold bg-white']"
          @click="tab = 'mine'"
        >
          My Tasks
        </button>
      </div>
      <button
        v-if="userType === 'manager'"
        class="border-l-2 border-grey-dark flex flex-row items-center focus:outline-none"
        @click="addNewTask"
      >
        <svg
          class="ml-3"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.55 6H9.45V9H6.3V11H9.45V14H11.55V11H14.7V9H11.55V6ZM18.9 14H21V6H18.9V14ZM18.9 18H16.8V20H21V16H18.9V18ZM16.8 0V2H18.9V4H21V0H16.8ZM0 14H2.10001V6H0V14ZM2.10001 16H0V20H4.2V18H2.10001V16ZM0 0V4H2.10001V2H4.2V0H0ZM6.3 20H14.7V18H6.3V20ZM6.3 2H14.7V0H6.3V2Z"
            fill="black"
          />
        </svg>
        <span class="p-3 font-semibold">
          New Task
        </span>
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
