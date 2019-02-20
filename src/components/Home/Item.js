import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { deleteItem, updateItem } from '../../redux/actions';

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
    transform: rotateX(0deg);
    transform-origin: top;
  }
`;

const UpdateForm = styled.form`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 100%;
  }
`;

class Item extends React.Component {
  state = {
    editing: false,
    item: this.props.data.item,
    amount: this.props.data.amount,
    unit: this.props.data.unit,
  };
  handleClick = e => {
    switch (this.props.currentOperation) {
      case 'PUT':
        return this.setState({ editing: true });
      case 'DELETE':
        return this.props.deleteItem(this.props.data.id, this.props.user);
      default:
        return;
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleUpdate = e => {
    e.preventDefault();
    const [item, amount, unit] = [
      this.state.item,
      this.state.amount,
      this.state.unit,
    ];
    this.props.updateItem(
      this.props.data.id,
      { item, amount, unit },
      this.props.user
    );
    this.setState({ editing: false });
  };
  render() {
    return (
      <CSSTransition in={true} timeout={400} classNames="in" appear={true}>
        <ItemCard
          low={this.props.data.min_quan > this.props.data.amount ? 1 : 0}
          onClick={this.handleClick}
        >
          {/* The above is to avoid React Router error */}
          {this.state.editing ? (
            <UpdateForm onSubmit={this.handleUpdate}>
              <input
                type="text"
                placeholder="Item Name"
                name="item"
                value={this.state.item}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder="Amount"
                name="amount"
                value={this.state.amount}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder="Unit"
                name="unit"
                value={this.state.unit}
                onChange={this.handleChange}
              />
              <button>Submit</button>
            </UpdateForm>
          ) : (
            <>
              <h2>
                {this.props.data.item.charAt(0).toUpperCase() +
                  this.props.data.item.slice(1)}
              </h2>
              <img
                src={
                  this.props.data.amount > this.props.data.min_quan
                    ? this.props.data.color_img
                    : this.props.data.bw_img
                }
                alt={this.props.data.item}
              />
              <p>Quantity: {this.props.data.amount}</p>
              <p>
                Unit:{' '}
                {this.props.data.unit.charAt(0).toUpperCase() +
                  this.props.data.unit.slice(1)}
              </p>
            </>
          )}
        </ItemCard>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentOperation: state.currentOperation,
  };
};

export default connect(
  mapStateToProps,
  { deleteItem, updateItem }
)(Item);