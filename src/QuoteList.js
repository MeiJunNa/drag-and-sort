import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import QuoteItem from "./quote-item";
import './QuoteList.css'

class InnerQuoteList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.quotes !== this.props.quotes) {
      return true;
    }

    return false;
  }

  render() {
    return this.props.quotes.map((quote, index) => (
      <Draggable
        key={quote.id}
        draggableId={quote.id}
        index={index}
        shouldRespectForceTouch={false}
      >
        {(dragProvided, dragSnapshot) => (
          <QuoteItem
            key={quote.id}
            quote={quote}
            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
            provided={dragProvided}
          />
        )}
      </Draggable>
    ));
  }
}

class InnerList extends React.Component {
  render() {
    const { quotes, dropProvided } = this.props;
    const title = this.props.title ? <div className='Title'>{this.props.title}</div> : null;

    return (
      <div>
        {title}
        <div className='DropZone' ref={dropProvided.innerRef}>
          <InnerQuoteList quotes={quotes} />
        </div>
      </div>
    );
  }
}

export default class QuoteList extends React.Component {
  static defaultProps = {
    listId: "LIST"
  };
  render() {
    const {
      ignoreContainerClipping,
      internalScroll,
      scrollContainerStyle,
      isDropDisabled,
      isCombineEnabled,
      listId,
      listType,
      style,
      quotes,
      title
    } = this.props;

    return (
      <Droppable
        droppableId={listId}
        type={listType}
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
        isCombineEnabled={isCombineEnabled}
      >
        {(dropProvided) => (
          <div
            className='Wrapper'
            {...dropProvided.droppableProps}
          >
            {internalScroll ? (
              <div className='ScrollContainer' style={scrollContainerStyle}>
                <InnerList
                  quotes={quotes}
                  title={title}
                  dropProvided={dropProvided}
                />
              </div>
            ) : (
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            )}
          </div>
        )}
      </Droppable>
    );
  }
}
