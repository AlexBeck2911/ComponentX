/**
 * The properties for the RadioGroup component.
 * @typedef {Object} RadioGroupProps
 * @property {string} [size] - The size of the RadioGroup.
 * @property {string} name - The name of the RadioGroup.
 * @property {boolean} [multiple] - Indicates whether multiple options can be selected.
 * @property {Array} selectedValues - The selected values of the RadioGroup.
 * @property {function} callback - The callback function called when an option is selected.
 * @property {*} [children] - The child elements of the RadioGroup.
 */
export interface RadioGroupProps {
  size?: string,
  name: string,
  multiple?: boolean,
  selectedValues: [],
  callback: any,
  children?: any,
}

/**
 * The properties for the RadioOption component.
 * @typedef {Object} RadioOptionProps
 * @property {string} value - The value of the RadioOption.
 * @property {string} [label] - The label of the RadioOption.
 * @property {boolean} [selected] - Indicates whether the option is selected.
 * @property {boolean} [noToolTip] - Indicates whether the tooltip is disabled.
 * @property {*} [children] - The child elements of the RadioOption.
 * @property {boolean} [disabled] - Indicates whether the option is disabled.
 * @property {string} name - The name of the RadioOption.
 */
export interface RadioOptionProps  {
  value: string;
  label?: string;
  selected?: boolean
  noToolTip?: boolean;
  children?: any;
  disabled?: boolean;
  name: string;
}

