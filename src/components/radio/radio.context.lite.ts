/**
 * A context definition for the RadioGroup component.
 * @typedef {Object} RadioContext
 * @property {string} size - The size of the RadioGroup.
 * @property {string} name - The name of the RadioGroup.
 * @property {boolean} multiple - Indicates whether multiple options can be selected.
 * @property {Set} selectedValues - The selected values of the RadioGroup (checkbox).
 * @property {function} callback - The callback function called when an option is selected.
 */

import { createContext } from "@builder.io/mitosis";

/**
 * A context object for the RadioGroup component.
 * @type {RadioContext}
 */
export default createContext({
  size: "",
  name: "",
  multiple: false,
  selectedValues: new Set(),
  callback: (value: any) => {},
});
