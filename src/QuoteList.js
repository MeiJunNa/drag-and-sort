import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Button, Divider, } from 'antd';
import dragIcon from './drag.png';
import './QuoteList.css'

function QuoteList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId,
    listType,
    quotes,
    title
  } = props;

  function InnerList(props) {
    const { quotes, dropProvided } = props;
    return (
      <div>
        <div className='DropZone' ref={dropProvided.innerRef}>
          <InnerQuoteList quotes={quotes} />
        </div>
      </div>
    );
  }


  function handleEdit(quote) {
    props.passEditEvent(quote);
  }

  function InnerQuoteList(props) {
    return props.quotes.map((quote, index) => (
      <Draggable
        key={quote.id}
        draggableId={quote.id}
        index={index}
        shouldRespectForceTouch={false}
      >
        {(dragProvided) => (
          <div
            key={quote.id}>
            <div className='Content'
              ref={dragProvided.innerRef}
              {...dragProvided.draggableProps}
              {...dragProvided.dragHandleProps}>
              <div className={quote?.label?.id === "EMPTY" ? 'optionListItem' : 'optionListLabelItem'}>
                <Row className='optionListRow'>
                  <Col xs={24} sm={2} style={{ textAlign: 'center', }}>
                    <img src={dragIcon} alt='no'></img>
                  </Col>
                  <Col xs={24} sm={4}>
                    <span className='optionListTitle'>{quote?.nameIntl}</span>
                    {quote?.label?.id !== "EMPTY" && <span style={{ marginLeft: 16, }} className='optionListEdit' onClick={() => console.log('编辑事件')}>编辑</span>}
                  </Col>
                  {quote?.label?.id === "EMPTY" && <Col xs={24} sm={{ span: 2, offset: 16 }}>
                    <span className='optionListEdit' onClick={() => handleEdit(quote)}>编辑</span>
                  </Col>}
                </Row>
                {quote?.label?.id === "EMPTY" && <Row className='optionListRow'>
                  <Divider className='DividerWrap' />
                </Row>}
                <Row className='optionListRow'>
                  <Col xs={24} sm={{ span: 22, offset: 2 }}>
                    <Button onClick={() => console.log('新增事件')} style={{ marginTop: 16, }}>
                      新增按钮
                    </Button>
                  </Col>
                </Row>
                {quote?.label?.id !== "EMPTY" && <Row className='optionListRow'>
                  <Col xs={24} sm={{ span: 20, offset: 2 }}>
                    {index + 1 !== props.quotes?.length && <Divider className='DividerWrap' />}
                  </Col>
                </Row>}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

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
              {console.log('=====quotes', quotes)}
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
export default QuoteList;
