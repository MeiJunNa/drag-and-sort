import './App.css';
import React from 'react';
import Board from './Board';

const data = {
  ALL: [{author: {id: "0001", name: "ALL",},id: "00001"},],
  BMO: [{author: {id: "1", name: "BMO",},id: "01"},],
  Finn: [{author: {id: "2", name: "Finn", },id: "02"},]
}
function App() {
  return (
    <div className="App">
      <Board initial={data}/>
		</div>
  );
}

export default App;
