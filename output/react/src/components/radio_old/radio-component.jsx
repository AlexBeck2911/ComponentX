import * as React from "react";
import { useState, useEffect } from "react";

function RadioComponent(props) {
  const [radioOptions, setRadioOptions] = useState(() => props.radioOptions);

  const [selectedValue, setSelectedValue] = useState(() => "");

  const [callback, setCallback] = useState(() => props.callback);

  const [size, setSize] = useState(() => props.size || "medium");

  const [radioPadding, setRadioPadding] = useState(() => "");

  const [iconVariant, setIconVariant] = useState(() => "");

  const [fontSize, setFontSize] = useState(() => "");

  function handleRadioOptionClick(value) {
    setSelectedValue(value);
    if (callback) {
      callback(value);
    }
  }

  function getSizes() {
    if (size === "small") {
      setRadioPadding("4px 8px");
      setIconVariant("20-outline");
      setFontSize("14px");
    } else if (size === "large") {
      setRadioPadding("12px 24px");
      setIconVariant("32-outline");
      setFontSize("22px");
    } else {
      setRadioPadding("8px 16px"); // medium
      setIconVariant("24-outline");
      setFontSize("18px");
    }
  }

  useEffect(() => {
    getSizes();
  }, []);

  return (
    <>
      <div className="radio-button-group">
        {radioOptions[0].options?.map((option) => (
          <div className="radio-button">
            <input
              type="radio"
              name={option.value}
              value={option.value}
              id={option.value}
              checked={selectedValue === option.value}
              onClick={(event) => handleRadioOptionClick(option.value)}
            />

            <label
              htmlFor={option.value}
              style={{
                padding: radioPadding,
              }}
            >
              <span>
                {option.icon != "" && option.icon != null ? (
                  <>
                    <DbIcon icon={option.icon} variant={iconVariant} />
                    <span className="tool-tip">{option.description}</span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        fontSize: fontSize,
                      }}
                    >
                      {option.description}
                    </span>
                  </>
                )}
              </span>
            </label>
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
          background-color: transparent;
          cursor: pointer;
          border: 1px solid #ccc;
          position: relative;
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

        .radio-button-group .radio-button label:hover .tool-tip {
          visibility: visible;
        }
      `}</style>
    </>
  );
}

export default RadioComponent;
