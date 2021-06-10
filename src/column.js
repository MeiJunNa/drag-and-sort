import React from "react";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./QuoteList";
import './column.css'

function Column(props) {
  const title = props.title;
  const quotes = props.quotes;
  const index = props.index;
  console.log('========index',index)
  return (
    <Draggable draggableId={title} index={index}>
      {/* 我在想如果设置一个宽度高度百分百，那么往外面拖放的时候，是不是就放在这个盒子里面 */}
      {(provided, snapshot) => (
        <div ref={provided.innerRef} 
        {...provided.draggableProps} 
        className='draggableWrap'>
          <div className='Header' >
            <div className='Title'
              {...provided.dragHandleProps}
            >
              {title}
            </div>
          </div>
          <QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? 'red' : null
            }}
            quotes={quotes}
            internalScroll={props.isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
