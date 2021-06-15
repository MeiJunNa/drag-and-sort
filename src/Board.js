import React, { Component } from "react";
import "antd/dist/antd.css";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class Board extends Component {
  static defaultProps = {
    isCombineEnabled: false
  };

  state = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial)
  };

  boardRef;

  onDragEnd = result => {
    console.log('======result',result);
    // 此处是拖动事件的事件处理
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column = this.state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      this.setState({ columns });
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
      const ordered = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination
    });

    this.setState({
      columns: data.quoteMap
    });
  };

  render() {
    const columns = this.state.columns;
    const ordered = this.state.ordered;
    const { containerHeight } = this.props;
    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        //此行代码决定是垂直布局还是水平布局
        // direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={this.props.isCombineEnabled}
      >
        {provided => (
          <div
          ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key, index) => {
              return(
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={this.props.withScrollableColumns}
                isCombineEnabled={this.props.isCombineEnabled}
              />
            )})}
          </div>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <div height={containerHeight}>{board}</div>
          ) : (
            board
          )}
        </DragDropContext>
      </React.Fragment>
    );
  }
}
export default Board;
