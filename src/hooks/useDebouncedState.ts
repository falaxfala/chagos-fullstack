import { useEffect, useState } from "react";

export const useDebouncedState = <T>(initialState: T, delay = 500) => {
  const [state, setState] = useState<T>(initialState);
  const [debouncedState, setDebouncedState] = useState<T>(initialState);
  const [realTimeState, setRealTimeState] = useState<T>(initialState);

  useEffect(() => {
    setRealTimeState(state);
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [state, delay]);

  return [debouncedState, setState, realTimeState] as const;
};
