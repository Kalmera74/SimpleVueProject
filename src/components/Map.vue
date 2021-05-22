<template>
  <div>
    <!-- {{ mapData }} -->
    <!-- <GmapMap
      :center="mapData[1].position"
      :zoom="12"
      style="width: 100%; height: 400px"
    /> -->
    <!-- <GmapMarker
      :key="index"
      v-for="(m, index) in mapData"
      :position="m.position"
    /> -->
  </div>
</template>

<script>
export default {
  props: {
    mapData: Object,
  },
  name: "UserMap",
};
</script>