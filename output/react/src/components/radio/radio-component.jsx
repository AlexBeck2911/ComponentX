import * as React from "react";
import { useLocalObservable, observer } from "mobx-react-lite";

function RadioComponent(props) {
  const state = useLocalObservable(() => ({
    radioOptions: props.radioOptions,
    radioIcons: props.radioIcons,
    radioDescriptions: props.radioDescriptions,
    selectedValue: "",
    callback: props.callback,
    handleRadioOptionClick(radioOption, value) {
      console.log("Test");
      state.selectedValue = value;
      if (state.callback) {
        state.callback(radioOption, value);
      }
    },
  }));

  return (
    <>
      <div className="radio-button-group">
        {state.radioOptions?.map((optionGroup) => (
          <div key={optionGroup.groupName}>
            <h3>{optionGroup.groupName}</h3>

            {optionGroup.options?.map((option) => (
              <div className="radio-button">
                <input
                  type="radio"
                  name={optionGroup.groupName}
                  value={option.value}
                  id={option.value}
                  checked={state.selectedValue === option.value}
                  onClick={(event) =>
                    state.handleRadioOptionClick(
                      optionGroup.groupName,
                      option.value
                    )
                  }
                />

                <label htmlFor={option.value}>
                  <span>
                    <DbIcon icon={state.radioIcons[option.value]} />

                    {option.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        .radio-button-group {
          display: flex;
        }

        .radio-button-group > div {
          display: flex;
        }

        .radio-button-group h3 {
          margin-top: 0;
        }

        .radio-button-group label {
          display: inline-block;
        }

        .radio-button-group input[type="radio"] {
          display: none;
        }

        .radio-button-group .radio-button label {
          display: inline-block;
          padding: 8px 16px;
          background-color: transparent;
          cursor: pointer;
          border: 1px solid #ccc;
        }

        .radio-button-group .radio-button:not(:first-of-type) label {
          border-left: none;
        }

        .radio-button-group .radio-button:first-of-type label {
          border-radius: 4px 0 0 4px;
        }

        .radio-button-group .radio-button:last-of-type label {
          border-radius: 0 4px 4px 0;
        }

        .radio-button-group input[type="radio"]:checked + label {
          background-color: rgba(0, 0, 0, 0.08);
        }

        .radio-button-group input[type="radio"]:hover + label {
          background-color: rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </>
  );
}

const observedRadioComponent = observer(RadioComponent);
export default observedRadioComponent;
