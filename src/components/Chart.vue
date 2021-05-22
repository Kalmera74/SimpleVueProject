<template>
  <e-charts autoresize :options="pie"></e-charts>
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
      console.log(this.chartData + "SIK");
      this.pie = {
        title: {
          text: "Kamil Reyiz Data",
          subtext: "sub text ulen",
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "MY pie",
            type: "pie",
            radius: "50%",
            data: this.chartData,
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