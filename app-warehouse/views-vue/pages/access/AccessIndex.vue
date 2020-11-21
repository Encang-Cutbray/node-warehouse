<template>
  <vue-wrapper :config="config">
		<vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">Access</div>
      </template>
      <template v-slot:right>
        <a href="/access/create" class="btn light-blue btn-small waves-effect waves-light">
          <i class="material-icons left">add</i>new
        </a>
      </template>
    </vue-page-title>
		<vue-card-content :fit="true" v-slot:content>
    </vue-card-content>
	</vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";
export default {
	components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent,
  }
};
</script>

<style>
</style>
