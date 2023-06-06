<template>
  <div class="radio-button-group">
    <template
      :key="optionGroup.groupName"
      v-for="(optionGroup, index) in radioOptions"
    >
      <div>
        <h3>{{ optionGroup.groupName }}</h3>
        <template :key="index" v-for="(option, index) in optionGroup.options">
          <div class="radio-button">
            <input
              type="radio"
              :name="optionGroup.groupName"
              :value="option.value"
              :id="option.value"
              :checked="selectedValue === option.value"
              @click="
                handleRadioOptionClick(optionGroup.groupName, option.value)
              "
            />
            <label :for="option.value">
              <span>
                <db-icon :icon="radioIcons[option.value]"></db-icon>
                {{ option.label }}
              </span>
            </label>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "radio-component",
  components: { DbIcon: DbIcon },
  props: ["radioOptions", "radioIcons", "radioDescriptions", "callback"],

  data() {
    return {
      radioOptions: this.radioOptions,
      radioIcons: this.radioIcons,
      radioDescriptions: this.radioDescriptions,
      selectedValue: "",
      callback: this.callback,
    };
  },

  methods: {
    handleRadioOptionClick(radioOption, value) {
      console.log("Test");
      this.selectedValue = value;
      if (this.callback) {
        this.callback(radioOption, value);
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
</style>