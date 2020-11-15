<template>
  <form
    action="/supplier"
    method="get"
    autocomplete="off"
    class="padding--vertical-1 padding--horizontal-1"
  >
    <div class="row">
      <div class="col m4 s6">
        <vue-input
          label="Supplier"
          input-name="name"
          :default-value="search.name"
          :has-error="false"
          v-model="search.name"
        />
      </div>
      <div class="col m4 s6">
        <vue-input
          label="Email"
          input-name="email"
          :default-value="search.email"
          :has-error="false"
          v-model="search.email"
        />
      </div>
      <div class="col m4 s6">
        <vue-input
          label="Phone"
          input-name="phone"
          :default-value="search.phone"
          :has-error="false"
          v-model="search.phone"
        />
      </div>
    </div>

    <div class="right-align">
      <button class="light-blue btn-small waves-effect waves-light">
        <i class="material-icons right">zoom_in</i>Search
      </button>
    </div>
  </form>
</template>

<script>
import VueInput from "../../components/inputs/Input";

export default {
  data() {
    return {
      search: {
        name: null,
        email: null,
        phone: null
      }
    };
  },
  components: {
    VueInput
  }
};
</script>

<style>
</style>
