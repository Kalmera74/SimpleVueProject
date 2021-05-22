<template>
  <div id="app">
    <div><h1 class="banner">MyFirst Vue Project</h1></div>
    <div class="container">
      <UserMap v-bind:mapData="mapData"></UserMap>
      <chart :chartData="pieData"></chart>
    </div>
    <div class="ctcontainer">
      <!-- Catch the even delegated from the child as row-clicked and call AddToTheList -->
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
      // Get the post data of the user
      const postData = this.post[item.id];
      // Get the geo data of the user
      const geoData = this.geo[item.id];

      // Check if the same data is allready in the pieData, if so return true, else -1
      const isInPosts = this.pieData.findIndex((elem) => {
        if (elem.name == postData.user) {
          return true;
        }
      });

      // Check if the same data is allready in the mapData, if so return true, else -1
      const isInGeo = this.mapData.findIndex((elem) => {
        if (elem.lat == geoData.lat && elem.lng == geoData.lng) {
          return true;
        }
      });

      // If the same data is not in the pieData add it, else remove it
      if (isInPosts == -1) {
        this.pieData.push({
          value: postData.counter,
          name: postData.user,
        });
      } else {
        this.pieData.splice(isInPosts, 1);
      }

      // If the same data is not in the mapData add it, else remove it
      if (isInGeo == -1) {
        this.mapData.push(geoData);
      } else {
        this.mapData.splice(isInGeo, 1);
      }
    },
  },
  data() {
    return {
      // Holds the data from API
      person: [],
      geo: {},
      post: {},
      // Used for drawing the chart and the map markers
      mapData: [],
      pieData: [],
    };
  },

  async created() {
    // Call axios.all to request multiple resources
    //! Withouth it it could cause problems with the second request
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/posts"),
      ])
      // Resolve promise
      .then(
        // Seperate the request result into variables for easier manipılation
        axios.spread((userData, postData) => {
          // These will be used for temporary variables to ensure reactivity
          let persons = [],
            posts = {},
            geos = {};

          // For every userData result destructure the variables
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
            // Add the geo variables with the userid
            geos[id] = { lat: Number(lat), lng: Number(lng) };

            address =
              address.street +
              "," +
              address.suit +
              "," +
              address.city +
              "," +
              address.zipcode;

            // Add the final data to the persons array
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

            // Generate an object to keep the count of user post counts
            posts[id] = { user: name, counter: 0 };
          });

          postData.data.forEach((d) => {
            // Get the user id
            const { userId } = d;
            // Get the post object of the userid with userId and increment it by 1
            posts[userId].counter += 1;
          });

          //! To ensure reactivity we need to change the variables with Vue.set, so that the props can alerted to the changes and re-render the components
          Vue.set(this, "geo", geos);
          Vue.set(this, "person", persons);
          Vue.set(this, "post", posts);
        })
      )
      // Catch any errors that may occure with the. The most probable cause is the requests
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
