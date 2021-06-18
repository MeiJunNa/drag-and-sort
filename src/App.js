import React, { useState, useEffect, } from 'react';
import _ from 'lodash';
import Board from './Board';
import './App.css';

function App() {
  const [list, setList] = useState([
    { id: "00001", nameIntl: '列表01', },
    { id: "00002", nameIntl: '列表02', },
    { id: "01", nameIntl: '列表1', label: { id: "labelid1", nameIntl: "选项组", descriptionIntl: "描述" } },
    { id: "02", nameIntl: '列表2', label: { id: "labelid1", nameIntl: "选项组", descriptionIntl: "描述" } },
    { id: "03", nameIntl: '列表3', label: { id: "labelid2", nameIntl: "选项组2", descriptionIntl: "描述2" } },
    { id: "04", nameIntl: '列表4', label: { id: "labelid2", nameIntl: "选项组2", descriptionIntl: "描述2" } },
  ]);
  const [groupList, setGroupList] = useState(undefined);

  useEffect(() => {
    let newList = _.clone(list);
    //我们默认，有label的是已经合并好组，没有label的，是单独的项；将所有单独的项假设为有共同的组id为"EMPTY"
    if (!_.isEmpty(newList)) {
      for (let i = 0; i < newList.length; i++) {
        if (_.isEmpty(newList[i]?.label)) {
          newList[i].label = {
            id: "EMPTY",
          }
        }
      }
    }
    let newPassObject = _.groupBy(newList, 'label.id');
    setGroupList(newPassObject);
  }, [list]);

  function editEvent(passValue) {
    console.log('传递过来的值，在此处做处理', passValue)
  }

  function handleSort(columns, ordered, source, destination,) {
    console.log('=========columns,ordered,source,destination,', columns, ordered, source, destination,)
    //此处对值进行排序，并作为参数传入接口
    let newValue = (_.orderBy(Object.entries(columns), [([key]) => ordered.findIndex(some => some === key)], ['asc']));
    console.log('=======newValue', newValue)
    let SpuMenuSortInput = [];
    for (let i = 0; i < newValue?.length; i++) {
      SpuMenuSortInput.push({ spuMenuId: newValue[i]?.id, sortorder: i });
    }
    //此处是合并
    if (destination && source) {
      if (destination?.label?.id !== "EMPTY") {
        let SpuMenuSortInput = [];
        for (let i = 0; i < newValue?.length; i++) {
          let newMenuArray = newValue[i][1];
          let spuMenus = [];
          for (let j = 0; j < newMenuArray?.length; j++) {
            let newValue = newMenuArray[j];
            newValue.sortorder = j;
            if (newValue?.id === source?.id) {
              newValue.label = destination?.label;
            }
            spuMenus.push(newValue);
          }
          SpuMenuSortInput.push(...spuMenus)
        }
        setList(SpuMenuSortInput);
        if (source?.label?.id !== "EMPTY") {
          //这个是判断，将一个组内的选项移到另外一个组内
          console.log('======将一个组内的选项移到另外一个组内')
        } else {
          //将一个空的移入到组内
          console.log('========将一个空的移入到组内')
        }
      } else {
        console.log('========此处两个EMPTY合并成一个组')
        let SpuMenuSortInput = [];
        for (let i = 0; i < newValue?.length; i++) {
          let newMenuArray = newValue[i][1];
          let spuMenus = [];
          for (let j = 0; j < newMenuArray?.length; j++) {
            let newValue = newMenuArray[j];
            newValue.sortorder = j;
            if (newValue?.id === source?.id || newValue?.id === destination?.id) {
              newValue.label = { id: "labelidCombine", nameIntl: "EMPTY合并成组", descriptionIntl: "EMPTY合并的描述" };
            }
            spuMenus.push(newValue);
          }
          SpuMenuSortInput.push(...spuMenus)
        }
        setList(SpuMenuSortInput);
      }
    }

    //此处是移出
    if (_.isEmpty(destination) && source) {
      console.log('========此处是将组内的移出')
      let SpuMenuSortInput = [];
      for (let i = 0; i < newValue?.length; i++) {
        let newMenuArray = newValue[i][1];
        let spuMenus = [];
        for (let j = 0; j < newMenuArray?.length; j++) {
          let newValue = newMenuArray[j];
          newValue.sortorder = j;
          if (newValue?.id === source?.id) {
            newValue.label = {};
          }
          spuMenus.push(newValue);
        }
        SpuMenuSortInput.push(...spuMenus)
      }
      setList(SpuMenuSortInput);
    }

    //此处是排序
    if (_.isEmpty(destination) && _.isEmpty(source)) {
      console.log('========此处是排序')
      let SpuMenuSortInput = [];
      for (let i = 0; i < newValue?.length; i++) {
        let newMenuArray = newValue[i][1];
        let spuMenus = [];
        for (let j = 0; j < newMenuArray?.length; j++) {
          let newValue = newMenuArray[j];
          newValue.sortorder = j;
          spuMenus.push(newValue);
        }
        SpuMenuSortInput.push(...spuMenus)
      }
      setList(SpuMenuSortInput);
    }
  }
  return (
    <div className="App">
      <Board initial={groupList} passEditEvent={editEvent} handleSort={handleSort} />
    </div>
  );
}

export default App;
