import { setContext, useStyle } from "@builder.io/mitosis";
import radioContext from "./radio.context.lite";
import { RadioGroupProps } from "./radio.model";

/**
 * Creates a RadioGroup component.
 *
 * @param {RadioGroupProps} props - The properties of the RadioGroup component.
 * @returns {JSX.Element} The RadioGroup component.
 */
export default function RadioGroup(props: RadioGroupProps) {

  // Initialize the RadioStore context with the provided properties
  setContext(radioContext, {
    size: props.size,
    name: props.name,
    multiple: props.multiple || false,
    selectedValues: new Set(),
    callback: props.callback,
  });

  // Apply CSS styles for the RadioGroup
  useStyle(`
    .radio-options-group {
      display: flex;
    }
  `);

  // Return the JSX element
  return (
    <fieldset className="radio-options-group">
      {props.children}
    </fieldset>
  );
}


