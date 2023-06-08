import './index.css';

import useLocalStorage, { LocalStorageItem } from '../../hooks/useLocalStorage';

const Table = () => {
  const data = useLocalStorage();
  return (
    <table className="tableDesign">
      <thead>
        <tr>
          <th>Total</th>
          <th>Amount</th>
          <th>Numbers</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((el: LocalStorageItem, index: number) => {
            return (
              <tr key={index}>
                <td>{el.totalWinAmount}</td>
                <td>{el.amount}</td>
                <td>{el.winNumbers}</td>
                <td>{new Date(el.time).toLocaleTimeString()}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
