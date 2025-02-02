<template>
  <div
    class="font-mono leading-normal bg-black w-full h-full text-gray-700 flex flex-col items-center justify-center gap-y-0.5"
  >
    <div
      class="flex w-64 text-2xl justify-between"
      v-for="(row, i) in clockWords"
      :key="i"
    >
      <span
        v-for="word in row"
        :key="word.class"
        v-html="word.word"
        class="inline-block mx-1 transition-all duration-1000"
        :class="[illuminated.includes(word.class) ? 'text-white' : '']"
      ></span>
    </div>
  </div>
</template>

<script>
const clockWords = [
  [
    { word: "its", class: "its" },
    { word: "half", class: "half" },
    { word: "ten", class: "ten-min" },
  ],
  [
    { word: "quarter", class: "quarter" },
    { word: "twenty", class: "twenty-min" },
  ],
  [
    { word: "five", class: "five-min" },
    { word: "minutes", class: "minutes" },
    { word: "to", class: "to" },
  ],
  [
    { word: "past", class: "past" },
    { word: "one", class: "one" },
    { word: "two", class: "two" },
  ],
  [
    { word: "three", class: "three" },
    { word: "four", class: "four" },
    { word: "five", class: "five" },
  ],
  [
    { word: "six", class: "six" },
    { word: "seven", class: "seven" },
    { word: "eight", class: "eight" },
  ],
  [
    { word: "nine", class: "nine" },
    { word: "ten", class: "ten" },
    { word: "eleven", class: "eleven" },
  ],
  [
    { word: "twelve", class: "twelve" },
    { word: "o'clock", class: "o'clock" },
  ],
];

const numberWords = [
  "twelve",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

export default {
  data: () => ({
    date: new Date(),
    clockWords: clockWords,
  }),
  computed: {
    mins() {
      return this.date.getMinutes();
    },
    hours() {
      let hours = this.date.getHours(),
        hourOffset = hours > 12 ? -12 : 0,
        minOffset = this.mins >= 35 && this.mins < 60 ? 1 : 0;

      return parseInt(hours + hourOffset + minOffset, 10);
    },
    illuminated() {
      let words = ["its"];

      if (this.mins >= 0 && this.mins < 5) {
        words.push("o'clock");
      } else if (this.mins >= 5 && this.mins < 10) {
        words.push("five-min");
        words.push("minutes");
      } else if (this.mins >= 10 && this.mins < 15) {
        words.push("ten-min");
        words.push("minutes");
      } else if (this.mins >= 15 && this.mins < 20) {
        words.push("quarter");
      } else if (this.mins >= 20 && this.mins < 25) {
        words.push("twenty-min");
        words.push("minutes");
      } else if (this.mins >= 25 && this.mins < 30) {
        words.push("twenty-min");
        words.push("five-min");
        words.push("minutes");
      } else if (this.mins >= 30 && this.mins < 35) {
        words.push("half");
      } else if (this.mins >= 35 && this.mins < 40) {
        words.push("twenty-min");
        words.push("five-min");
        words.push("minutes");
      } else if (this.mins >= 40 && this.mins < 45) {
        words.push("twenty-min");
        words.push("minutes");
      } else if (this.mins >= 45 && this.mins < 50) {
        words.push("quarter");
      } else if (this.mins >= 50 && this.mins < 55) {
        words.push("ten-min");
        words.push("minutes");
      } else if (this.mins >= 55 && this.mins < 60) {
        words.push("five-min");
        words.push("minutes");
      }

      if (this.mins >= 5 && this.mins < 35) {
        words.push("past");
      } else if (this.mins >= 35 && this.mins < 60) {
        words.push("to");
      }

      words.push(numberWords[this.hours]);

      return words;
    },
  },
  mounted() {
    setInterval(() => (this.date = new Date()), 1000);
  },
};
</script>
