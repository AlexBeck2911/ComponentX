import { setContext, useStore, useStyle } from "@builder.io/mitosis";
import Context from "./radio.context.lite";


export default function RadioGroup(props: any) {
  const state = useStore({
    size: props.size || "medium",
    callback: props.callback,
  });

  useStyle(`
  .radio-button-group {
    display: flex;
  }
  `)

  setContext(Context, {
    size: state.size,
    callback: props.callback,
  });

  return <div className="radio-button-group">{props.children}</div>;
}
