<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">SUPPLIER</div>
      </template>
      <template v-slot:right>
        <a href="/supplier/create" class="btn light-blue btn-small waves-effect waves-light">New</a>
      </template>
    </vue-page-title>

    <vue-card-content :fit="true" v-slot:content>
      <supplier-table :suppliers="getSupplier"></supplier-table>
    </vue-card-content>
  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

import SupplierTable from "./SupplierTable";

export default {
  data() {
    return {
      kopi: "Hitemddd"
    };
  },
  computed: {
    getSupplier() {
			console.log(this.suppliers);
      return this.suppliers;
    }
  },
  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent,
    SupplierTable
  }
};
</script>

<style>
.card--custome {
  padding: 10px !important;
}

.content {
  height: 8px;
}
</style>
