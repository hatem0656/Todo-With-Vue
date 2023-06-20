<template>
  <div class="task-container">
    <div class="checkbox"></div>
    <input
      type="text"
      placeholder="write your todo..."
      v-model="task.content"
      @keyup.enter="postTask"
    />
  </div>
</template>
<script>
export default {
  name: "TaskInput",

  data() {
    return {
      task: {
        content: "",
      },
    };
  },
  methods: {
    async postTask() {
      try {
        const content = this.task.content;
        this.task.content = "";
        await fetch(this.apiLink, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
        // for triggring the watch function in TaskList component through props
        this.$emit("posted");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.task-container {
  max-width: 100%;
  padding: 10px 12px;
  background-color: var(--main-color);
  display: flex;
  align-items: center;
  border-radius: 4px;
}
.task-container .checkbox {
  margin-right: 10px;
}
input {
  flex: 1;
  height: 30px;
  padding: 0;
  background-color: inherit;
  color: var(--main-Fcolor);
  border: none;
  outline: none;
  box-shadow: none;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
}

input::placeholder {
  text-transform: capitalize;
  letter-spacing: 2px;
}
</style>
