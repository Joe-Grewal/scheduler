import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
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
