import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      }
      else {
        return [...prev, newMode];
      }
    });
  };

  const back = () => {
    const newHistory = [...history];
    if (newHistory.length > 1)
      newHistory.pop();
    setHistory(newHistory);
    const newMode = newHistory[newHistory.length - 1];
    setMode(newMode);
  };

  return { mode, transition, back };
}