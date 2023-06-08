import React, { FC } from 'react';

interface WinValueProps {
  value: number;
}
const WinValue: FC<WinValueProps> = ({ value }) => {
  return (
    <React.Fragment>
      <h1>{value}</h1>
    </React.Fragment>
  );
};

export default WinValue;
