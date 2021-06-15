import React, { useState, useEffect, useRef, } from 'react';
import "antd/dist/antd.css";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board(props) {
  const isCombineEnabled = false;
  const dragResult = useRef(undefined);
  const [columns, setColumns] = useState(undefined);
  const [ordered, setOrdered] = useState(undefined);

  useEffect(() => {
    if (props.initial) {
      setColumns(props.initial);
      setOrdered(Object.keys(props.initial));
    }
  }, [props.initial]);

  useEffect(() => {
    if (dragResult.current) {
      props.handleSort(columns,ordered);
    }
  }, [dragResult.current]);

  function onDragEnd(result) {
    dragResult.current = result;
    // 此处是拖动事件的事件处理
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const newColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      setColumns(newColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const newOrdered = reorder(
        ordered,
        source.index,
        destination.index
      );
      setOrdered(newOrdered);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });
    setColumns(data.quoteMap);
  };
  const { containerHeight } = props;
  const board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      //此行代码决定是垂直布局还是水平布局
      // direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
      isCombineEnabled={isCombineEnabled}
    >
      {provided => (
        <div
          ref={provided.innerRef} {...provided.droppableProps}>
          {ordered?.map((key, index) => {
            return (
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={props.withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                passEditEvent={props.passEditEvent}
              />
            )
          })}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {containerHeight ? (
        <div height={containerHeight}>{board}</div>
      ) : (
        board
      )}
    </DragDropContext>
  );
}
export default Board;
