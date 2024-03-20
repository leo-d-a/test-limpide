import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';

function App() {
  const [items, setItems] = useState(data.results.items);

  return (
    <>
      <div>
        //for each element in the items array, create a line in a table with the
        item's "close", "offexchtradevolumeeex" ,"onexchtradevolumeeex",
        "tradedatetimegmt"
        <table>
          <thead>
            <tr>
              <th>Close</th>
              <th>Off Exchange Trade Volume</th>
              <th>On Exchange Trade Volume</th>
              <th>Trade Date Time GMT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.close}</td>
                <td>{item.offexchtradevolumeeex}</td>
                <td>{item.onexchtradevolumeeex}</td>
                <td>{item.tradedatetimegmt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
