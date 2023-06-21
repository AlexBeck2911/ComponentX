const key = Symbol();

export default {
  Radio: {
    size: "",
    name: "",
    multiple: false,
    selectedValues: new Set(),
    callback(value: any) {},
  },
  key,
};
