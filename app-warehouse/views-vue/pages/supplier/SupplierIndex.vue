<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">SUPPLIER</div>
      </template>
      <template v-slot:right>
        <a
          href="/supplier/create"
          class="btn light-blue btn-small waves-effect waves-light"
        >New</a>
      </template>
    </vue-page-title>

    <vue-card-content :fit="true" v-slot:content>
      <supplier-table :suppliers="suppliers"></supplier-table>
    </vue-card-content>

    <ul class="pagination right">
      <li class="disabled">
        <a href="#!">
          <i class="material-icons">chevron_left</i>
        </a>
      </li>
      <li v-for="item of getPage" :key="item" :class="{active: page == (item+1)}">
        <a :href="'?page=' + (item+1)">{{item+1}}</a>
      </li>
      <li class="waves-effect">
        <a href="#!">
          <i class="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

import SupplierTable from "./SupplierTable";
import previousUrl from "../../mixing/previous-url";

export default {
  data() {
    return {};
  },
  mixins: [previousUrl],
  computed: {
    getPage() {
      const paginate = Math.ceil(this.total / this.perPage);
      const pages = [];
      for (let index = 0; index < paginate; index++) {
        pages.push(index);
      }
      return pages;
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
