import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/main.css";
import { vClickOutside } from "./directives/v-click-outside";

const app = createApp(App);

app.directive("click-outside", vClickOutside);
app.use(createPinia());
app.use(router);
app.mount("#app");
