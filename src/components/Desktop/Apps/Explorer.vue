<template>
  <div class="w-full h-full flex flex-col">
    <toolbar :menus="toolbar" />
    <div class="flex flex-1 overflow-hidden">
      <div class="bg-indigo-400 p-4 flex flex-col gap-y-4 flex-shrink-0">
        <accordion title="File and Folder Tasks"> test </accordion>
        <accordion title="Other Places"> test </accordion>
        <accordion title="Details"> test </accordion>
      </div>
      <div
        class="flex-1 flex items-start p-2 gap-x-4 overflow-auto"
        @click.self="selectedIconIndex = null"
      >
        <file-icon
          v-for="(file, i) in files"
          :key="i"
          :file="file"
          :meta="{ title: file.name }"
          :selected="selectedIconIndexes.includes(i) || selectedIconIndex === i"
          layout="horizontal"
          @select="selectedIconIndex = i"
          @open="
            $emit('open-app', {
              appId: file.app.id,
              meta: { title: file.name, data: { file: file.name } },
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "../../UI/Accordion";
import FileIcon from "../../UI/FileIcon";
import Toolbar from "../../Window/Toolbar";

import apps from "../../../data/apps";

export default {
  components: {
    Accordion,
    FileIcon,
    Toolbar,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selectedIconIndexes: [],
    selectedIconIndex: null,
    directory: "",
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
  mounted() {},
  computed: {
    files() {
      return this.user.files.map((file) => ({
        ...file,
        app: apps.find((app) =>
          app.extensions
            ? app.extensions.includes(file.name.split(".")[1])
            : false
        ),
      }));
    },
  },
};
</script>