import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function App() {
  const [items, setItems] = useState(data.results.items);

  //convert the "tradedatetimegmt" to a date object
  /* items.forEach((item) => {
    item.tradedatetimegmt = new Date(item.tradedatetimegmt);
  }); */

  return (
    <>
      <div>
        //create a line chart with the data from the items array with the"close"
        as the y-axis and converted "tradedatetimegmt" as the x-axis
        <LineChart
          width={800}
          height={400}
          data={items}
        >
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="tradedatetimegmt" />
          <YAxis />
        </LineChart>
      </div>
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
