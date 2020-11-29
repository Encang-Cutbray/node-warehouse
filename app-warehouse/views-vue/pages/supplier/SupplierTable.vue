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
      <tr v-for="(supplier, index) in suppliers" :key="supplier.index">
        <td class="valign center">{{index+1+numberTable}}</td>
        <td>{{supplier.name}}</td>
        <td>{{supplier.phone}}r</td>
        <td>{{supplier.email}}</td>
        <td>{{supplier.address}}</td>
        <td class="valign center"> 
          <a
						:disabled="!readPermission"
            :href="generateReviewUrl(supplier.id)"
            @click="previousUrl"
            class="btn deep-orange darken-1 btn-small waves-effect waves-light"
          >
            <i class="material-icons left">rate_review</i>
						<span class="hide-on-small-only">review</span>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import permissionMixing from "../../mixing/permission-mixing";
export default {
  data() {
    return {
      numberTable: 0,
      suppliers: []
    };
  },
  mixins: [permissionMixing],
  mounted() {
    let page = __INITIAL_STATE__.page;
    let supplierData = __INITIAL_STATE__.suppliers;
    if (page > 1) {
      this.numberTable = __INITIAL_STATE__.perPage * (page - 1);
    }
    if (supplierData.length) {
      this.suppliers = this.generateSupplierData(supplierData);
    }
  },
  methods: {
    previousUrl(e) {
      this.$emit("previousUrl", window.location.href);
    },
    generateReviewUrl(id) {
      return `/supplier/${id}/review`;
    },
    generateSupplierData(supplierData) {
      return supplierData.map(({ dataValues }) => dataValues);
    }
  }
};
</script>

<style>
</style>
