<template>
  <v-data-table
    :items="person"
    :headers="headers"
    class="elevation-1"
    @click:row="onActionClicked"
  ></v-data-table>
</template>

<script>
export default {
  props: {
    person: Array,
  },
  methods: {
    onActionClicked(item) {
      this.$emit("row-clicked", item);
    },
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Website", value: "website" },
        { text: "Company", value: "company" },
        { text: "Address", value: "address" },
      ],
    };
  },
};
</script>