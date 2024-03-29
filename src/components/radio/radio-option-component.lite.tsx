import { useContext, onInit, Show, useStore, useStyle } from "@builder.io/mitosis";
import { RadioOptionProps } from "./radio.model";
import radioContext from "./radio.context.lite";

/**
 * Creates a RadioOption component.
 *
 * @param {RadioOptionProps} props - The properties of the RadioOption component.
 * @returns {JSX.Element} The RadioOption component.
 */
export default function RadioOption(props: RadioOptionProps) {
  /**
   * The RadioStore context that holds the state and functions for the RadioOption.
   * @type {Object}
   */
  const radioContextState = useContext(radioContext);

  const state = useStore({
    radioPadding: "",
    radio: {
      size: "",
      name: "",
      multiple: false,
      selectedValues: new Set(),
      callback: (value: any) => {
      }
    },
    getSizes() {
      if (state.radio.size === "small") {
        state.radioPadding = "4px 8px";
      } else if (state.radio.size === "large") {
        state.radioPadding = "12px 24px";
      } else {
        state.radioPadding = "8px 16px";
      }
    },
    handleRadioOptionClick(value: string) {
      if (state.radio.callback) {
        state.radio.callback(value);
      }
    },
    handleCheckBoxOptionClick(value: string) {
      if (state.radio.selectedValues.has(value)) {
        state.radio.selectedValues.delete(value);
      } else {
        state.radio.selectedValues.add(value);
      }

      if (state.radio.callback) {
        state.radio.callback(state.radio.selectedValues);
      }
    },
    init() {
      state.getSizes();
    }
  });

  onInit(() => {
    state.radio = radioContextState;
    state.init();
  });

  // Apply CSS styles for the RadioOptions
  useStyle(`
    .radio-button label {
      display: inline-block;
    }
    
    .radio-button input {
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
    
    .radio-button input:checked + label {
      background-color: rgba(0, 0, 0, 0.08);
    }
    
    .radio-button input:hover + label {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    .radio-button input:disabled + label {
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
  `);

  // Return the JSX element
  return (
    <div className="radio-button">
      {/* Show radio input if multiple is false */}
      <Show when={state.radio.multiple} else={
        <input
          type="radio"
          name={state.radio.name}
          value={props.value}
          id={props.value}
          onChange={() => state.handleRadioOptionClick(props.value!)}
          disabled={props.disabled}
        />
      }>
        {/* Show checkbox input if multiple is true */}
        <input
          type="checkbox"
          name={state.radio.name}
          value={props.value}
          id={props.value}
          onChange={() => state.handleCheckBoxOptionClick(props.value!)}
          disabled={props.disabled}
        />
      </Show>
      <label htmlFor={props.value} style={{
        padding: state.radioPadding,
      }}>
      <span>
        {props.children}
        {/* Show tooltip if noToolTip is false or not given */}
        <Show when={!props.noToolTip}>
          {/* Show custom label if provided, otherwise show value as tooltip */}
          <Show when={props.label != null} else={
            <span className={"tool-tip"}>{props.value}</span>
          }>
            <span className={"tool-tip"}>{props.label}</span>
          </Show>
        </Show>
      </span>
      </label>
    </div>
  );
}