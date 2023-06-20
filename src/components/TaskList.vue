<template>
  <div class="task-list">
    <!-- when key is changed the task is re-render and it catches the change of the checkbox -->
    <!-- In vue you can force a component to re-render by changing the key attribute -->
    <!-- You can bind the key attribute to reactive value and change the reactive value to force re-render -->
    <div
      class="task-container"
      v-for="task in listTasks"
      :key="task._id + this.check"
    >
      <div
        class="checkbox"
        :class="{ checked: task.isChecked }"
        @click="
          () => {
            task.isChecked = !task.isChecked;
            this.check = !this.check;
          }
        "
      >
        <i class="bi bi-check"></i>
      </div>
      <div class="task" :class="{ checked: task.isChecked }">
        {{ task.content }}
      </div>
      <i class="bi bi-x-lg delete" @click="deleteTask(task._id)"></i>
    </div>
  </div>
  <div class="task-container">
    <h3>{{ leftTasks }} item{{ leftTasks > 1 ? "s" : "" }} left</h3>

    <span
      @click="this.showOption = 'all'"
      :class="{ active: optionState[0] }"
      class="all"
      >All</span
    >
    <span
      @click="this.showOption = 'active'"
      :class="{ active: optionState[1] }"
      >Active</span
    >
    <span
      @click="this.showOption = 'completed'"
      class="completed"
      :class="{ active: optionState[2] }"
      >Completed</span
    >
    <span @click="clearCompleted">Clear Completed</span>
  </div>
</template>
<script>
export default {
  name: "TaskList",

  data() {
    return {
      tasks: [],
      updated: false, //updated is used to make a new get request for tasks when a task is deleted
      check: false, // used to force the task to re-render to catch the changes of the checkbox (aslo used to update left tasks)
      showOption: "all",
      leftTasks: 0,
      optionState: [true, false, false],
    };
  },
  props: {
    // Used to make the Home component trigger the watch function
    refresh: Boolean,
  },
  methods: {
    async getTasks() {
      try {
        const response = await fetch(this.apiLink);
        this.tasks = await response.json();
        this.leftTasks = this.tasks.length;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      try {
        await fetch(this.apiLink + id, {
          method: "DELETE",
        });
        //toggling updated to trigger the watch function
        this.updated = !this.updated;
      } catch (error) {
        console.log(error);
      }
    },
    async clearCompleted() {
      const completedTasks = this.mappedTasks.filter((task) => task.isChecked);
      completedTasks.forEach((task) => this.deleteTask(task._id));
    },
  },
  mounted() {
    this.getTasks();
  },
  watch: {
    // when a task is deleted make a new get requeset
    async updated() {
      this.getTasks();
    },
    // when a new task is posted maked a new get requset
    async refresh() {
      this.getTasks();
    },
    // when a checkbox is pressed the left tasks is updated
    check() {
      this.leftTasks = this.mappedTasks.filter(
        (task) => !task.isChecked
      ).length;
    },
  },
  computed: {
    // adding is.Checked property to each task
    mappedTasks() {
      return this.tasks.map((task) => {
        return { ...task, isChecked: false };
      });
    },

    listTasks() {
      if (this.showOption === "all") {
        this.optionState = [true, false, false];
        return this.mappedTasks;
      } else if (this.showOption === "active") {
        this.optionState = [false, true, false];
        return this.mappedTasks.filter((task) => !task.isChecked);
      } else {
        this.optionState = [false, false, true];
        return this.mappedTasks.filter((task) => task.isChecked);
      }
    },
  },
};
</script>

<style>
.task-list {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
.task-list .checkbox {
  cursor: pointer;
}
.task-list .checkbox.checked {
  background-color: #8b94e9;
}

.task-list .checkbox i {
  color: white;
  visibility: hidden;
}
.task-list .checkbox.checked i {
  visibility: visible;
}
.task {
  flex: 1;
  height: 30px;
  padding: 0;
  margin-top: 20px;
  background-color: inherit;
  color: var(--main-Fcolor);
  font-weight: 700;
  font-size: 0.9rem;
  position: relative;
}
.task.checked {
  text-decoration: line-through;
}
.task::after {
  content: "";
  width: calc(100% + 74px);
  height: 1px;
  background-color: var(--border-color);
  position: absolute;
  bottom: -10px;
  left: -41px;
}

.delete {
  margin-right: 5px;
  color: var(--main-Fcolor);
  cursor: pointer;
  visibility: hidden;
}
.task-list .task-container:hover .delete {
  visibility: visible;
}

.task-container span,
.task-container h3 {
  letter-spacing: 1px;
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--options-color);
}

@media (width > 576px) {
  .task-container span,
  .task-container h3 {
    font-size: 0.85rem;
  }
}
.task-container span {
  cursor: pointer;
}
.all {
  margin-left: auto;
  margin-right: 7px;
}
.completed {
  margin-right: auto;
  margin-left: 7px;
}
@media (width > 576px) {
  .all {
    margin-right: 20px;
  }
  .completed {
    margin-left: 20px;
  }
}
.task-container span:hover {
  color: var(--hover-color);
}

span.active {
  color: var(--selection-color);
}
</style>
