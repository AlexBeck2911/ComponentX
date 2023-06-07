import { setContext, useStore } from "@builder.io/mitosis";
import Context from "./radio.context.lite";

export default function RadioGroup(props: any) {
  const state = useStore({
    size: props.size || "medium",
    callback: props.callback,
  });

  setContext(Context, {
    size: state.size,
    callback: props.callback,
  });

  return <div className="radio-button-group">{props.children}</div>;
}
