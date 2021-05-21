<template>
  <vc-piechart :data="chartData" />
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