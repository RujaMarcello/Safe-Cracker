import './App.css';

import React, { useState } from 'react';

import Form from './components/form';
import SafeButton from './components/safe-button';
import Table from './components/table';
import WinValue from './components/win-values';
import { TitleState } from './enums';
import useGenerateArray from './hooks/useGenerateArray';
import { GeneratedNumber, LocalStorageData } from './interfaces';
function App() {
  const { shuffeldArray, openSafe, resetSafe } = useGenerateArray();
  const [winValues, setWinValues] = useState<GeneratedNumber[]>([]);
  const [value, setValue] = useState<number>(0);
  const [title, setTitle] = useState<string>(TitleState.start);
  const [buttonValue, setButtonValue] = useState<number>(1);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const handleAmount = (event: React.FormEvent<HTMLInputElement>) => {
    const number = event.currentTarget.value;

    if (number.length > 6) {
      return;
    }

    setValue(Number(number));
  };

  const handleGame = () => {
    const isWin = openSafe();
    setWinValues(isWin.filteredShuffledArray);
    if (isWin && isWin.find) {
      setTitle(`${TitleState.win} ${isWin.find.multiplierValue}x !`);
      setButtonValue(3);

      const dataObject: LocalStorageData = {
        totalWinAmount: value * isWin.find.multiplierValue,
        amount: value,
        winNumbers: isWin.filteredShuffledArray.map((el) => {
          return el.value;
        }),
        time: Date.now(),
      };

      localStorage.setItem(JSON.stringify(localStorage.length), JSON.stringify(dataObject));
      setValue((prevValue) => (isWin.find ? prevValue * isWin.find?.multiplierValue : prevValue));
      setIsGameStarted(false);
    }
  };

  const handleButton = () => {
    if (buttonValue == 1 && value !== 0) {
      setTitle(TitleState.spin);
      setButtonValue(2);
      setIsGameStarted(true);
    } else if (isGameStarted) {
      setButtonValue(2);
      handleGame();
    } else if (buttonValue === 3) {
      setValue(0);
      setButtonValue(1);
      setIsGameStarted(false);
      setTitle(TitleState.start);
      setWinValues([]);
      resetSafe();
    }
  };

  return (
    <div className="container">
      <div className="winBar">
        <h1>{title}</h1>
      </div>
      <div className="gameContainer">
        <div className="leftContainer">
          {shuffeldArray &&
            shuffeldArray.map((el: GeneratedNumber, index: number) => {
              return (
                <SafeButton selected={el.selected} key={index} value={el.value} multiplierValue={el.multiplierValue} />
              );
            })}
        </div>
        <div className="rightContainer">
          <div className="winValuesContainer">
            {winValues &&
              winValues.map((el: GeneratedNumber, index: number) => {
                return <WinValue key={index} value={el.value} />;
              })}
          </div>
          <div className="form">
            <Form
              buttonValue={buttonValue}
              isGameStarted={isGameStarted}
              handleAmount={handleAmount}
              value={value}
              handleButton={handleButton}
            />
          </div>
        </div>
      </div>
      <div className="dataTable">
        <Table />
      </div>
    </div>
  );
}

export default App;
