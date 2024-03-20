import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function App() {
  const [items, setItems] = useState(data.results.items);
  const [newItem, setNewItem] = useState({
    close: 0,
    offexchtradevolumeeex: 0,
    onexchtradevolumeeex: 0,
    tradedatetimegmt: new Date(),
  });

  /* items.forEach((item) => {
    item.tradedatetimegmt = new Date(item.tradedatetimegmt);
  }); */

  return (
    <>
      <div>
        //Create a form to add a new item
        <form>
          <label>
            Close:
            <input
              type="number"
              value={newItem.close}
              onChange={(event) =>
                setNewItem({ ...newItem, close: event.target.value })
              }
            />
          </label>
          <label>
            Off Exchange Trade Volume:
            <input
              type="number"
              value={newItem.offexchtradevolumeeex}
              onChange={(event) =>
                setNewItem({
                  ...newItem,
                  offexchtradevolumeeex: event.target.value,
                })
              }
            />
          </label>
          <label>
            On Exchange Trade Volume:
            <input
              type="number"
              value={newItem.onexchtradevolumeeex}
              onChange={(event) =>
                setNewItem({
                  ...newItem,
                  onexchtradevolumeeex: event.target.value,
                })
              }
            />
          </label>
          <label>
            Trade Date Time GMT:
            <input
              type="datetime-local"
              value={newItem.tradedatetimegmt}
              onChange={(event) =>
                setNewItem({ ...newItem, tradedatetimegmt: event.target.value })
              }
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setItems([...items, newItem]);
              console.log(items);
            }}
          >
            Add
          </button>
        </form>
      </div>
      <div>
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
              //OnClick remove the line
              <tr key={index}>
                <td>{item.close}</td>
                <td>{item.offexchtradevolumeeex}</td>
                <td>{item.onexchtradevolumeeex}</td>
                <td>{item.tradedatetimegmt}</td>
                <td>
                  <button
                    onClick={() => {
                      items.splice(index, 1);
                      setItems([...items]);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
