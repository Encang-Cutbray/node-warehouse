<template>
  <div>
    <Header :app-name="config.APP_NAME" :is-auth="config.isAuth"></Header>
    <!-- <Header></Header> -->
    <Sidenav :left-nav="leftNav" :user-login="config.userLogin"></Sidenav>
    <!-- <Sidenav></Sidenav> -->
    <main>
      <slot></slot>
    </main>

    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import Sidenav from "./Sidenav";

export default {
  components: {
    Header,
    Sidenav,
    Footer
  },
  props: {
    config: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    leftNav() {
      const leftNav = this.config ? JSON.parse(this.config.leftNavMenu) : [];
      return leftNav;
    }
  },
  methods: {
    responsiveMenu() {
      $(".sidenav").sidenav();
      $("#sidenav-1")
        .sidenav({ edge: "left" })
        .css("width", "250px");
      $(".dropdown-trigger").dropdown({
        coverTrigger: false,
        closeOnClick: true,
        hover: true
      });
    }
  },
  mounted() {
    this.responsiveMenu();
  }
};
</script>

<style>
header,
main,
footer {
  padding-left: 250px;
}

@media only screen and (max-width: 992px) {
  header,
  main,
  footer {
    padding-left: 0;
  }
}
</style>
