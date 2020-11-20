<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">Warehouse</div>
      </template>
      <template v-slot:right>
        <a href="/warehouse/create" class="btn light-blue btn-small waves-effect waves-light">New</a>
      </template>
    </vue-page-title>

    <vue-card-content :fit="true" v-slot:content>
      <div class="offset">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in displayedPosts" :key="p.suffix">
              <td>{{p.first}}</td>
              <td>{{p.last}}</td>
              <td>{{p.suffix}}</td>
            </tr>
          </tbody>
        </table>
				{{displayedPosts}}
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button type="button" class="page-link" v-if="page != 1" @click="page--">Previous</button>
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                :key="pageNumber"
                v-for="pageNumber in pages.slice(page-1, page+5)"
                @click="page = pageNumber"
              >{{pageNumber}}</button>
            </li>
            <li class="page-item">
              <button
                type="button"
                @click="page++"
                v-if="page < pages.length"
                class="page-link"
              >Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </vue-card-content>
  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

export default {
  data() {
    return {
      posts: [""],
      page: 1,
      perPage: 9,
      pages: []
    };
  },
  methods: {
    getPosts() {
      let data = [];
      for (let i = 0; i < 200; i++) {
        this.posts.push({ first: "John", last: "Doe", suffix: "#" + i });
      }
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    }
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    }
  },
  watch: {
    posts() {
      this.setPages();
    }
  },
  created() {
    this.getPosts();
  },
  filters: {
    trimWords(value) {
      return (
        value
          .split(" ")
          .splice(0, 20)
          .join(" ") + "..."
      );
    }
  },
  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent
  }
};
</script>

<style lang="css">
</style>
