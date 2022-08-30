<script setup>
defineProps({
  speedLevel: String,
});
const heatMap = {
  Hot: "🧹💨💨💨",
  Medium: "🧹💨💨",
  Mild: "🧹💨",
};
</script>
<template>
  <span>
    {{ speedLevel ? heatMap[speedLevel] : "" }}
  </span>
</template>
