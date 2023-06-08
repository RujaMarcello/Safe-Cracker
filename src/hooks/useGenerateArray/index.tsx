import { useCallback, useEffect, useState } from 'react';

import { GeneratedNumber } from '../../interfaces';

const useGenerateArray = () => {
  const [shuffeldArray, setShuffledArray] = useState<GeneratedNumber[]>([]);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  };
  const generateArray = useCallback(() => {
    const randomNumberArray: number[] = [];

    while (randomNumberArray.length < 3) {
      const randomNumber = generateRandomNumber(15, 20);
      if (!randomNumberArray.includes(randomNumber)) {
        randomNumberArray.push(randomNumber);
      }
    }

    let fullRandomNumberArray: number[] = [];
    for (let count = 0; count < 3; ++count) {
      fullRandomNumberArray = fullRandomNumberArray.concat(randomNumberArray);
    }

    const generatedRandomArray: GeneratedNumber[] = fullRandomNumberArray
      .sort(() => 0.5 - Math.random())
      .map((el: number, index: number) => {
        return {
          value: index + 1,
          multiplierValue: el,
          selected: false,
        };
      });

    setShuffledArray(generatedRandomArray);
  }, []);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const checkWin = () => {
    const filteredShuffledArray = shuffeldArray.filter((el) => el.selected === true);
    const find = filteredShuffledArray.find((el, index) => {
      return (
        filteredShuffledArray.findIndex((element) => {
          return el.multiplierValue === element.multiplierValue;
        }) !== index
      );
    });
    return { filteredShuffledArray, find };
  };

  const openSafe = () => {
    let ok = 1;
    while (ok) {
      const randomNumber = generateRandomNumber(0, 8);
      if (shuffeldArray[randomNumber].selected === false) {
        const temp = [...shuffeldArray];
        temp[randomNumber].selected = true;
        setShuffledArray(temp);
        ok = 0;
      }
    }
    return checkWin();
  };

  const resetSafe = () => {
    generateArray();
  };

  return { shuffeldArray, openSafe, resetSafe };
};

export default useGenerateArray;
