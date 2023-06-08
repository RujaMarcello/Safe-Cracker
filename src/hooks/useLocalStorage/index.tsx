import { useEffect, useState } from 'react';

export type LocalStorageItem = {
  totalWinAmount: string;
  amount: string;
  winNumbers: string;
  time: string;
};

const useLocalStorage = (): LocalStorageItem[] | null => {
  const [localStorageValues, setLocalStorageValues] = useState<LocalStorageItem[] | null>(null);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const data: LocalStorageItem[] = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = localStorage.getItem(key);

      if (value) {
        const parsedValue: LocalStorageItem = JSON.parse(value);
        data.push(parsedValue);
      }
    }

    const sortedData = data.sort((a: LocalStorageItem, b: LocalStorageItem) => {
      return Number(b.totalWinAmount) - Number(a.totalWinAmount);
    });

    setLocalStorageValues(sortedData);
  }, [localStorage.length]);

  return localStorageValues;
};

export default useLocalStorage;
