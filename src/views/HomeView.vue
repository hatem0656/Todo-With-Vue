<template>
  <div class="bk"></div>
  <div class="home">
    <div class="container">
      <Header />
      <TaskInput @posted="() => (refresh = !refresh)" />
      <TaskList :refresh="refresh" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import TaskInput from "@/components/TaskInput.vue";
import TaskList from "@/components/TaskList.vue";
export default {
  name: "HomeView",
  components: {
    Header,
    TaskInput,
    TaskList,
  },
  data() {
    return {
      refresh: false,
    };
  },
};
</script>

<style>
.bk {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 40vh;
  background-size: cover;
  background-image: var(--bk-image);
}
</style>
