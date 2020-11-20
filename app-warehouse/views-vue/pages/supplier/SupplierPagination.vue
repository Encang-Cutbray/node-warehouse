<template>
  <ul class="pagination right" v-if="getPage.length">
    <li :class="{disabled: pageActive == 1}">
      <a href="#!">
        <i class="material-icons">chevron_left</i>
      </a>
    </li>
    <li v-for="item of getPage" :key="item" :class="{active: pageActive == (item+1)}">
      <a :href="generateQueryString(item+1)" @click="changePagination($event, +item+1)">{{item+1}}</a>
    </li>
    <li class="waves-effect">
      <a href="#!">
        <i class="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      totalData: 0,
      perPage: 0,
      pageActive: 1
    };
  },
  mounted() {
    this.totalData = __INITIAL_STATE__.total;
    this.perPage = __INITIAL_STATE__.perPage;
    this.pageActive = __INITIAL_STATE__.page || 1;
  },
  methods: {
    generateQueryString(item) {
      const queryString = __INITIAL_STATE__.searchQuery;
      let querySearch = `?page=${item}`;
      if (queryString) {
        for (var queryName in queryString) {
          if (queryString[queryName] && queryName != "page") {
            querySearch += `&${queryName}=${queryString[queryName]}`;
          }
        }
      }
      return querySearch;
    },
    changePagination(e, item) {
		}
  },
  computed: {
    getPage() {
      const paginate = Math.ceil(this.totalData / this.perPage);
      const pages = [];
      for (let index = 0; index < paginate; index++) {
        pages.push(index);
      }
      return pages;
    }
  }
};
</script>

<style>
</style>
