import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;
`;

class MyAccount extends React.Component {
  render() {
    return <Container>{this.props.user.name}'s page.</Container>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error,
    loading: state.loading,
  };
};

export default connect(
  mapStateToProps,
  {}
)(MyAccount);
