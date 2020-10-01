import { useState } from 'react';

export default function useVisualMode(initial) {
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    let newHistory = [...history];
    if(replace)
      newHistory.pop();
    setHistory([...newHistory, newMode]);
  }

  const back = () => {
    const newHistory = [ ...history ]
    if(newHistory.length > 1)
      newHistory.pop();
    setHistory(newHistory);
    const newMode = newHistory[newHistory.length-1];
    setMode(newMode);
  }

  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  return { mode, transition, back }
}