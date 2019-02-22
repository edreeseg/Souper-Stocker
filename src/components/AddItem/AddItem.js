import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { addItem } from '../../redux/actions';

const Container = styled.section`
  width: 100%;
  height: calc(100% - 45px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemForm = styled.form`
  width: 60%;
  height: 80vh;
  border: 2px solid #222;
`;

class AddItem extends React.Component {
  state = {
    item: '',
    amount: '',
    unit: '',
    min_quan: '',
    bw_img: '',
    color_img: '',
    category_id: '',
    error: '',
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentOperation !== 'POST') this.props.history.push('/');
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleAddItem = e => {
    e.preventDefault(); // Location gets sent with user object.
    const [item, amount, unit, min_quan, bw_img, color_img, category_id] = [
      this.state.item,
      this.state.amount,
      this.state.unit,
      this.state.min_quan,
      this.state.bw_img,
      this.state.color_img,
      this.state.category_id,
    ];
    if (
      !item ||
      !amount ||
      !unit ||
      !min_quan ||
      !bw_img ||
      !color_img ||
      !category_id
    ) {
      return this.setState({ error: 'Please provide values for all fields.' });
    }
    this.props.addItem(
      {
        item,
        amount: Number(amount),
        unit,
        min_quan,
        bw_img,
        color_img,
        category_id,
      },
      this.props.user
    );
    this.setState({
      item: '',
      amount: '',
      unit: '',
      min_quan: '',
      bw_img: '',
      color_img: '',
      category_id: '',
    });
  };

  render() {
    return (
      <Container>
        <ItemForm onSubmit={this.handleAddItem}>
          <input
            type="text"
            placeholder="Item Name"
            name="item"
            onChange={this.handleChange}
            value={this.state.item}
          />
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            onChange={this.handleChange}
            value={this.state.amount}
          />
          <input
            type="text"
            placeholder="Minimum Quantity"
            name="min_quan"
            onChange={this.handleChange}
            value={this.state.min_quan}
          />
          <input
            type="text"
            placeholder="Unit"
            name="unit"
            onChange={this.handleChange}
            value={this.state.unit}
          />
          <input
            type="text"
            placeholder="Black and White Image URL"
            name="bw_img"
            onChange={this.handleChange}
            value={this.state.bw_img}
          />
          <input
            type="text"
            placeholder="Color Image URL"
            name="color_img"
            onChange={this.handleChange}
            value={this.state.color_img}
          />
          <select
            name="category_id"
            onChange={this.handleChange}
            value={this.state.category}
          >
            <option value="" disabled hidden>
              Category:
            </option>
            <option value={1}>Fruit</option>
            <option value={2}>Dry Goods</option>
            <option value={3}>Dairy</option>
            <option value={4}>Vegetables</option>
            <option value={5}>Canned Goods</option>
            <option value={6}>Meat</option>
            <option value={7}>Seafood</option>
            <option value={8}>Staples</option>
            <option value={9}>Baked Goods</option>
            <option value={10}>Frozen</option>
            <option value={11}>Other</option>
          </select>
          <button>Add Item</button>
        </ItemForm>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    inventory: state.inventory,
    error: state.error,
    loading: state.loading,
    currentOperation: state.currentOperation,
  };
};

export default connect(
  mapStateToProps,
  { addItem }
)(AddItem);
