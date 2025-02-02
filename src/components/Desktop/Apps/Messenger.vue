<template>
  <div class="w-full h-full flex flex-col">
    <toolbar :menus="toolbar" />
    <contacts
      v-if="!this.characterId"
      :state="state"
      :user="user"
      :signed-in="signedIn"
      @open-chat="openChat"
      @play-sound="$emit('play-sound', $event)"
    />
    <chat
      v-if="this.characterId"
      :state="state"
      :user="user"
      :character-id="characterId"
    />
  </div>
</template>

<script>
import Contacts from "./Messenger/Contacts";
import Chat from "./Messenger/Chat";
import Toolbar from "../../Window/Toolbar";

export default {
  props: {
    characterId: {
      type: String,
    },
    user: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
  },
  components: {
    Contacts,
    Chat,
    Toolbar,
  },
  methods: {
    openChat(contact) {
      this.$emit("open-app", {
        appId: "messenger",
        meta: {
          title: contact.character.name,
          data: { characterId: contact.character.id },
        },
      });
    },
  },
  mounted() {
    setTimeout(() => (this.signedIn = true), 1500);
  },
  data: () => ({
    signedIn: false,
    toolbar: [
      {
        label: "File",
        actions: [
          {
            label: "Open",
          },
          {
            label: "Print",
          },
        ],
      },
      {
        label: "Contacts",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "Actions",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "Tools",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "Help",
        actions: [
          {
            label: "Test",
          },
        ],
      },
    ],
  }),
};
</script>