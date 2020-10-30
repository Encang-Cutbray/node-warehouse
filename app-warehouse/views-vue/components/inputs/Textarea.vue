<template>
  <div class="row margin--bottom-1">
    <label for class="col s12 m3 form--label">{{label}}</label>
    <div class="col s12 m9">
      <textarea
        class="form--control browser-default"
				:readonly="readOnly"
				:disabled="disabled"
        :style="rowTextArea"
        :name="inputName"
        :value="defaultValue"
        @input="$emit('input', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rowTextArea() {
      return {
        height: `${this.row}px`
      };
    }
  },
  props: {
		readOnly: {
      type: Boolean,
      default: function() {
        return false;
      }
		},
		disabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    row: {
      type: Number,
      default: function() {
        return 80;
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
