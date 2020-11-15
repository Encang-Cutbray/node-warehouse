<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">SUPPLIER</div>
      </template>
      <template v-slot:right>
        <a href="/supplier/create" class="btn light-blue btn-small waves-effect waves-light">
          <i class="material-icons left">add</i>new
        </a>
      </template>
    </vue-page-title>

    <vue-card-content :fit="true" v-slot:content>
      <supplier-search />
    </vue-card-content>

    <vue-card-content :fit="true" v-slot:content>
      <supplier-table></supplier-table>
    </vue-card-content>

    <supplier-pagination />
  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

import SupplierTable from "./SupplierTable";
import SupplierSearch from "./SupplierSearch";
import SupplierPagination from "./SupplierPagination";

export default {
  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent,
    SupplierTable,
    SupplierSearch,
    SupplierPagination
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
