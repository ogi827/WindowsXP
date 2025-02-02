<template>
  <main
    id="app"
    class="w-full h-screen subpixel-antialiased select-none flex flex-col overflow-hidden"
    :class="scanlines ? 'scanlines' : ''"
    @contextmenu="contextmenu"
  >
    <component
      :is="activeScreen"
      :state="state"
      :user="loggedInUser"
      :api="api"
      v-on="api"
    />
  </main>
</template>

<script>
import Bios from "./Screens/Bios";
import Bsod from "./Screens/Bsod";
import Desktop from "./Screens/Desktop";
import Loading from "./Screens/Loading";
import Login from "./Screens/Login";
import NewUser from "./Screens/NewUser";
import Post from "./Screens/Post";
import Power from "./Screens/Power";
import Restarting from "./Screens/Restarting";
import ShuttingDown from "./Screens/ShuttingDown";

import defaultState from "../data/defaultState";
import defaultProfile from "../data/defaultProfile";

import sounds from "../data/sounds";
import state from "../state";

// import Speech from "speak-tts";

export default {
  components: {
    Bios,
    Bsod,
    Desktop,
    Loading,
    Login,
    NewUser,
    Post,
    Power,
    Restarting,
    ShuttingDown,
  },
  data: () => ({
    loggedInUserId: null,
    activeScreen: "power",
    state,
    // speech: new Speech(),
    audio: [],
  }),
  mounted() {
    this.loadState();
    this.preloadSounds();

    // this.speech
    //   .init({
    //     voice: "Daniel",
    //   })
    //   .catch((e) => {
    //     console.error("An error occured while initializing : ", e);
    //   });
  },
  watch: {
    state() {
      this.saveState();
    },
  },
  methods: {
    preloadSounds() {
      sounds.forEach((sound) => {
        let audio = new Audio();
        audio.src = "sounds/" + sound + ".mp3";

        this.audio[sound] = audio;
      });
    },
    playSound(sound) {
      this.audio[sound].play().catch(function () {});
    },
    // say(text) {
    //   this.speech
    //     .speak({
    //       text: text,
    //     })
    //     .catch((e) => {
    //       console.error("An error occurred :", e);
    //     });
    // },
    addProfile(user) {
      let profiles = this.state.profiles;

      profiles.push({
        ...user,
        ...defaultProfile,
      });

      let state = this.state;

      state.profiles = profiles;

      this.state = state;

      this.saveState();
    },
    updateProfile(user) {
      let index = state.profiles.findIndex(
        (profile) => profile.name === user.name
      );

      this.state.profiles[index] = user;

      this.saveState();
    },
    fullscreen() {
      if (this.$el.requestFullscreen) {
        this.$el.requestFullscreen().catch((err) => console.error(err));
      }
    },
    login(id) {
      // this.say("Hello " + id + " i'm clippy");
      this.loggedInUserId = id;
      this.activeScreen = "desktop";
    },
    logout() {
      this.loggedInUserId = null;
      this.activeScreen = "login";
    },
    shutdown() {
      this.logout();
      this.activeScreen = "shutting-down";
    },
    restart() {
      this.logout();
      this.activeScreen = "restarting";
    },
    reset() {
      this.state = defaultState;
      this.saveState();

      window.location.reload();
    },
    stopSound(sound) {
      if (this.audio[sound]) {
        this.audio[sound].pause();
      }
    },
    changeScreen(screen) {
      this.activeScreen = screen;
    },
    contextmenu(e) {
      e.preventDefault();
    },
    saveState() {
      localStorage.setItem("state", JSON.stringify(this.state));
    },
    loadState() {
      let state = localStorage.getItem("state");

      if (state) {
        state = JSON.parse(state);
      } else {
        state = defaultState;
      }

      this.state = state;
    },
  },
  computed: {
    api() {
      let t = this;

      return {
        "set-state": (state) => {
          console.error("dont do this");
          console.trace();
          this.state = state;
        },
        "change-screen": (screenId) => t.changeScreen(screenId),
        "play-sound": (sound) => t.playSound(sound),
        "stop-sound": (sound) => t.stopSound(sound),
        "add-profile": (profile) => t.addProfile(profile),
        "update-profile": (profile) => t.updateProfile(profile),
        login: (id) => t.login(id),
        logout: () => t.logout(),
        shutdown: () => t.shutdown(),
        restart: () => t.restart(),
        reset: () => t.reset(),
      };
    },
    loggedInUser() {
      return this.loggedInUserId !== null
        ? this.state.profiles.find((user) => user.name === this.loggedInUserId)
        : null;
    },
    scanlines() {
      return this.activeScreen === "power" ? "" : "scanlines";
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: Tahoma, Verdana, Segoe, sans-serif;
  overscroll-behavior-y: contain;
  -webkit-tap-highlight-color: transparent;
}

$colors : (
  balloon: rgb(247, 247, 221),
  clippy: rgb(255, 254, 210),
  note: rgb(250, 228, 85),
  cream: rgb(238, 236, 221),
  cream-alt: rgb(208, 205, 184),
  bsod: rgb(0, 21, 164),
);

@each $key, $value in $colors {
  .bg-#{$key} {
    background-color: rgba($value, var(--tw-bg-opacity));
    --tw-bg-opacity: 1;
  }
  .text-#{$key} {
    color: rgba($value, var(--tw-text-opacity));
    --tw-text-opacity: 1;
  }
  .from-#{$key} {
    --tw-gradient-from: #{$value};
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, #{$value});
  }

  .to-#{$key} {
    --tw-gradient-to: #{$value};
  }
}

.scale-600 {
  --tw-scale-x: 6;
  --tw-scale-y: 6;
}

.text-shadow-lg {
  text-shadow: 0 0 3px rgba(0, 0, 0, 1);
}

.text-2xs {
  font-size: 0.65rem;
}

.font-heading {
  font-family: "Franklin Gothic Medium", "Franklin Gothic",
    "ITC Franklin Gothic", Arial, sans-serif;
}

.pixelated {
  image-rendering: pixelated;
}

svg.img-shadow,
div.img-shadow svg {
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
}

.fade-enter-active {
  animation: fade-in .1s;
}

.fade-leave-active {
  animation: fade-out .1s;
}

.fade-slow-enter-active {
  animation: fade-in 1s;
}

.fade-slow-leave-active {
  animation: fade-out 1s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

// https://gist.github.com/hut8/fb79cf502846442761d6

$screen-background: #575757;

.scanlines {
  // TODO: Enable
  background: $screen-background;
  position: relative;

  // scanlines
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(transparentize($screen-background,1) 50%, transparentize(darken($screen-background,10),0.75) 50%), linear-gradient(90deg,transparentize(#ff0000,0.94),transparentize(#00ff00,0.98),transparentize(#0000ff,0.94));
    z-index: 55;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>