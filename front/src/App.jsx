import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const parseDate = (dateString) => {
  const [date, time] = dateString.split(' ');
  const [month, day, year] = date.split('/');
  const [hours, minutes, seconds] = time.split(':');
  let newDate = new Date();
  newDate.setFullYear(year);
  newDate.setMonth(month);
  newDate.setDate(day);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(seconds);
  console.log(year, month, day, hours, minutes, seconds);
  return newDate;
};

function App() {
  const [items, setItems] = useState(
    data.results.items.map((item) => ({
      ...item,
      tradedatetimegmt: parseDate(item.tradedatetimegmt),
    }))
  );

  const [newItem, setNewItem] = useState({
    close: 0,
    offexchtradevolumeeex: 0,
    onexchtradevolumeeex: 0,
    tradedatetimegmt: new Date(),
  });
  const [filterCloseValue, setFilterCloseValue] = useState(0);

  const orderByCloseValueAscendant = () => {
    items.sort((a, b) => a.close - b.close);
    setItems([...items]);
  };
  const orderByCloseValueDescendant = () => {
    items.sort((a, b) => b.close - a.close);
    setItems([...items]);
  };
  const filterByCloseValue = () => {
    const filteredItems = items.filter((item) => item.close > filterCloseValue);
    setItems(filteredItems);
  };

  const orderByDate = () => {
    items.sort((a, b) => a.tradedatetimegmt - b.tradedatetimegmt);
    setItems([...items]);
  };

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
          <XAxis
            dataKey="tradedatetimegmt"
            tickFormatter={(date) => date.toLocaleString()}
          />
          <YAxis />
        </LineChart>
      </div>
      <div>
        <button onClick={orderByCloseValueAscendant}>
          Order by close value ascendant
        </button>
        <button onClick={orderByCloseValueDescendant}>
          Order by close value descendant
        </button>
        <button onClick={orderByDate}>Order by date</button>
        <label>
          Filter by close value:
          <input
            type="number"
            value={filterCloseValue}
            onChange={(event) => setFilterCloseValue(event.target.value)}
          />
        </label>
        <button onClick={filterByCloseValue}>Filter</button>
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
                <td>{item.tradedatetimegmt.toLocaleString()}</td>
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
