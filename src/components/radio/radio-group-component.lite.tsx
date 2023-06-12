import { onInit, useStyle, setContext, createContext } from "@builder.io/mitosis";
import radioStore from "./radio.context.lite";


export default function RadioGroup(props: any) {

  setContext(radioStore, {
    size: props.size,
    name: props.name,
    multiple: props.multiple || false,
    selectedValues: new Set<any>(),
    callback: props.callback,
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