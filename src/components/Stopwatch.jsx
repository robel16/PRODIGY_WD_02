import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Stopwatch = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { minutes, seconds, milliseconds } = prevTime;
          milliseconds += 10;
          if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds += 1;
          }
          if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
          }
          return { minutes, seconds, milliseconds };
        });
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, time]);
  };

  const clearLaps = () => {
    setLaps([]);
  };

  const formatTime = (unit) => unit.toString().padStart(2, "0");

  const { minutes, seconds, milliseconds } = time;

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h1 className="card-title">React Stopwatch</h1>
          <div className="display-4 text-primary">
            {formatTime(minutes)}:{formatTime(seconds)}:
            {milliseconds.toString().padStart(3, "0")}
          </div>
          <div className="mt-3">
            <button
              className="btn btn-outline-success mx-2"
              onClick={startTimer}
            >
              Start
            </button>
            <button className="btn btn-outline-danger mx-2" onClick={stopTimer}>
              Stop
            </button>
            <button
              className="btn btn-outline-warning mx-2"
              onClick={resetTimer}
            >
              Reset
            </button>
            <button className="btn btn-outline-primary mx-2" onClick={lap}>
              Lap
            </button>
            <button
              className="btn btn-outline-secondary mx-2"
              onClick={clearLaps}
            >
              Clear Laps
            </button>
          </div>
          <ul className="list-unstyled mt-3">
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lap.minutes)}:
                {formatTime(lap.seconds)}:
                {lap.milliseconds.toString().padStart(3, "0")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
