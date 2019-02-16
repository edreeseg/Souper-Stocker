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
  width: 80%;
  margin: 10px auto;
  display: flex;
`;

const InvPanel = styled.div`
  width: 50%;
  height: 50vh;
  border: 1px solid black;
`;

// name, title, username, password, role_id, loc_id - user schema

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.inventory.length) this.props.getInventory(1); // Will be the user's ID.
  }
  render() {
    return (
      <Container>
        <Inventory />
      </Container>
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
