<template>
  <div class="radio-button-group">
    <template :key="index" v-for="(option, index) in radioOptions[0].options">
      <div class="radio-button">
        <input
          type="radio"
          :name="option.value"
          :value="option.value"
          :id="option.value"
          :checked="selectedValue === option.value"
          @click="handleRadioOptionClick(option.value)"
        />
        <label :for="option.value">
          <span>
            <template v-if="option.icon != '' && option.icon != null">
              <db-icon :icon="option.icon"></db-icon>

              <span class="tool-tip">{{ option.description }}</span>
            </template>

            <template v-else>
              <span>{{ option.description }}</span>
            </template>
          </span>
        </label>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "radio-component",
  components: { DbIcon: DbIcon },
  props: ["radioOptions", "callback"],

  data() {
    return {
      radioOptions: this.radioOptions,
      selectedValue: "",
      callback: this.callback,
    };
  },

  methods: {
    handleRadioOptionClick(value) {
      this.selectedValue = value;
      if (this.callback) {
        this.callback(value);
      }
    },
  },
});
</script>

<style scoped>
.radio-button-group {
  display: flex;
}

.radio-button-group > div {
  display: flex;
}

.radio-button-group h3 {
  margin-top: 0;
}

.radio-button-group label {
  display: inline-block;
}

.radio-button-group input[type="radio"] {
  display: none;
}

.radio-button-group .radio-button label {
  display: inline-block;
  padding: 8px 16px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #ccc;
  position: relative;
}

.radio-button-group .radio-button:not(:first-of-type) label {
  border-left: none;
}

.radio-button-group .radio-button:first-of-type label {
  border-radius: 4px 0 0 4px;
}

.radio-button-group .radio-button:last-of-type label {
  border-radius: 0 4px 4px 0;
}

.radio-button-group input[type="radio"]:checked + label {
  background-color: rgba(0, 0, 0, 0.08);
}

.radio-button-group input[type="radio"]:hover + label {
  background-color: rgba(0, 0, 0, 0.04);
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

.radio-button-group .radio-button label:hover .tool-tip {
  visibility: visible;
}
</style>