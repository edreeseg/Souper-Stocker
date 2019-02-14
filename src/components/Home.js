import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getInventory, addItem } from '../redux/actions';
import Item from './Item';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Inventory = styled.section`
  width: 60%;
  margin: 0 auto;
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
    if (!this.props.inventory.length) this.props.getInventory(1); // Will be the user's ID.
  }
  render() {
    return (
      <>
        <Container>
          <section>
            <div />
            <div />
          </section>
          <Inventory>
            {this.props.inventory.map(item => (
              <Item key={item.item} data={item} />
            ))}
          </Inventory>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    kitchen: state.kitchen,
    inventory: state.inventory,
  };
};

export default connect(
  mapStateToProps,
  { getInventory, addItem }
)(Home);
