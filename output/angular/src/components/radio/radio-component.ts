import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

@Component({
  selector: "radio-component, RadioComponent",
  template: `
    <div class="radio-button-group">
      <ng-container *ngFor="let optionGroup of radioOptions">
        <div [attr.key]="optionGroup.groupName">
          <h3>{{optionGroup.groupName}}</h3>

          <ng-container *ngFor="let option of optionGroup.options">
            <div class="radio-button">
              <input
                type="radio"
                [attr.name]="optionGroup.groupName"
                [attr.value]="option.value"
                [attr.id]="option.value"
                [attr.checked]="selectedValue === option.value"
                (click)="handleRadioOptionClick(optionGroup.groupName, option.value)"
              />

              <label [attr.for]="option.value">
                <span>
                  <DbIcon [icon]="radioIcons[option.value]"></DbIcon>

                  {{option.label}}
                </span>
              </label>
            </div>
          </ng-container>
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
    `,
  ],
})
export class RadioComponent {
  @Input() radioOptions: any;
  @Input() radioIcons: any;
  @Input() radioDescriptions: any;
  @Input() callback: any;

  radioOptions = this.radioOptions;
  radioIcons = this.radioIcons;
  radioDescriptions = this.radioDescriptions;
  selectedValue = "";
  callback = this.callback;
  handleRadioOptionClick(radioOption: string, value: string) {
    console.log("Test");
    this.selectedValue = value;
    if (this.callback) {
      this.callback(radioOption, value);
    }
  }
}

@NgModule({
  declarations: [RadioComponent],
  imports: [CommonModule, DbIconModule],
  exports: [RadioComponent],
})
export class RadioComponentModule {}
