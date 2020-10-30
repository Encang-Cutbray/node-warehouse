<template>
  <Wrapper :config="config">

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

    <div class="padding--vertical-1 padding--horizontal-1">
      <div class="card">
        <table class="table table--bordered table--sm highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
            </tr>
          </thead>
					<tbody>
              <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
		
  </Wrapper>
</template>

<script>
import Wrapper from "../../components/Wrapper";
export default {
  data() {
    return {
      kopi: "Hitemddd"
    };
  },
  components: {
    Wrapper
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
