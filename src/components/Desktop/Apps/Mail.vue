<template>
  <div class="w-full h-full flex flex-col">
    <toolbar :menus="toolbar" />
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <div
        class="h-1/2 lg:h-auto lg:w-1/3 lg:border-r border-gray-300 overflow-auto"
        @click.self="selectedIndex = null"
      >
        <div
          class="sticky top-0 bg-cream border-b border-gray-300 shadow text-xs flex"
        >
          <div class="cursor-pointer px-2 py-1 w-5/6 border-r border-gray-300">
            From
          </div>
          <div class="cursor-pointer px-2 py-1 w-1/6">Date</div>
        </div>
        <div
          v-for="(message, i) in messages"
          :key="message.id"
          class="p-2 border-b border-gray-300 cursor-pointer hover:bg-blue-600 hover:text-white"
          :class="selectedIndex === i ? 'bg-blue-600 text-white' : ''"
          @click="
            selectedIndex = i;
            selectedAttachmentIndex = null;
          "
        >
          <div class="flex items-center justify-between mb-2 text-sm">
            <div>{{ message.contact.name }}</div>
            <div>time</div>
          </div>
          <div :class="message.unread ? 'font-bold' : ''">
            {{ message.subject }}
          </div>
        </div>
      </div>
      <div
        v-if="selectedMail"
        class="h-1/2 lg:h-auto lg:w-2/3 lg:border-t-0 flex flex-col"
      >
        <div
          class="sticky top-0 bg-cream border-t text-sm lg:border-t-0 border-b border-gray-300 px-2 py-1"
        >
          <div class="mb-1">
            <span class="font-bold">From:</span> {{ selectedMail.contact.name }}
          </div>
          <div>
            <span class="font-bold">Subject:</span> {{ selectedMail.subject }}
          </div>
        </div>
        <div
          class="p-2 leading-normal flex-1 overflow-auto"
          v-html="formattedMessage"
        ></div>
        <div
          v-if="selectedMail.attachments"
          class="bg-cream px-2 py-1 text-sm leading-none border-t border-gray-300 flex items-center"
        >
          <div class="font-bold pr-2">Attachments:</div>
          <div
            v-for="(attachment, i) in selectedMail.attachments"
            :key="i"
            @click="selectedAttachmentIndex = i"
            @dblclick="openAttachment(attachment)"
            class="flex items-center p-1 cursor-pointer"
            :class="
              selectedAttachmentIndex === i ? 'bg-blue-600 text-white' : ''
            "
          >
            <div class="w-4 h-4" v-html="attachment.icon"></div>
            <div class="pl-2">{{ attachment.name }}</div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="h-1/2 p-2 lg:h-auto lg:w-2/3 border-t lg:border-t-0 border-gray-300 text-gray-400 flex items-center justify-center"
      >
        Select a message
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "../../Window/Toolbar";

import mail from "../../../data/mail";
import characters from "../../../data/characters";

export default {
  components: {
    Toolbar,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    messages() {
      return this.user.mail.map((messageId) => {
        let message = mail.find((message) => message.id === messageId);

        if (!message) {
          console.error("Missing message", messageId);
        }

        let contact = characters.find(
          (character) => character.id === message.characterId
        );

        message.unread = true;

        return { ...message, contact };
      });
    },
    selectedMail() {
      return this.selectedIndex !== null
        ? this.messages[this.selectedIndex]
        : null;
    },
    formattedMessage() {
      return this.selectedMail
        ? this.selectedMail.message.replace(/\n/g, "<br />")
        : "";
    },
  },
  methods: {
    openAttachment(attachment) {
      if (attachment.screenId) {
        this.$emit("change-screen", attachment.screenId);
      }
    },
  },
  data: () => ({
    selectedIndex: 0,
    selectedAttachmentIndex: 0,
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
        label: "Edit",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "View",
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
        label: "Message",
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