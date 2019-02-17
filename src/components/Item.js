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
  }

  /* React-Transition-Group Styles */

  &.in-appear {
    transform: scale(0, 0) rotateX(-360deg);
  }
  &.in-appear-active {
    transform: scale(1, 1) rotateX(0deg);
    transition: transform 0.5s linear;
  }
  &.in-enter-done {
    transform: scale(1, 1) rotateX(0deg);
  }
`;

const Item = props => (
  <CSSTransition in={true} timeout={500} classNames="in" appear={true}>
    <ItemCard>
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
