import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "radio-component, RadioComponent",
  template: `
    <div class="radio-button-group">
      <ng-container *ngFor="let option of radioOptions[0].options">
        <div class="radio-button">
          <input
            type="radio"
            [attr.name]="option.value"
            [attr.value]="option.value"
            [attr.id]="option.value"
            [attr.checked]="selectedValue === option.value"
            (click)="handleRadioOptionClick(option.value)"
          />

          <label
            [attr.for]="option.value"
            [ngStyle]="{
          padding: radioPadding
        }"
          >
            <span>
              <ng-container *ngIf='option.icon != "" && option.icon != null'>
                <DbIcon [icon]="option.icon" [variant]="iconVariant"></DbIcon>

                <span class="tool-tip">{{option.description}}</span>
              </ng-container>
            </span>
          </label>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
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
    `,
  ],
  standalone: true,
  imports: [CommonModule, DbIcon],
})
export class RadioComponent {
  @Input() radioOptions: any;
  @Input() callback: any;
  @Input() size: any;

  radioOptions = this.radioOptions;
  selectedValue = "";
  callback = this.callback;
  size = this.size || "medium";
  radioPadding = "";
  iconVariant = "";
  fontSize = "";
  handleRadioOptionClick(value: string) {
    this.selectedValue = value;
    if (this.callback) {
      this.callback(value);
    }
  }
  getSizes() {
    if (this.size === "small") {
      this.radioPadding = "4px 8px";
      this.iconVariant = "20-outline";
      this.fontSize = "14px";
    } else if (this.size === "large") {
      this.radioPadding = "12px 24px";
      this.iconVariant = "32-outline";
      this.fontSize = "22px";
    } else {
      this.radioPadding = "8px 16px"; // medium
      this.iconVariant = "24-outline";
      this.fontSize = "18px";
    }
  }

  constructor() {
    this.getSizes();
  }
}
