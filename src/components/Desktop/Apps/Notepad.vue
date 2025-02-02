<template>
  <div class="w-full h-full flex flex-col">
    <toolbar :menus="toolbar" />
    <textarea
      v-model="editorContent"
      class="w-full flex-1 p-1 leading-tight font-mono focus:outline-none"
      :class="wordWrap ? '' : 'whitespace-pre break-words'"
    ></textarea>
    <statusbar />
  </div>
</template>

<script>
import Toolbar from "../../Window/Toolbar";
import Statusbar from "../../Window/Statusbar";

export default {
  components: {
    Toolbar,
    Statusbar,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    window: {
      type: Object,
      required: true,
    },
    content: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  mounted() {
    if (this.content) {
      this.editorContent = this.content;
    }

    if (this.file) {
      let file = this.user.files.find((file) => file.name === this.file);

      if (file) {
        this.editorContent = file.content;
      }

      this.$emit("set-title", {
        windowId: this.window.id,
        title: this.file,
      });
    }
  },
  data: () => ({
    editorContent: "",
    wordWrap: true,
  }),
  computed: {
    toolbar() {
      return [
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
          label: "Format",
          actions: [
            {
              label: "Word Wrap",
              toggled: this.wordWrap,
              action: () => {
                this.wordWrap = !this.wordWrap;
              },
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
      ];
    },
  },
};
</script>