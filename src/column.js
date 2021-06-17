import React, { useState, useEffect, } from "react";
import { Draggable } from "react-beautiful-dnd";
import _ from 'lodash';
import { Row, Col, Divider, } from 'antd';
import "antd/dist/antd.css";
import { MenuOutlined, } from '@ant-design/icons';
import QuoteList from "./QuoteList";
import './column.css'

function Column(props) {
  let { title, quotes, index, isScrollable } = props;
  const [list, setList] = useState([]);
  const [groupList, setGroupList] = useState(undefined);
  useEffect(() => {
    if (quotes) {
      let filterNoLabel = quotes?.filter(menu => _.isEmpty(menu?.label));
      setList(filterNoLabel);
      let filterHasLabel = quotes?.filter(menu => !_.isEmpty(menu?.label));
      setGroupList(filterHasLabel);
    }
  }, [quotes]);

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}
          {...provided.draggableProps}
          className='draggableWrap'>
          <div className='Header' >
            <div className='Title'
              {...provided.dragHandleProps}
            >
              {groupList?.length > 0 &&
                <div className='optionListTitle'>
                  <Row className='optionListRow'
                  >
                    <Col xs={24} sm={2} style={{ textAlign: 'center', }}>
                      <MenuOutlined className='dragIcon' />
                    </Col>
                    <Col xs={24} sm={4}>
                      <span className='optionListTitle'>{groupList[0]?.label?.nameIntl}</span>
                    </Col>
                    <Col xs={24} sm={{ span: 2, offset: 16 }}>
                      <span className='optionListEdit' onClick={() => console.log('编辑事件')}>编辑</span>
                    </Col>
                  </Row>
                  <Divider />
                </div>}
            </div>
          </div>

          <QuoteList
            listId={title}
            listType="QUOTE"
            quotes={groupList?.length > 0 ? groupList : list?.length > 0 ? list : quotes}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
            passEditEvent={props.passEditEvent}
          />

        </div>
      )}
    </Draggable>
  );
}

export default Column;
