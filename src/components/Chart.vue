<template>
  <e-charts class="charts" autoresize :options="pie"></e-charts>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";

export default {
  props: {
    chartData: Array,
  },
  data() {
    return {
      pie: {},
    };
  },
  watch: {
    chartData(n, o) {
      console.log(o, n);
      this.action();
    },
  },
  methods: {
    action() {
      this.pie = {
        title: {
          text: "Traffic Sources",
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.action();
  },
  components: {
    ECharts,
  },
};
</script>

<style >
.charts {
  width: 1000px;
  height: 1000px;
}
</style>