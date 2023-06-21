import * as React from "react";
import { useContext } from "react";
import radioStore from "./radio.context.js";

function RadioGroup(props) {
  return (
    <>
      <radioStore.Provider
        value={{
          size: props.size,
          name: props.name,
          multiple: props.multiple || false,
          selectedValues: new Set(),
          callback: props.callback,
        }}
      >
        <fieldset className="radio-button-group">{props.children}</fieldset>
      </radioStore.Provider>
      <style jsx>{`
        .radio-button-group {
          display: flex;
        }
      `}</style>
    </>
  );
}

export default RadioGroup;
