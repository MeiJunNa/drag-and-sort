import React from 'react';
import _ from 'lodash';
import Board from './Board';
import './App.css';

const data = {
  //EMPTY用来放那些不是组的
  EMPTY: [{id: "00001",nameIntl:'列表01'},{id: "00002",nameIntl:'列表02'}],
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

  function handleSort(columns,ordered,source,destination,){
    //此处对值进行排序，并作为参数传入接口
    let newValue = (_.orderBy(Object.entries(columns), [([key])=>ordered.findIndex(some=>some === key)], ['asc']));
    let SpuMenuSortInput = [];
    for(let i=0;i<newValue?.length;i++){
      SpuMenuSortInput.push({ spuMenuId:newValue[i]?.id, sortorder:i });
    }
    //此处是合并
    if(destination&&source){
      if(destination?.label?.id!=="EMPTY"){
        console.log('========此处是一个在EMPTY中的拖到组内')
        if(source?.label?.id!=="EMPTY"){
          //这个是判断，将一个组内的选项移到另外一个组内
          console.log('========将一个组内的选项移到另外一个组内')
        }else{
          //将一个空的移入到组内
          console.log('========将一个空的移入到组内')
        }
      }else{
        console.log('========此处两个EMPTY合并成一个组')
      }
    }
    //此处是移出
    if(_.isEmpty(destination)&&source){
      console.log('========此处是将组内的移出')
    }
    //还有将一个组内的移到另外一个组内

    //此处是排序
    if(_.isEmpty(destination)&&_.isEmpty(source)){
      console.log('========此处是排序')
    }
  }
  return (
    <div className="App">
      <Board initial={data} passEditEvent={editEvent} handleSort={handleSort}/>
		</div>
  );
}

export default App;
