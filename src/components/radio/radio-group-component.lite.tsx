import { onInit, useStyle } from "@builder.io/mitosis";
import radioStore from "./radio-state";


export default function RadioGroup(props: any) {

  onInit(() => {
    radioStore.size = props.size;
    radioStore.name = props.name;
    radioStore.callback = props.callback;
  })

  useStyle(`
  .radio-button-group {
    display: flex;
  }
  `)

  return <fieldset className="radio-button-group">
    {props.children}
  </fieldset>;
}