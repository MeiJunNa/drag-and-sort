import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Button, Divider, } from 'antd';
import _ from 'lodash';
import dragIcon from './drag.png';
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
          <div
            key={quote.id}
            // isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          >
            <div className='Content'
              ref={dragProvided.innerRef}
              {...dragProvided.draggableProps}
              {...dragProvided.dragHandleProps}>
              <div className={_.isEmpty(quote?.label) ? 'optionListItem' : 'optionListLabelItem'}>
                <Row className='optionListRow'>
                  <Col xs={24} sm={2} style={{ textAlign: 'center', }}>
                    <img src={dragIcon} alt='no'></img>
                  </Col>
                  <Col xs={24} sm={4}>
                    <span className='optionListTitle'>{quote?.nameIntl}</span>
                    {!_.isEmpty(quote?.label)&&<span style={{ marginLeft: 16, }} className='optionListEdit' onClick={() => console.log('编辑事件')}>编辑</span>}
                  </Col>
                  {_.isEmpty(quote?.label)&&<Col xs={24} sm={{ span: 2, offset: 16 }}>
                      <span className='optionListEdit' onClick={() => console.log('编辑事件')}>编辑</span>
                  </Col>}
                </Row>
                {_.isEmpty(quote?.label)&&<Row className='optionListRow'>
                  <Divider className='DividerWrap' />
                </Row>}
                <Row className='optionListRow'>
                  <Col xs={24} sm={{ span: 22, offset: 2 }}>
                    <Button onClick={() => console.log('新增事件')} style={{ marginTop: 16, }}>
                      新增按钮
                    </Button>
                  </Col>
                </Row>
                {!_.isEmpty(quote?.label)&&<Row className='optionListRow'>
                  <Col xs={24} sm={{ span: 20, offset: 2 }}>
                    <Divider className='DividerWrap' />
                  </Col>
                </Row>}
              </div>
            </div>
          </div>
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
