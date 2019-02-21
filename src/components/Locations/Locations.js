import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLocations } from '../../redux/actions';
import Kitchen from './Kitchen';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;

  section {
    display: flex;
    flex-wrap: wrap;
  }
`;

class Locations extends React.Component {
  componentDidMount() {
    this.props.getLocations(this.props.user);
  }
  render() {
    return (
      <Container>
        <section>
          {this.props.locations.map(kitchen => (
            <Kitchen key={kitchen.id} data={kitchen} />
          ))}
        </section>
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
