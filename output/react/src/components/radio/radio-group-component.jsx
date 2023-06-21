import * as React from "react";
import { useContext } from "react";
import radioContext from "./radio.context.js";

function RadioGroup(props) {
  return (
    <>
      <radioContext.Provider
        value={{
          size: props.size,
          name: props.name,
          multiple: props.multiple || false,
          selectedValues: new Set(),
          callback: props.callback,
        }}
      >
        <fieldset className="radio-options-group">{props.children}</fieldset>
      </radioContext.Provider>
      <style jsx>{`
        .radio-options-group {
          display: flex;
        }
      `}</style>
    </>
  );
}

export default RadioGroup;
