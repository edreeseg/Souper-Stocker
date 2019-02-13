import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getKitchen } from '../redux/actions';
import Item from './Item';

const Inventory = styled.section`
  width: 60%;
  margin: 0 auto;
  margin-top: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 40%;
    margin-bottom: 20px;
    border: 1px solid black;
  }
`;

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.kitchen) this.props.getKitchen();
  }
  render() {
    return (
      <>
        <Inventory>
          {this.props.kitchen
            ? this.props.kitchen.inventory.map(item => (
                <Item key={item.item} data={item} />
              ))
            : null}
        </Inventory>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    kitchen: state.kitchen,
  };
};

export default connect(
  mapStateToProps,
  { getKitchen }
)(Home);
