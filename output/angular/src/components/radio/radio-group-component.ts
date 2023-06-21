import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import radioContext from "./radio.context.js";
import { RadioGroupProps } from "./radio.model";

@Component({
  selector: "radio-group, RadioGroup",
  template: `
    <fieldset class="radio-options-group">
      <ng-content></ng-content>
    </fieldset>
  `,
  styles: [
    `
      .radio-options-group {
        display: flex;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class RadioGroup {
  @Input() size: RadioGroupProps["size"];
  @Input() name: RadioGroupProps["name"];
  @Input() multiple: RadioGroupProps["multiple"];
  @Input() callback: RadioGroupProps["callback"];
}
