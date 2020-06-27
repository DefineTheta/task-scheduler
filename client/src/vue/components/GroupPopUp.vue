<script>
// Used to make API calls
import API from '../utility/API';

export default {
  data() {
    return {
      searchGroupName: '',
      errorMessage: '',
      errorPresent: false,
      searchedGroups: [],
      showGroupCreation: false,
    };
  },
  created() {
    Event.$on('group-search-failed', (data) => {
      this.errorPresent = true;
      this.errorMessage = data.error;
    });

    Event.$on('group-search-success', (data) => {
      console.log(data.groups.length);
      if (data.groups.length === 0) {
        this.errorPresent = true;
        this.errorMessage = 'Sorry this task group does not exist';
        this.showGroupCreation = true;
      } else {
        this.searchedGroups = data.groups;
      }
    });

    Event.$on('group-creation-failed', (data) => {
      this.errorPresent = true;
      this.errorMessage = data.error;
    });

    Event.$on('group-creation-success', (data) => {
      Event.$emit('task-group-selected', data.task_group_id);
      Event.$emit('group-popup-button-clicked');
    });
  },
  methods: {
    closePopup() {
      Event.$emit('group-popup-button-clicked');
    },
    createTaskGroup() {
      API.post(
        '/task/group',
        { task_group_name: this.searchGroupName },
        'group-creation-failed',
        422,
        200,
        'group-creation-success',
      );
    },
    searchGroup() {
      API.post(
        '/task/group/search',
        { task_group_name: this.searchGroupName },
        'group-search-failed',
        422,
        200,
        'group-search-success',
      );
    },
    selectGroup(id) {
      Event.$emit('task-group-selected', id);
      Event.$emit('group-popup-button-clicked');
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
    <div class="w-116 min-h-80 flex flex-col bg-white shadow-4dp fixed z-20">
      <div class="w-full h-12 bg-side-grey flex flex-row justify-between">
        <div class="flex flex-row">
          <button
            title="Search Workspace"
            class="p-3 flex flex-row items-center font-semibold border-r-2 border-grey-dark focus:outline-none font-bold bg-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M12.9 14.32C11.2927 15.5686 9.26997 16.1576 7.24363 15.9671C5.2173 15.7767 3.33973 14.8211 1.99325 13.2949C0.646757 11.7687 -0.0674123 9.78666 -0.00384476 7.75238C0.0597228 5.71811 0.896247 3.78454 2.3354 2.34539C3.77455 0.906241 5.70811 0.0697173 7.74239 0.00614975C9.77666 -0.0574178 11.7587 0.656751 13.2849 2.00324C14.8111 3.34973 15.7667 5.22729 15.9571 7.25363C16.1476 9.27997 15.5586 11.3027 14.31 12.91L19.66 18.24L18.24 19.66L12.91 14.32H12.9ZM8 14C8.78794 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2418 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2418 4.97594 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78794 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14V14Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span class="ml-3">
              Search
            </span>
          </button>
        </div>
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
      <form class="m-3 flex flex-col" onsubmit="return false;">
        <div class="text-lg font-bold">Search For Groups</div>
        <li v-if="errorPresent" class="font-semibold text-red-600 text-sm">
          {{ errorMessage }}
        </li>
        <div class="flex flex-col items-center">
          <input
            v-model="searchGroupName"
            type="text"
            name="username"
            class="mt-2 w-full h-10 px-1 bg-textbox-grey text-sm font-semibold focus:outline-none"
            placeholder="Name"
          />
          <div v-if="searchedGroups.length > 0" class="w-full mt-1">
            <div
              v-for="group in searchedGroups"
              :key="group.task_group_id"
              class="w-full mt-2 py-1 flex flex-row bg-textbox-grey text-black-primary justify-between items-center font-semibold cursor-pointer workspace-item"
            >
              <span>
                {{ group.task_group_name }}
              </span>
              <button
                class="mr-2 focus:outline-none"
                @click="selectGroup(group.task_group_id)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="16" height="15.2381" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use xlink:href="#image0" transform="scale(0.047619 0.05)" />
                    </pattern>
                    <image
                      id="image0"
                      width="21"
                      height="20"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAAXNSR0IArs4c6QAAAHFJREFUOBFjYGBg+E8ApwHlkQGIj1cPE7JqarJhtkpSaChIP9gsmrh0+BnaAw0vEE0Q0MT7LEBrGQlaTZyC58SYtRmoCJbcsNEgeayAJt7HahMWQZIjCua1wZ2jQD4dGi6lSezTxFDkMIWFLTo9OEp+APPUO5cVXVflAAAAAElFTkSuQmCC"
                    />
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <button
            v-if="!showGroupCreation"
            class="mt-2 w-50 h-8 submit-btn text-sm font-semibold rounded focus:outline-none"
            @click="searchGroup"
          >
            Search
          </button>
          <button
            v-else
            class="mt-2 w-50 h-8 submit-btn text-sm font-semibold rounded focus:outline-none"
            @click="createTaskGroup"
          >
            Create Group
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

.workspace-item {
  &:hover {
    background-color: #CCCCCC;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
