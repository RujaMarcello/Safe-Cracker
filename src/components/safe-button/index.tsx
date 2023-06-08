import './index.css';

import React, { FC } from 'react';
interface SafeButtonProps {
  value: number;
  multiplierValue: number;
  selected: boolean;
}
const SafeButton: FC<SafeButtonProps> = ({ value, multiplierValue, selected }) => {
  return (
    <div className="safeButtonContainer">
      <div className="value">
        {selected === true ? <h2 style={{ color: 'red' }}>{multiplierValue}x </h2> : <h1>{value}</h1>}
      </div>
    </div>
  );
};

export default SafeButton;
