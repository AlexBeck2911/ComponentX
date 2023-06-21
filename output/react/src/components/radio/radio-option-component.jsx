import * as React from "react";
import { useState, useContext, useEffect } from "react";
import radioContext from "./radio.context.js";

function RadioOption(props) {
  const [radioPadding, setRadioPadding] = useState(() => "");

  const [radio, setRadio] = useState(() => ({
    size: "",
    name: "",
    multiple: false,
    selectedValues: new Set(),
    callback: (value) => {},
  }));

  function getSizes() {
    if (radio.size === "small") {
      setRadioPadding("4px 8px");
    } else if (radio.size === "large") {
      setRadioPadding("12px 24px");
    } else {
      setRadioPadding("8px 16px");
    }
  }

  function handleRadioOptionClick(value) {
    if (radio.callback) {
      radio.callback(value);
    }
  }

  function handleCheckBoxOptionClick(value) {
    if (radio.selectedValues.has(value)) {
      radio.selectedValues.delete(value);
    } else {
      radio.selectedValues.add(value);
    }
    if (radio.callback) {
      radio.callback(radio.selectedValues);
    }
  }

  function init() {
    getSizes();
  }

  const radioContextState = useContext(radioContext);

  useEffect(() => {
    setRadio(radioContextState);
    init();
  }, []);

  return (
    <>
      <div className="radio-button">
        {radio.multiple ? (
          <>
            <input
              type="checkbox"
              name={radio.name}
              value={props.value}
              id={props.value}
              onChange={(event) => handleCheckBoxOptionClick(props.value)}
              disabled={props.disabled}
            />
          </>
        ) : (
          <>
            <input
              type="radio"
              name={radio.name}
              value={props.value}
              id={props.value}
              onChange={(event) => handleRadioOptionClick(props.value)}
              disabled={props.disabled}
            />
          </>
        )}

        <label
          htmlFor={props.value}
          style={{
            padding: radioPadding,
          }}
        >
          <span>
            {props.children}

            {!props.noToolTip ? (
              <>
                {props.label != null ? (
                  <>
                    <span className="tool-tip">{props.label}</span>
                  </>
                ) : (
                  <span className="tool-tip">{props.value}</span>
                )}
              </>
            ) : null}
          </span>
        </label>
      </div>
      <style jsx>{`
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
          position: relative;
        }

        .radio-button:not(:first-of-type) label {
          border-left: none;
        }

        .radio-button:first-of-type label {
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
      `}</style>
    </>
  );
}

export default RadioOption;
