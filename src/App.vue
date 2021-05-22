<template>
  <div id="app">
    <div><h1 class="banner">MyFirst Vue Project</h1></div>
    <div class="container">
      <!-- <Vuetable v-bind:person="person" @vuetable:row-clicked="onActionClicked">
    </Vuetable> -->
      <UserMap v-bind:mapData="mapData"></UserMap>
      <chart :chartData="pieData"></chart>
    </div>
    <div class="ctcontainer">
      <Table v-bind:person="person" @row-clicked="AddToTheList"></Table>
    </div>
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
      const geoData = this.geo[item.id];

      const isInPosts = this.pieData.findIndex((elem) => {
        if (elem.name == postData.user) {
          return true;
        }
      });

      const isInGeo = this.mapData.findIndex((elem) => {
        if (elem.lat == geoData.lat && elem.lng == geoData.lng) {
          return true;
        }
      });

      if (isInPosts == -1) {
        this.pieData.push({
          value: postData.counter,
          name: postData.user,
        });
      } else {
        this.pieData.splice(isInPosts, 1);
      }

      if (isInGeo == -1) {
        this.mapData.push(geoData);
      } else {
        this.mapData.splice(isInGeo, 1);
      }
    },
  },
  data() {
    return {
      person: [],
      geo: {},
      mapData: [],
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
            geos[id] = { lat: Number(lat), lng: Number(lng) };
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
body {
  background-color: grey !important;
  padding: 100px !important;
}
.container {
  display: flex;
}
.item {
  flex-basis: 50%;
  margin: -40px 5px 5px 5px;
  background-color: white;
  padding: 20px 20px 0px 20px;
}
.tcontainer {
  width: 90%;
  height: 70%;
  padding: 20px;
  margin: 20px;
  background-color: white;
}
.banner {
  position: absolute;
  top: 0px;
  left: 0px;
  background: black;
  color: white;
  width: 100%;
  text-align: center;
}
</style>
