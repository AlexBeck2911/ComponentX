import { onMount, onUpdate, useContext, useRef, useStore } from "@builder.io/mitosis";
import RadioContext from "./radio.context.lite";

export default function RadioOption(props: any) {
  const radioGroup = useContext(RadioContext);

  const state = useStore({
    value: props.value,
    radioGroupProps: radioGroup,
    handleRadioOptionClick(value: string) {
      state.radioGroupProps.selectedValue = value;

      if (state.radioGroupProps.callback) {
        state.radioGroupProps.callback(state.radioGroupProps.selectedValue);
      }
    },
  });

  return (
    <div className="radio-button">
      <input
        type="radio"
        name={props.value}
        value={props.value}
        id={props.value}
        checked={state.radioGroupProps.selectedValue === props.value}
        onClick={() => state.handleRadioOptionClick(props.value)}
      />
      <label htmlFor={props.value}>
        <span>
          <span>{props.children}</span>
        </span>
      </label>
    </div>
  );
}
