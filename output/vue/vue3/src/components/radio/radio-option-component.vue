<template>
  <div class="radio-button">
    <template v-if="radio.multiple">
      <input
        type="checkbox"
        :name="radio.name"
        :value="value"
        :id="value"
        @input="handleCheckBoxOptionClick(value)"
        :disabled="disabled"
      />
    </template>

    <template v-else>
      <input
        type="radio"
        :name="radio.name"
        :value="value"
        :id="value"
        @input="handleRadioOptionClick(value)"
        :disabled="disabled"
      />
    </template>

    <label
      :for="value"
      :style="{
        padding: radioPadding,
      }"
    >
      <span>
        <slot />

        <template v-if="!noToolTip">
          <template v-if="label != null">
            <span class="tool-tip">{{ label }}</span>
          </template>

          <template v-else>
            <span class="tool-tip">{{ value }}</span>
          </template>
        </template>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { RadioOptionProps } from "./radio.model";
import radioContext from "./radio.context.js";

export default defineComponent({
  name: "radio-option",

  props: ["value", "disabled", "noToolTip", "label"],

  data() {
    return {
      radioPadding: "",
      radio: {
        size: "",
        name: "",
        multiple: false,
        selectedValues: new Set(),
        callback: (value: any) => {},
      },
    };
  },

  inject: {
    radioContextState: radioContext.key,
  },
  created() {
    this.radio = this.radioContextState;
    this.init();
  },

  methods: {
    getSizes() {
      if (this.radio.size === "small") {
        this.radioPadding = "4px 8px";
      } else if (this.radio.size === "large") {
        this.radioPadding = "12px 24px";
      } else {
        this.radioPadding = "8px 16px";
      }
    },
    handleRadioOptionClick(value: string) {
      if (this.radio.callback) {
        this.radio.callback(value);
      }
    },
    handleCheckBoxOptionClick(value: string) {
      if (this.radio.selectedValues.has(value)) {
        this.radio.selectedValues.delete(value);
      } else {
        this.radio.selectedValues.add(value);
      }
      if (this.radio.callback) {
        this.radio.callback(this.radio.selectedValues);
      }
    },
    init() {
      this.getSizes();
    },
  },
});
</script>

<style scoped>
.radio-button label {
  display: inline-block;
}

.radio-button input {
  display: none;
}

.radio-button label {
  height: 100%;
  display: inline-block;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #ccc;
  position: relative;
}

.radio-button:not(:first-of-type) label {
  border-left: none;
}

.radio-button:first-of-type label {
  border-radius: 4px 0 0 4px;
}

.radio-button:last-of-type label {
  border-radius: 0 4px 4px 0;
}

.radio-button input:checked + label {
  background-color: rgba(0, 0, 0, 0.08);
}

.radio-button input:hover + label {
  background-color: rgba(0, 0, 0, 0.04);
}

.radio-button input:disabled + label {
  color: rgba(0, 0, 0, 0.26);
  pointer-events: none;
  cursor: default;
}

.tool-tip {
  background-color: rgba(97, 97, 97, 0.92);
  border-radius: 4px;
  color: rgb(255, 255, 255);
  visibility: hidden;
  position: absolute;
  z-index: 1;
  font-size: 12px;
  padding: 4px 8px;
  left: 50%;
  transform: translateX(-50%);
  top: -30px;
  font-weight: 500;
}

.radio-button label:hover .tool-tip {
  visibility: visible;
}
</style>