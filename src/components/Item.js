import React from 'react';

const Item = props => (
  <div>
    <h2>{props.data.item}</h2>
    <p>
      {props.data.amount} {props.data.unit}
    </p>
    <p>{props.data.category}</p>
  </div>
);

export default Item;
