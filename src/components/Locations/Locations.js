import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLocations } from '../../redux/actions';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;
`;

class Locations extends React.Component {
  componentDidMount() {
    this.props.getLocations(this.props.user);
  }
  render() {
    return (
      <Container>
        {this.props.locations.map(x => (
          <div>{x.name}</div>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    locations: state.locations,
    error: state.error,
    loading: state.loading,
  };
};

export default connect(
  mapStateToProps,
  { getLocations }
)(Locations);
