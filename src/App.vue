<template>
  <div id="app">
    <Vuetable v-bind:person="person"></Vuetable>
  </div>
</template>

<script>
import axios from "axios";
import Vuetable from "./components/Chart";
//import moment from "moment";

export default {
  name: "App",
  components: {
    Vuetable,
  },
  data() {
    return {
      person: [],
      geo: [],
    };
  },
  postData() {
    return {
      posts: [],
    };
  },
  async created() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    data.forEach((d) => {
      let { id, name, username, email, phone, website, company, address } = d;
      company = company.name;

      const { lat, lng } = address.geo;

      this.geo.push({ id, lat, lng });

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
    });

    const { postData } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    postData.forEach((d) => {
      const { userid, id, title, body } = d;
      this.posts.push({ userid, id, title, body });
      console.log(this.person.keys);
    });
  },
};
</script>

<style>
</style>
