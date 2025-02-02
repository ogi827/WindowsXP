import { createApp } from "vue";
import VueHotkey from "v-hotkey";
import VueClickAway from "vue3-click-away";

import App from "./components/App.vue";

const app = createApp(App);

app.use(VueClickAway);

app.directive("hotkey", {
  beforeMount: VueHotkey.directive.bind,
  updated: VueHotkey.directive.componentUpdated,
  unmounted: VueHotkey.directive.unbind
});

app.mount("#app");
