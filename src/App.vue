<template>
  <div id="app">
    <!-- <Vuetable v-bind:person="person" @vuetable:row-clicked="onActionClicked">
    </Vuetable> -->
    <Chart v-bind:chartData="pieData"></Chart>
    <Table v-bind:person="person" @row-clicked="AddToTheList"></Table>
  </div>
</template>

<script>
import axios from "axios";
import Table from "./components/Table";
import Chart from "./components/Chart";

export default {
  name: "App",
  components: {
    Table,
    Chart,
  },
  methods: {
    AddToTheList(item) {
      const postData = this.posts[item.id];
      const piePart = {
        color: this.getRandomColor(),
        value: postData.counter,
        label: postData.user,
      };
      console.log(piePart);

      if (this.pieData.indexOf(piePart) == -1) this.pieData.push(piePart);
      else this.pieData.splice(this.pieData.indexOf(piePart), 1);
      console.log(this.pieData);
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  data() {
    return {
      person: [],
      geo: {},
      posts: {},
      pieData: [],
    };
  },
  async created() {
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/posts"),
      ])
      .then(
        axios.spread((userData, postData) => {
          userData.data.forEach((d) => {
            let {
              id,
              name,
              username,
              email,
              phone,
              website,
              company,
              address,
            } = d;
            company = company.name;

            const { lat, lng } = address.geo;

            this.geo[id] = { lat, lng };

            address =
              address.street +
              "," +
              address.suit +
              "," +
              address.city +
              "," +
              address.zipcode;

            this.person.push({
              id,
              name,
              username,
              email,
              phone,
              website,
              company,
              address,
            });

            this.posts[id] = { user: name, counter: 0 };
          });
          postData.data.forEach((d) => {
            const { userId } = d;
            this.posts[userId].counter += 1;
          });
        })
      )
      .catch((e) => {
        console.log(e.message);
      });
  },
};
</script>

<style>
</style>
