<template>
  <div class="w-full h-full bg-cream">
    <div class="p-4">
      <div v-if="playing">playing! 😎</div>
      <div v-else>not playing 😔</div>
    </div>
    <div class="p-4">
      <input type="range" :value="position" min="0" :max="duration" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    playing: false,
    source: "",
    name: "",
    artist: "",
    albumArt: "",
    position: 0,
    duration: 0,
  }),
  mounted() {
    this.start();
  },
  methods: {
    start() {
      const token =
        "BQB8TcRnx24gRWk8lWwrXZRDdiNMh2blSsr2YAOm9hgVSwXKYfttYaocrXgHN6L3_vGYXnEnqr8rwlcAzhqxrRrLb6GOMaNQ3Wjbur22KWsDcc8Fw2DyIkaoaBVlVQ8KIa7a7DV8wiKjoP_WGa8_giuFaohKA_dUU2JO";

      const player = new Spotify.Player({
        name: "Spotify XP",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        if (state) {
          console.log({ state });
          this.playing = !state.paused;

          if (state.track_window && state.track_window.current_track) {
            if (state.track_window.current_track.name) {
              this.source = state.context.metadata.context_description;
              this.name = state.track_window.current_track.name;
              this.artist = state.track_window.current_track.artists
                .map((artist) => artist.name)
                .join(", ");
              this.albumArt =
                state.track_window.current_track.album.images[0].url;
              this.position = state.position;
              this.duration = state.duration;
            }
          }
        } else {
          console.error("no state");
        }
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    },
  },
};
</script>