<template>
  <vuetable
    ref="vuetable"
    :fields="[
      'id',
      'name',
      'username',
      'email',
      'phone',
      'website',
      'company',
      'address',
    ]"
    :api-mode="false"
    :data="person"
    v-bind="$props"
  ></vuetable>
</template>

<script>
import Vuetable from "vuetable-2";

export default {
  props: {
    person: Array,
  },
  components: {
    Vuetable,
  },
};
</script>