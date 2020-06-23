<script>
import TaskList from './TaskList';

// Used to make API calls
import API from '../utility/API';

// Function to pad date numbers
const pad = (n) => {
  return n < 10 ? '0' + n : n;
};

// Function to get formated date
const getDate = (date) => {
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${pad(date.getFullYear())}`;
};

export default {
  name: 'TaskContainer',
  components: { TaskList },
  data() {
    return {
      tab: 'all',
      tabStyle: 'p-3 font-semibold border-r-2 border-grey-dark focus:outline-none',
      taskTimetable: [],
    };
  },
  computed: {
    organizedTimetable: (vm) => {
      const tasks = vm.taskTimetable;
      let taskArray = {};
      let ta = [];

      // Sort recieved tasks into seperate days
      tasks.map((task) => {
        if (task.date in taskArray) {
          if (task.task_group_id === null) {
            taskArray[task.date].tasks.push(task);
          } else {
            if (task.task_group_id in taskArray[task.date].groups) {
              taskArray[task.date].groups[task.task_group_id].push(task);
            } else {
              taskArray[task.date].groups[task.task_group_id] = [task];
            }
          }
        } else {
          if (task.task_group_id === null) {
            taskArray[task.date] = { tasks: [task], groups: {} };
          } else {
            let group = {};
            group[task.task_group_id] = [task];

            taskArray[task.date] = { tasks: [], groups: group };
          }
        }
      });

      for (const key in taskArray) {
        let taskDay = taskArray[key];
        let taskDayGroup = [];

        for (const groupKey in taskDay.groups) {
          let group = taskDay.groups[groupKey];
          taskDayGroup.push({ name: group[0].task_group_title, tasks: group });
        }

        ta.push({ date: key, tasks: taskDay.tasks, groups: taskDayGroup });
      }

      return ta;
    },
  },
  created() {
    Event.$on('tasksRetrieved', (data) => {
      this.taskTimetable = data.tasks;
    });

    Event.$on('timeline-changed', (i) => {
      let timelines = ['today', 'week', 'all'];

      if (timelines[i] === 'today') {
        API.get(`/task/today?date=${getDate(new Date())}`, 'tasksRetrieved', 200);
      } else if (timelines[i] === 'all') {
        API.get('/task/all', 'tasksRetrieved', 200);
      } else if (timelines[i] === 'week') {
        let dateSevenDays = new Date();
        dateSevenDays.setDate(dateSevenDays.getDate() + 7);

        API.get(
          `/task/week?start_date=${getDate(new Date())}&end_date=${getDate(
            dateSevenDays,
          )}`,
          'tasksRetrieved',
          200,
        );
      }
    });

    Event.$on('task-deleted', (data) => {
      this.taskTimetable = this.taskTimetable.filter(
        (task) => task.task_id !== data.task_id,
      );
    });

    API.get(`/task/today?date=${getDate(new Date())}`, 'tasksRetrieved', 200);
  },
  methods: {
    changeTab() {
      this.tab = this.tab === 'all' ? 'mine' : 'all';
    },
    addNewTask() {
      window.location.href = '/create';
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
      v-for="taskDay in organizedTimetable"
      :key="taskDay.date"
      :tasks="taskDay.tasks"
      :groups="taskDay.groups"
      :date="taskDay.date"
    ></TaskList>
  </div>
</template>
