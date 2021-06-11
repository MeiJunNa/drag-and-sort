import './App.css';
import React from 'react';
import Board from './Board';

const data = {
  EMPTY: [{id: "00001",nameIntl:'列表01'}],
  GROUP1: [
    {id: "01",nameIntl:'列表1',label: {id: "labelid1", nameIntl: "选项组", descriptionIntl: "描述"}},
    {id: "02",nameIntl:'列表2',label: {id: "labelid1", nameIntl: "选项组", descriptionIntl: "描述"}},
  ],
  GROUP2: [
    { id: "03",nameIntl:'列表3',label: {id: "labelid2", nameIntl: "选项组2", descriptionIntl: "描述2"}},
    { id: "04",nameIntl:'列表4',label: {id: "labelid2", nameIntl: "选项组2", descriptionIntl: "描述2"}},
  ]
}
function App() {
  return (
    <div className="App">
      <Board initial={data}/>
		</div>
  );
}

export default App;
