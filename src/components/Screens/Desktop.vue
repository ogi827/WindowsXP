<template>
  <div class="flex-1 flex flex-col overflow-hidden" @click="click">
    <background
      @select-icons="selectedIconIndexes = $event"
      @change-screen="$emit('change-screen', $event)"
      @open-app="openApp($event.id, $event.meta)"
      @play-sound="$emit('play-sound', $event)"
      :icons="icons"
    >
      <template #notes>
        <!-- <note /> -->
        <clippy
          v-if="clippy"
          @close="activeTipId = null"
          @change-tip="activeTipId = $event"
          v-on="{ ...api, ...windowApi }"
          :tip="clippy"
        />
      </template>
      <template #windows>
        <window
          v-for="(window, i) in windows"
          :key="window.id"
          :window="window"
          :user="user"
          :state="state"
          :active="activeWindowIndex === i"
          :api="api"
          :window-api="windowApi"
          @minimize="minimize(i)"
          @toggle-maximize="toggleMaximize(i)"
          @maximized="maximized(i, $event)"
          @close="closeWindow(i)"
          @focus="activeWindowIndex = i"
          v-on="{ ...api, ...windowApi }"
          ref="window"
        >
          <component
            :is="window.appId"
            :user="user"
            :state="state"
            :window="window"
            :api="api"
            :window-api="windowApi"
            v-on="{ ...api, ...windowApi }"
            v-bind="window.data"
            @change-screen="$emit('change-screen', $event)"
            @play-sound="$emit('play-sound', $event)"
            @open-app="$emit('open-app', $event)"
        /></window>
      </template>
    </background>
    <taskbar
      :open="showStartMenu"
      :notifications="notifications"
      @open-app="openApp($event.id, $event.meta, true)"
      @close-notification="closeNotification"
      @play-sound="$emit('play-sound', $event)"
      @toggle-start="showStartMenu = !showStartMenu"
      @close-start="showStartMenu = false"
    >
      <template #start>
        <start-menu
          :user="user"
          @logout="
            $emit('play-sound', 'logoff');
            $emit('logout');
          "
          @shutdown="showPowerOverlay = true"
        >
          <template #left>
            <div
              v-for="app in userApps"
              :key="app.id"
              class="flex items-center p-1 cursor-pointer hover:bg-blue-600 hover:text-white"
              @click="
                openApp(app.id, {});
                showStartMenu = false;
              "
            >
              <div
                class="w-10 h-10 flex-shrink-0 text-white img-shadow"
                v-html="app.icon"
              ></div>
              <div class="pl-2">{{ app.title }}</div>
            </div>
          </template>
          <template #right> </template>
        </start-menu>
      </template>
      <template #bar>
        <taskbar-button
          v-for="(window, i) in windows"
          :key="window.id"
          :window="window"
          :active="activeWindowIndex === i"
          @click="toggleShow(i)"
          @dblclick="toggleShow(i)"
        />
      </template>
    </taskbar>
    <transition name="fade-slow">
      <shutdown-overlay
        v-if="showPowerOverlay"
        @close="showPowerOverlay = false"
        @shutdown="$emit('shutdown')"
        @restart="$emit('restart')"
      />
    </transition>
    <screensaver v-if="showScreensaver" />
  </div>
</template>

<script>
import Background from "../Desktop/Background";
import Clippy from "../Desktop/Clippy";
import Taskbar from "../Desktop/Taskbar";
import TaskbarButton from "../Desktop/TaskbarButton";
import Screensaver from "../Desktop/Screensaver";
import ShutdownOverlay from "../Desktop/ShutdownOverlay";
import StartMenu from "../Desktop/StartMenu";
import Window from "../Window/Window";

import Console from "../Desktop/Apps/Console";
import Contacts from "../Desktop/Apps/Contacts";
import Explorer from "../Desktop/Apps/Explorer";
import Internet from "../Desktop/Apps/Internet";
import Installer from "../Desktop/Apps/Installer";
import Messenger from "../Desktop/Apps/Messenger";
import Mail from "../Desktop/Apps/Mail";
import Notepad from "../Desktop/Apps/Notepad";
import Paint from "../Desktop/Apps/Paint";
import Spotify from "../Desktop/Apps/Spotify";
import WordClock from "../Desktop/Apps/WordClock";

import apps from "../../data/apps";
import tips from "../../data/tips";

export default {
  components: {
    Background,
    Clippy,
    Screensaver,
    ShutdownOverlay,
    StartMenu,
    Taskbar,
    TaskbarButton,
    Window,

    Console,
    Contacts,
    Explorer,
    Internet,
    Installer,
    Messenger,
    Mail,
    Notepad,
    Paint,
    Spotify,
    WordClock,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
    api: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activeWindowIndex: null,
    activeTipId: null,
    showStartMenu: false,
    showPowerOverlay: false,
    showScreensaver: false,
    firstClick: true,
    windows: [], // TOOD Replace from state
    notifications: [], // TOOD Replace from state
    apps: apps,
  }),
  mounted() {
    this.buildWindowsFromState();
    this.buildNotificationsFromState();

    setTimeout(() => (this.activeTipId = "first"), 2000);
  },
  computed: {
    windowApi() {
      let t = this;

      return {
        "set-title": ({ windowId, title }) => t.setWindowTitle(windowId, title),
        "open-app": ({ appId, meta }) => t.openApp(appId, meta),
        "install-app": (appId) => t.installApp(appId),
        "add-notification": ({ appId, title, message }) =>
          t.addNotification(appId, title, message),
        "receive-mail": (mailId) => t.receiveMail(mailId),
      };
    },
    clippy() {
      return this.activeTipId !== null
        ? tips.find((tip) => tip.id === this.activeTipId)
        : this.user.clippy;
    },
    userApps() {
      return this.user.apps.map((appId) =>
        apps.find((app) => app.id === appId)
      );
    },
    icons() {
      return this.user.desktop.icons.map((icon, i) => ({
        ...icon,
        id: i,
        app: apps.find((app) => app.id === icon.appId),
      }));
    },
  },
  methods: {
    addNotification(appId, title, message) {
      let state = this.user;
      state.notifications.push({});

      this.setUserState(state);
    },
    receiveMail(mailId) {
      let state = this.user;
      state.mail.push(mailId);

      this.setUserState(state);
    },
    setWindowTitle(windowId, title) {
      this.windows[windowId].title = title;
    },
    setUserState(newState) {
      let state = this.state;
      let index = state.profiles.findIndex(
        (user) => user.name === this.user.name
      );

      state.profiles[index] = newState;

      this.$emit("set-state", state);
    },
    installApp(appId) {
      let state = this.state;
      state.apps.push(appId);

      this.setUserState(state);
    },
    closeNotification(appId) {
      let state = this.user;

      let index = state.notifications.findIndex(
        (notification) => notification.appId === appId
      );

      state.notifications.splice(index, 1);

      this.setUserState(state);
    },
    openApp(id, meta, closeNotifications = false) {
      const existingIndex = this.windows.findIndex((window) => {
        return (
          window.appId === id &&
          (typeof meta.data === "undefined" || window.data === meta.data)
        );
      });

      if (existingIndex !== -1) {
        this.showWindow(existingIndex);
      } else {
        let index = this.windows.length;

        let window = {
          id: index,
          appId: id,
          ...this.buildWindowFromMeta(meta),
        };

        this.windows.push(window);

        this.showWindow(index);
      }

      if (closeNotifications) {
        this.closeNotification(id);
      }
    },
    buildWindowFromMeta(meta) {
      return {
        data: typeof meta.data !== "undefined" ? meta.data : {},
        title: typeof meta.title !== "undefined" ? meta.title : null,
        minimize: typeof meta.minimize !== "undefined" ? meta.minimize : false,
        maximize: typeof meta.maximize !== "undefined" ? meta.maximize : false,
        open: typeof meta.open !== "undefined" ? meta.open : true,
      };
    },
    buildNotificationsFromState() {
      this.notifications = this.user.notifications;
    },
    buildWindowsFromState() {
      this.windows = this.user.windows.map((window, i) => ({
        id: i,
        appId: window.appId,
        ...this.buildWindowFromMeta(window.meta),
      }));
    },
    toggleShow(index) {
      if (index === this.activeWindowIndex) {
        this.windows[index].minimize = !this.windows[index].minimize;
      } else {
        this.windows[index].minimize = false;
      }

      if (this.windows[index].minimize) {
        let nextWindowIndex = this.windows.findIndex(
          (window) => !window.minimize
        );

        if (nextWindowIndex !== -1 && nextWindowIndex !== index) {
          this.activeWindowIndex = nextWindowIndex;
        } else {
          this.activeWindowIndex = null;
        }
      } else {
        this.activeWindowIndex = index;
      }
    },
    toggleMaximize(index) {
      this.windows[index].maximize = !this.windows[index].maximize;
    },
    maximized(index, e) {
      this.windows[index].maximize = e.state;
    },
    minimize(index) {
      this.windows[index].open = true;
      this.windows[index].minimize = true;

      this.activeWindowIndex = null;
    },
    maximize(index) {
      this.windows[index].open = true;
      this.windows[index].maximize = !this.windows[index].maximize;
    },
    closeWindow(index) {
      this.windows.splice(index, 1);

      this.focusNextWindow();
    },
    showWindow(index) {
      this.windows[index].open = true;
      this.windows[index].minimize = false;

      this.activeWindowIndex = index;
    },
    focusNextWindow() {
      const nextWindowIndex = this.windows
        .reverse()
        .findIndex((window) => !window.minimize);

      if (nextWindowIndex !== -1) {
        this.showWindow(nextWindowIndex);
      }
    },
    click() {
      this.$emit("play-sound", "click");
    },
  },
};
</script>