import { useEffect, useState } from "react";

export const useDebounce = (value: string | undefined, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
