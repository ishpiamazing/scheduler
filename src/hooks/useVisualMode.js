import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if(!replace) {
      setHistory(() => [...history, newMode])
    }
    setMode(() => newMode)  
  }
  
  function back() {
    let newHistory = [...history];
    if(newHistory.length > 1 ){
      newHistory = newHistory.slice(0, -1);
    }
    setHistory(newHistory);
    setMode(newHistory[newHistory.length -1]);
  }

  return { mode, transition, back };

}