<template>
  <table class="table table--bordered table--sm highlight">
    <thead>
      <tr>
        <th class="valign center">No</th>
        <th>Name</th>
        <th>Email</th>
        <th class="valign center">Access</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.index">
        <td class="valign center">{{index+1}}</td>
        <td>{{user.full_name}}</td>
        <td>{{user.email}}r</td>
        <td class="valign center">
          <a
            :href="generateReviewUrl(user.id)"
            @click="previousUrl"
            class="btn deep-orange darken-1 btn-small waves-effect waves-light"
          >
            <i class="material-icons left">rate_review</i>Access
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    generateReviewUrl(id) {
      return `/access/${id}/review`;
    },
    previousUrl(e) {
      this.$emit("previousUrl", window.location.href);
    }
  },
  mounted() {
    this.users = __INITIAL_STATE__.users;
  }
};
</script>

<style>
</style>
