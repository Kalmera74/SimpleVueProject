<template>
  <div class="item">
    <h1 id="header">User Locations</h1>
    //* Initialaze the map
    <GmapMap :center="center" :zoom="0" style="width: 100%; height: 400px">
      //! GmapMarker can only work when surrounded by GmpMap tag //* For every
      element in mapData generate a GmapMarker
      <GmapMarker :key="index" v-for="(m, index) in mapData" :position="m" />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: {
    mapData: Array,
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

<style scoped>
#header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #464646;
}
</style>