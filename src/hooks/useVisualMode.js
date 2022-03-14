import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      const newHistory = [...history];
      newHistory[newHistory.length - 1] = mode;
      setHistory(newHistory);
    } else {
      let newHistory = [...history];
      newHistory.push(mode);
      setHistory(newHistory);
    }
  }
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
