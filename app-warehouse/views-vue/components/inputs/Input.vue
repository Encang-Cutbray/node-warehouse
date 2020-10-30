<template>
  <div class="row margin--bottom-1">
    <label for class="col s12 m3 form--label">{{label}}</label>
    <div class="col s12 m9">
      <input
        class="browser-default form--control"
        :type="inputType"
        :name="inputName"
        :value="defaultValue"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      default: function() {
        return "text";
      }
    },
    inputName: {
      type: String,
      default: function() {
        return "";
      }
    },
    defaultValue: {
      type: String,
      default: function() {
        return "";
      }
    },
    label: {
      type: String,
      default: function() {
        return "Label";
      }
    }
  }
};
</script>

<style>
</style>
