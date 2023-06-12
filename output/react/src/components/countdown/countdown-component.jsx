import * as React from "react";
import { useState, useEffect } from "react";

function CountdownComponent(props) {
  const [timerId, setTimerId] = useState(() => null);

  const [startTime, setStartTime] = useState(() => 0);

  const [currentTime, setCurrentTime] = useState(() => 0);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padDigits(minutes)}:${padDigits(seconds)}`;
  }

  function padDigits(number) {
    return number.toString().padStart(2, "0");
  }

  function start() {
    if (!timerId) {
      if (currentTime === 0) {
        setCurrentTime(startTime);
      }
      setTimerId(
        setInterval(() => {
          setCurrentTime(currentTime - 1);
          if (currentTime === 0) {
            stop();
            alert("Der Countdown ist abgelaufen!");
          }
        }, 1000)
      );
    }
  }

  function stop() {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }

  function reset() {
    stop();
    setCurrentTime(startTime);
  }

  useEffect(() => {
    setStartTime(props.startTimeCountdown);
    setCurrentTime(startTime);
  }, []);

  return (
    <>
      <div>
        <div className="align-items-center d-flex justify-content-center timeDisplayContainer">
          <span id="timeDisplay">{formatTime(currentTime)}</span>
        </div>

        <div>
          <button className="btn btn-success" onClick={(event) => start()}>
            Start
          </button>

          <button className="btn btn-warning" onClick={(event) => reset()}>
            Reset
          </button>

          <button className="btn btn-danger" onClick={(event) => stop()}>
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

export default CountdownComponent;
