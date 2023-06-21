<template>
  <fieldset class="radio-options-group">
    <slot />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import radioContext from "./radio.context.js";
import { RadioGroupProps } from "./radio.model";

export default defineComponent({
  name: "radio-group",

  props: ["size", "name", "multiple", "callback"],

  provide() {
    const _this = this;
    return {
      [radioContext.key]: {
        size: _this.size,
        name: _this.name,
        multiple: _this.multiple || false,
        selectedValues: new Set(),
        callback: _this.callback,
      },
    };
  },
});
</script>

<style scoped>
.radio-options-group {
  display: flex;
}
</style>