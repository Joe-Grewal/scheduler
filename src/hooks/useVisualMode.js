import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /*
  function that takes in both a string and a boolean to advance to a new status in the appointment component
  the string value is an indication of the current status
  the boolean is used to decide whether or not to replace the last string value in history
  */
  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    }
  }

  //function that reverts to the last known status of the appointment component
  function back() {
    if (history.length === 1) {
      return;
    } else {
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }
  return { mode, transition, back };
};
