<template>
  <header>
    <nav>
      <div class="nav-wrapper">
        <div class="row">
          <div class="col s12">
            <a href="#" data-target="sidenav-1" class="left sidenav-trigger hide-on-medium-and-up">
              <i class="material-icons">menu</i>
            </a>
            <a href="/" class="brand-logo">{{appName}}</a>
            <ul id="nav-mobile" class="right">
              <li v-if="!isAuth">
                <a href="/login">Login</a>
              </li>
              <li v-if="!isAuth">
                <a href="/register">Register</a>
              </li>
							<li v-if="isAuth" class="active">
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    appName: {
      type: String,
      default: function() {
        return "Node Warehouse";
      }
    },
    isAuth: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
