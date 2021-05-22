<template>
  <div>
    <GmapMap :center="center" :zoom="0" style="width: 100%; height: 400px">
      <GmapMarker
        :key="index"
        v-for="(m, index) in Object.values(mapData)"
        :position="m"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: {
    mapData: Object,
  },
  data() {
    return {
      center: {
        lat: 0,
        lng: 0,
      },
    };
  },
  name: "UserMap",
};
</script>