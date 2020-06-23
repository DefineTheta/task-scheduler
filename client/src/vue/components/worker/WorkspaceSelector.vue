<script>
// Used to make API calls
import API from '../../utility/API';

export default {
  name: 'WorkspaceSelector',
  data() {
    return {
      workspaces: [],
      activeWorkspaceId: null,
    };
  },
  created() {
    Event.$on('workspace-data-recieved', (data) => {
      this.workspaces = data.workspaces;
      this.activeWorkspaceId = data.active;
    });

    Event.$on('workspace-join-success', () => {
      API.get('/workspace', 'workspace-data-recieved', 200);
    });

    API.get('/workspace', 'workspace-data-recieved', 200);
  },
  methods: {
    popupButtonClicked() {
      Event.$emit('workspace-popup-button-clicked');
    },
    changeWorkspace(id) {
      API.put('/workspace/change', { workspace_id: id });
    },
  },
};
</script>

<template>
  <div class="w-full mt-4 flex flex-col">
    <div
      class="mb-1 pb-1 border-b border-black-secondary flex flex-row justify-between items-center"
    >
      <span class="text-lg font-semibold">Workspaces</span>
      <button class="focus:outline-none" @click="popupButtonClicked">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 10C14 10.552 13.552 11 13 11H11V13C11 13.552 10.552 14 10 14C9.448 14 9 13.552 9 13V11H7.00001C6.44801 11 6 10.552 6 10C6 9.448 6.44801 9 7.00001 9H9V7C9 6.448 9.448 6 10 6C10.552 6 11 6.448 11 7V9H13C13.552 9 14 9.448 14 10ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
    <span
      v-for="workspace in workspaces"
      :key="workspace.workspace_id"
      class="w-full mt-1 py-1 flex flex-row justify-between items-center font-semibold cursor-pointer workspace-item"
      :class="{
        'pl-1 border-l-4 border-selected bg-highlight-grey text-black-primary':
          activeWorkspaceId === workspace.workspace_id,
        'text-black-secondary': activeWorkspaceId !== workspace.workspace_id,
      }"
      @click="changeWorkspace(workspace.workspace_id)"
    >
      {{ workspace.workspace_name }}
    </span>
  </div>
</template>

<style lang="sass">
.workspace-item {
  &:hover {
    background-color: #CCCCCC;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
