import { onInit, Show, useContext, useStore, useStyle } from "@builder.io/mitosis";
import RadioContext from "./radio.context.lite";
import { RadioOptionProps } from "./radio.props";

export default function RadioOption(props: RadioOptionProps) {

  const radioGroup = useContext(RadioContext);

  const state = useStore({
    value: props.value,
    label: props.label,
    disabled: props.disabled,
    radioPadding: "",
    noToolTip: props.noToolTip,
    radioGroupProps: {size: "", selectedValue: "", callback: (value: string) => {}},
    getSizes() {
      if (state.radioGroupProps.size === "small") {
        state.radioPadding = "4px 8px";
      } else if (state.radioGroupProps.size === "large") {
        state.radioPadding = "12px 24px";
      } else {
        state.radioPadding = "8px 16px";
      }
    },
    handleRadioOptionClick(value: string) {
      state.radioGroupProps.selectedValue = value;
      if (state.radioGroupProps.callback) {
        state.radioGroupProps.callback(state.radioGroupProps.selectedValue);
      }
    },
    init() {
      state.radioGroupProps = radioGroup
      state.getSizes();
    }
  });

  onInit(() => {
    state.init()
  })

  useStyle(`
  .radio-button label {
    display: inline-block;
  }
  
  .radio-button input[type="radio"] {
    display: none;
  }
  
  .radio-button label {
    height: 100%;
    display: inline-block;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid #ccc;
    position: relative
  }

  .radio-button:not(:first-of-type) label {
    border-left: none;
  }
    
  .radio-button:first-of-type label{
    border-radius: 4px 0 0 4px;
  }
  
  .radio-button:last-of-type label {
    border-radius: 0 4px 4px 0;
  }
  
  .radio-button input[type="radio"]:checked + label {
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .radio-button input[type="radio"]:hover + label {
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  .radio-button input[type="radio"]:disabled + label {
    color: rgba(0, 0, 0, 0.26);
    pointer-events: none;
    cursor: default;
  }
  
  .tool-tip {
    background-color: rgba(97, 97, 97, 0.92);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    visibility: hidden;
    position: absolute;
    z-index: 1;
    font-size: 12px;
    padding: 4px 8px;
    left: 50%;
    transform: translateX(-50%);
    top: -30px;
    font-weight: 500;
  }
  
  .radio-button label:hover .tool-tip {
    visibility: visible;
  }
  `)

  return (

    <div className="radio-button">
      <input
        type="radio"
        name={props.value}
        value={props.value}
        id={props.value}
        checked={state.radioGroupProps.selectedValue === props.value}
        onChange={() => state.handleRadioOptionClick(props.value!)}
        disabled={props.disabled}
      />
      <label htmlFor={props.value} style={{
        padding: state.radioPadding,
      }}>
        <span>
          {props.children}
          <Show when={!state.noToolTip}>
            <Show when={props.label != null}
                  else={<span className={"tool-tip"}>{props.value}</span>}>
              <span className={"tool-tip"}>{props.label}</span>
            </Show>
          </Show>
        </span>
      </label>
    </div>
  );
}
