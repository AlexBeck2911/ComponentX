import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "countdown-component, CountdownComponent",
  template: `
    <div>
      <div
        class="align-items-center d-flex justify-content-center timeDisplayContainer"
      >
        <span id="timeDisplay">{{formatTime(currentTime)}}</span>
      </div>

      <div>
        <button class="btn btn-success" (click)="start()">Start</button>

        <button class="btn btn-warning" (click)="reset()">Reset</button>

        <button class="btn btn-danger" (click)="stop()">Stop</button>
      </div>
    </div>
  `,
  styles: [
    `
      #timeDisplay {
        font-size: 45px;
      }
      .timeDisplayContainer {
        margin-top: 40px;
        margin-bottom: 40px;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class CountdownComponent {
  @Input() startTimeCountdown: any;

  timerId = null;
  startTime = 0;
  currentTime = 0;
  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${this.padDigits(minutes)}:${this.padDigits(seconds)}`;
  }
  padDigits(number: number) {
    return number.toString().padStart(2, "0");
  }
  start() {
    if (!this.timerId) {
      if (this.currentTime === 0) {
        this.currentTime = this.startTime;
      }
      this.timerId = setInterval(() => {
        this.currentTime = this.currentTime - 1;
        if (this.currentTime === 0) {
          this.stop();
          alert("Der Countdown ist abgelaufen!");
        }
      }, 1000);
    }
  }
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
  reset() {
    this.stop();
    this.currentTime = this.startTime;
  }

  ngOnInit() {
    this.startTime = this.startTimeCountdown;
    this.currentTime = this.startTime;
  }
}
