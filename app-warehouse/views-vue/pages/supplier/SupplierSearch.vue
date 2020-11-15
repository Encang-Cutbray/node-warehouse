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
          v-model.trim="search.name"
        />
      </div>
      <div class="col m4 s6">
        <vue-input
          label="Email"
          input-name="email"
          :default-value="search.email"
          :has-error="false"
          v-model.trim="search.email"
        />
      </div>
      <div class="col m4 s6">
        <vue-input
          label="Phone"
          input-name="phone"
          :default-value="search.phone"
          v-model.trim="search.phone"
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
  mounted() {
    let searchQuery = __INITIAL_STATE__.searchQuery;
    if (searchQuery) {
      this.search.name = searchQuery.name;
      this.search.email = searchQuery.email;
      this.search.phone = searchQuery.phone;
    }
  },
  components: {
    VueInput
  }
};
</script>

<style>
</style>
