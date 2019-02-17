import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const ItemCard = styled.div`
  font-size: 2rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eee;
  min-height: 100px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 25px;
  border: 2px solid #222;
  cursor: pointer;

  &:hover {
    background: #d6d6d6;
  }

  h2 {
    font-size: 3rem;
    color: ${props => (props.low ? '#D72B44' : '#3AA74C')};
  }
  p {
    font-weight: 300;
  }
  img {
    height: 100px;
    margin: 10px 0;
  }

  /* React-Transition-Group Styles */

  &.in-appear {
    transform: rotateX(-90deg);
    transform-origin: top;
  }
  &.in-appear-active {
    transform: rotateX(0deg);
    transform-origin: top;
    transition: transform 0.4s ease;
  }
  &.in-enter-done {
    transform: rotateX(0deg)
    transform-origin: top;;
  }
`;

const Item = props => (
  <CSSTransition in={true} timeout={400} classNames="in" appear={true}>
    <ItemCard low={props.data.min_quan > props.data.amount ? 1 : 0}>
      {/* The above is to avoid React Router error */}
      <h2>
        {props.data.item.charAt(0).toUpperCase() + props.data.item.slice(1)}
      </h2>
      <img
        src={
          props.data.amount > props.data.min_quan
            ? props.data.color_img
            : props.data.bw_img
        }
        alt={props.data.item}
      />
      <p>Quantity: {props.data.amount}</p>
      <p>
        Unit:{' '}
        {props.data.unit.charAt(0).toUpperCase() + props.data.unit.slice(1)}
      </p>
    </ItemCard>
  </CSSTransition>
);

export default Item;
