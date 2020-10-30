<template>
  <div style="position: relative">
    <Header :app-name="appName" :is-auth="isAuth"></Header>

    <Sidenav :left-nav="leftNav" :user-login="userLogin" :url-active="urlActive"></Sidenav>

    <main class="animate__animated animate__fadeIn">
      <slot></slot>
    </main>

    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";

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
        return null;
      }
    }
  },
  computed: {
    urlActive() {
      return this.config ? this.config.urlActive : "/";
    },
    userLogin() {
      return this.config ? this.config.userLogin : {};
    },
    isAuth() {
      return this.config ? this.config.isAuth : false;
    },
    appName() {
      return this.config ? this.config.APP_NAME : "Node Warehouse";
    },
    leftNav() {
      return this.config ? JSON.parse(this.config.leftNavMenu) : [];
    }
  },
  methods: {
    isConfigEmpty() {
      return Object.keys(this.config).length === 0;
    }
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

main {
  min-height: 89.3vh;
}
</style>
