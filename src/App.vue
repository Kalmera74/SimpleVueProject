<template>
  <div id="app">
    <!-- <Vuetable v-bind:person="person" @vuetable:row-clicked="onActionClicked">
    </Vuetable> -->
    <UserMap v-bind:mapData="geo"></UserMap>
    <chart :chartData="pieData"></chart>
    <Table v-bind:person="person" @row-clicked="AddToTheList"></Table>
  </div>
</template>

<script>
import axios from "axios";
import Table from "./components/Table";
import Chart from "./components/Chart";
import UserMap from "./components/Map";
import Vue from "vue";

export default {
  name: "App",
  components: {
    Table,
    Chart,
    UserMap,
  },
  methods: {
    AddToTheList(item) {
      const postData = this.post[item.id];
      const piePart = {
        value: postData.counter,
        name: postData.user,
      };

      if (this.pieData.indexOf(piePart) == -1) this.pieData.push(piePart);
      else this.pieData.splice(this.pieData.indexOf(piePart), 1);
      console.log(this.pieData);
    },
  },
  data() {
    return {
      person: [],
      geo: {},
      post: {},
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
          let persons = [],
            posts = {},
            geos = {};

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
            geos[id] = { lat: lat, lng: lng };
            /*//!
            this.geo[id] = { position: { lat, lng } };
            
*/
            address =
              address.street +
              "," +
              address.suit +
              "," +
              address.city +
              "," +
              address.zipcode;

            persons.push({
              id,
              name,
              username,
              email,
              phone,
              website,
              company,
              address,
            });

            posts[id] = { user: name, counter: 0 };
          });

          postData.data.forEach((d) => {
            const { userId } = d;
            posts[userId].counter += 1;
          });
          Vue.set(this, "geo", geos);
          Vue.set(this, "person", persons);
          Vue.set(this, "post", posts);
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
