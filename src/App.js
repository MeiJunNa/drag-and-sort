import React from 'react';
import _ from 'lodash';
import Board from './Board';
import './App.css';

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

  function editEvent(passValue){
    console.log('传递过来的值，在此处做处理',passValue)
  }

  function handleSort(columns,ordered){
    //此处对值进行排序，并作为参数传入接口
    let newValue = (_.orderBy(Object.entries(columns), [([key])=>ordered.findIndex(some=>some === key)], ['asc'])).flatMap(([key,val])=>val);
    let SpuMenuSortInput = [];
    for(let i=0;i<newValue?.length;i++){
      SpuMenuSortInput.push({ spuMenuId:newValue[i]?.id, sortorder:i });
    }
    // handleSortSpuMenu({
    //   variables: {
    //     input:{input:SpuMenuSortInput}
    //   }
    // });
  }
  
  return (
    <div className="App">
      <Board initial={data} passEditEvent={editEvent} handleSort={handleSort}/>
		</div>
  );
}

export default App;
