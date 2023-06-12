import { setContext, useStyle } from "@builder.io/mitosis";
import radioStore from "./radio.context.lite";
import { RadioGroupProps } from "./radio.props";

/**
 * Creates a RadioGroup component.
 *
 * @param {RadioGroupProps} props - The properties of the RadioGroup component.
 * @returns {JSX.Element} The RadioGroup component.
 */
export default function RadioGroup(props: RadioGroupProps) {

  // Initialize the RadioStore context with the provided properties
  setContext(radioStore, {
    size: props.size,
    name: props.name,
    multiple: props.multiple || false,
    selectedValues: new Set(),
    callback: props.callback,
  });

  // Apply CSS styles for the RadioGroup
  useStyle(`
    .radio-button-group {
      display: flex;
    }
  `);

  // Return the JSX element
  return (
    <fieldset className="radio-button-group">
      {props.children}
    </fieldset>
  );
}