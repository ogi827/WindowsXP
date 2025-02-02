<template>
  <div
    class="flex justify-center"
    :class="isVertical ? 'w-24 text-white text-shadow-lg' : 'text-black'"
    :title="meta.title ? meta.title : file.app.title"
  >
    <div
      @click="$emit('select')"
      @dblclick="$emit('open')"
      class="inline-block border-2 border-transparent bg-opacity-50 border-opacity-50 p-1 cursor-pointer"
      :class="
        (selected ? 'border-blue-400 bg-blue-400 ' : ' ') +
        (isVertical ? 'text-center' : 'flex items-center')
      "
    >
      <div class="w-12 h-12 mx-auto" v-html="file.app.icon"></div>
      <div :class="isVertical ? '' : 'pl-2 text-sm'">
        <div
          class="cursor-pointer leading-tight"
          :class="isVertical ? 'pt-2 inline-block' : ''"
        >
          {{ meta.title ? meta.title : file.app.title }}
        </div>
        <div
          v-if="!isVertical"
          class="text-gray-500 text-xs pt-0.5 whitespace-nowrap"
        >
          {{ file.app.typeDescription }}
        </div>
        <div v-if="!isVertical" class="text-gray-500 text-xs whitespace-nowrap">
          1 KB
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
    layout: {
      type: String,
      default: "vertical",
    },
  },
  computed: {
    isVertical() {
      return this.layout === "vertical";
    },
  },
};
</script>
