import * as React from "react";
import { useEffect } from "react";
import { useLocalObservable, observer } from "mobx-react-lite";

function CountdownComponent(props) {
  const state = useLocalObservable(() => ({
    timerId: null,
    startTime: 0,
    currentTime: 0,
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${this.padDigits(minutes)}:${this.padDigits(seconds)}`;
    },
    padDigits(number) {
      return number.toString().padStart(2, "0");
    },
    start() {
      if (!state.timerId) {
        if (state.currentTime === 0) {
          state.currentTime = state.startTime;
        }
        state.timerId = setInterval(() => {
          state.currentTime = state.currentTime - 1;
          if (state.currentTime === 0) {
            this.stop();
            alert("Der Countdown ist abgelaufen!");
          }
        }, 1000);
      }
    },
    stop() {
      if (state.timerId) {
        clearInterval(state.timerId);
        state.timerId = null;
      }
    },
    reset() {
      state.stop();
      state.currentTime = state.startTime;
    },
  }));

  useEffect(() => {
    state.startTime = props.startTimeCountdown;
    state.currentTime = state.startTime;
  }, []);

  return (
    <>
      <div>
        <div className="align-items-center d-flex justify-content-center timeDisplayContainer">
          <span id="timeDisplay">{state.formatTime(state.currentTime)}</span>
        </div>

        <div>
          <button
            className="btn btn-success"
            onClick={(event) => state.start()}
          >
            Start
          </button>

          <button
            className="btn btn-warning"
            onClick={(event) => state.reset()}
          >
            Reset
          </button>

          <button className="btn btn-danger" onClick={(event) => state.stop()}>
            Stop
          </button>
        </div>
      </div>
      <style jsx>{`
        #timeDisplay {
          font-size: 45px;
        }
        .timeDisplayContainer {
          margin-top: 40px;
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
}

const observedCountdownComponent = observer(CountdownComponent);
export default observedCountdownComponent;
