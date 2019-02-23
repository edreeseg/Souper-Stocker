import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Loading from '../Loading';
import { deleteItem, updateItem } from '../../redux/actions';

const ItemCard = styled.div`
  font-weight: bold;
  font-size: 0.75em;
  text-align: center;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eee;
  min-height: 250px;
  padding: 10px;
  margin-bottom: 20px;
  align-self: flex-start;
  border: 2px solid #222;
  cursor: pointer;

  &:hover {
    animation: hoverItem 0.2s ease forwards;
  }

  @keyframes hoverItem {
    100% {
      background: #d6d6d6;
    }
  }

  h2 {
    color: ${props => (props.low ? '#D72B44' : '#3AA74C')};
    font-size: 1.25em;
  }
  img {
    height: 100px;
    margin: 10px 0;
  }
  .low-img {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  /* React-Transition-Group Styles */

  &.in-appear {
    opacity: 0;
  }
  &.in-appear-active {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  &.in-enter-done {
    opacity: 1;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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
  cancelEdit = e => {
    e.stopPropagation();
    this.setState({
      editing: false,
      item: this.props.data.item,
      amount: this.props.data.amount,
      unit: this.props.data.unit,
    });
  };
  render() {
    return (
      <CSSTransition in={true} timeout={300} classNames="in" appear={true}>
        <ItemCard
          low={this.props.data.min_quan >= this.props.data.amount ? 1 : 0}
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
              <ButtonContainer>
                <button type="button" onClick={this.cancelEdit}>
                  Cancel
                </button>
                <button>Submit</button>
              </ButtonContainer>
            </UpdateForm>
          ) : (
            <>
              {this.props.updating ? (
                <Loading />
              ) : (
                <>
                  <h2>
                    {this.props.data.item.charAt(0).toUpperCase() +
                      this.props.data.item.slice(1)}
                  </h2>
                  <img
                    src={
                      this.props.data.amount <= this.props.data.min_quan &&
                      this.props.data.bw_img
                        ? this.props.data.bw_img
                        : this.props.data.color_img
                    }
                    className={
                      this.props.data.amount > this.props.data.min_quan
                        ? null
                        : 'low-img'
                    }
                    alt={this.props.data.item}
                  />
                  <p>Quantity: {this.props.data.amount}</p>
                  <p>Unit: {this.props.data.unit}</p>
                </>
              )}
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
