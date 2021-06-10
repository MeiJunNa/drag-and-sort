import React from "react";
import './item.css'
export default class QuoteItem extends React.PureComponent {
  render() {
    const { quote, provided } = this.props;

    return (
      <div className='Content'
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <div className='Footer'>
          <small className='QuoteId'>id:{quote.id}</small>
        </div>
      </div>
    );
  }
}
