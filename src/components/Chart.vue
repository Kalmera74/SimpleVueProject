<template>
  <div>
    <vc-piechart :data="chartData" />
  </div>
</template>

<script>
import VcPiechart from "vc-piechart";
import "vc-piechart/dist/lib/vc-piechart.min.css";

export default {
  props: {
    chartData: Array,
  },
  components: {
    VcPiechart,
  },
};
</script>