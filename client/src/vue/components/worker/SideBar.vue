<script>
import TimelineSelecter from '../TimelineSelecter';
import WorkspaceSelector from './WorkspaceSelector';

export default {
  name: 'SideBar',
  components: { TimelineSelecter, WorkspaceSelector },
  data() {
    return {};
  },
};
</script>

<template>
  <div
    class="w-74 h-screen px-3 py-4 bg-side-grey flex flex-col items-center shadow-4dp fixed top-16"
  >
    <TimelineSelecter></TimelineSelecter>
    <WorkspaceSelector></WorkspaceSelector>
  </div>
</template>
