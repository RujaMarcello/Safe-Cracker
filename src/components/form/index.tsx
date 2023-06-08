import './index.css';

import React, { FC, useEffect } from 'react';

import { ButtonState } from '../../enums';
interface FormProps {
  buttonValue: number;
  isGameStarted: boolean;
  handleAmount: (event: React.FormEvent<HTMLInputElement>) => void;
  value: number;
  handleButton: () => void;
}

const Form: FC<FormProps> = ({ isGameStarted, handleAmount, value, handleButton, buttonValue }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        handleButton();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleButton]);

  return (
    <>
      <div className="title">
        <h4>Enter Amount</h4>
      </div>
      <input
        disabled={isGameStarted}
        onChange={handleAmount}
        value={isNaN(value) ? 0 : value}
        className="inputForm"
        placeholder="Please input amount"
      ></input>
      <button onClick={handleButton} className="button">
        {buttonValue === 1 ? ButtonState.start : buttonValue === 2 ? ButtonState.spin : ButtonState.reset}
      </button>
    </>
  );
};

export default Form;
