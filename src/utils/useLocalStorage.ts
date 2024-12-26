import { useCallback, useState } from "react";

export const useLocalStorage = <T>({ key }: { key: string | undefined }) => {
  const [value, _setValue] = useState<T | null>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (!key) return null;
      const cacheString = localStorage.getItem(key);
      if (!cacheString) return null;
      return JSON.parse(cacheString);
    }
  });

  const setValue = useCallback(
    async (cacheValue: T | null) => {
      if (typeof window !== "undefined" && window.localStorage) {
        if (!key) return;
        _setValue(cacheValue);
        localStorage.setItem(key, JSON.stringify(cacheValue));
      }
    },
    [key],
  );

  const removeValue = useCallback(async () => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (!key) return;
      _setValue(null);
      localStorage.removeItem(key);
    }
  }, [key]);

  return {
    value,
    setValue,
    removeValue,
  };
};
