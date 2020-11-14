<template>
  <table class="table table--bordered table--sm highlight">
    <thead>
      <tr>
        <th class="valign center">No</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Address</th>
        <th class="valign center">Review</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(supplier, index) in suppliers" :key="supplier.dataValues.id">
        <td class="valign center">{{index+1+numberTable}}</td>
        <td>{{supplier.dataValues.name}}</td>
        <td>{{supplier.dataValues.phone}}r</td>
        <td>{{supplier.dataValues.email}}</td>
        <td>{{supplier.dataValues.address}}</td>
        <td class="valign center">
          <a
            :href="generateHerf(supplier.dataValues.id)"
            class="btn deep-orange darken-1 btn-small waves-effect waves-light"
          >Review</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import previousUrl from "../../mixing/previous-url";
export default {
  data() {
    return {
      numberTable: 0
    };
  },
  mixins: [previousUrl],
  mounted() {
    let page = __INITIAL_STATE__.page;
    if (page > 1) {
      this.numberTable = __INITIAL_STATE__.perPage;
    }
  },
  props: {
    suppliers: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    generateHerf(id) {
      return `/supplier/${id}/review`;
    }
  }
};
</script>

<style>
</style>
