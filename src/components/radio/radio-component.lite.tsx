import { For, onInit, Show, useStore, useStyle } from "@builder.io/mitosis";

export default function RadioComponent(props: any) {
  // Verwendung des useStore-Hooks, um den Zustand zu initialisieren
  const state = useStore({
    // Übernahme der Props in den Zustand
    radioOptions: props.radioOptions,
    selectedValue: "",
    callback: props.callback,
    size: props.size || "medium",
    radioPadding: "",
    iconVariant: "",
    fontSize: "",
    // Funktion zum Behandeln des Klicks auf eine Radio-Option
    handleRadioOptionClick(value: string) {
      state.selectedValue = value;
      // Aufruf des Callbacks, wenn vorhanden
      if (state.callback) {
        state.callback(value);
      }
    },
    // Funktion zum Ermitteln der Größenabhängigen Werte
    getSizes() {
      if (state.size === "small") {
        state.radioPadding = "4px 8px";
        state.iconVariant = "20-outline";
        state.fontSize = "14px";
      } else if (state.size === "large") {
        state.radioPadding = "12px 24px";
        state.iconVariant = "32-outline";
        state.fontSize = "22px";
      } else {
        state.radioPadding = "8px 16px"; // medium
        state.iconVariant = "24-outline";
        state.fontSize = "18px";
      }
    },
  });

  // onInit-Hook, der aufgerufen wird, wenn die Komponente initialisiert wird
  onInit(() => {
    // Ermittlung der Größenabhängigen Werte beim Initialisieren
    state.getSizes();
  });

  // Verwendung des useStyle-Hooks, um Stile einzufügen
  useStyle(`
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
    position: relative
  }

  .radio-button-group .radio-button:not(:first-of-type) label {
    border-left: none;
  }
    
  .radio-button-group .radio-button:first-of-type label{
    border-radius: 4px 0 0 4px;
  }
  
  .radio-button-group .radio-button:last-of-type label {
    border-radius: 0 4px 4px 0;
  }
  
  .radio-button-group input[type="radio"]:checked + label {
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .radio-button-group input[type="radio"]:hover + label {
    background-color: rgba(0, 0, 0, 0.04)
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
  
  `);

  return (
    <div className="radio-button-group">
      {/* Iteration über die Radio-Optionen */}
      <For each={state.radioOptions[0].options}>
        {(option: any) => (
          <div className="radio-button">
            {/* Radio-Button-Element */}
            <input
              type="radio"
              name={option.value}
              value={option.value}
              id={option.value}
              checked={state.selectedValue === option.value}
              onClick={() => state.handleRadioOptionClick(option.value)}
            />
            {/* Label für den Radio-Button */}
            <label
              htmlFor={option.value}
              style={{
                padding: state.radioPadding,
              }}
            >
              <span>
                {/* Show-Komponente zur bedingten Anzeige */}
                <Show
                  when={option.icon != "" && option.icon != null}
                  else={
                    // Anzeige, wenn kein Icon vorhanden ist
                    <span style={{ fontSize: state.fontSize }}>
                      {option.description}
                    </span>
                  }
                >
                  {/* DB-Icon-Komponente */}
                  <DbIcon
                    icon={option.icon}
                    variant={state.iconVariant}
                  ></DbIcon>
                  {/* Tooltip für das Icon */}
                  <span className={"tool-tip"}>{option.description}</span>
                </Show>
              </span>
            </label>
          </div>
        )}
      </For>
    </div>
  );
}
