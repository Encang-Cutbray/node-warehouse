<template>
  <vue-wrapper :config="config">

    <div class="card">
      <div class="row valign-wrapper padding--horizontal-1">
        <div class="col s6 m6">
          <div class="left blue-text text-light-blue">SUPPLIER</div>
        </div>
        <div class="col s6 m6">
          <div class="right">
            <a href="/supplier/create" class="btn light-blue btn-small waves-effect waves-light">New</a>
          </div>
        </div>
      </div>
    </div>

		<supplier-table></supplier-table>

  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import SupplierTable from "./SupplierTable";

export default {
  data() {
    return {
      kopi: "Hitemddd",
      suppliers: [
        {
          name: "Cinta",
          name: "Cinta",
          name: "Cinta"
        }
      ]
    };
  },
  components: {
    VueWrapper,
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
