import { createContext } from "react";
var stdin_default = createContext({
  size: "",
  name: "",
  multiple: false,
  selectedValues: new Set(),
  callback(value) {
  }
});
export {
  stdin_default as default
};
