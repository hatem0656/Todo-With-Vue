import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);
app.use(router).mount("#app");
app.config.globalProperties.apiLink =
  "https://todo-app-an4y.onrender.com/api/todos/";
