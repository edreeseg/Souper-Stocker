import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLocations } from '../../redux/actions';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;

  section {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Kitchen = styled.div`
  width: 30%;
  height: 100px;
  border: 1px solid black;
`;

class Locations extends React.Component {
  componentDidMount() {
    this.props.getLocations(this.props.user);
  }
  render() {
    return (
      <Container>
        <section>
          {this.props.locations.map(x => (
            <Kitchen>
              <h4>{x.name}</h4>
              <p>{x.address}</p>
              {x.address2 ? <p>{x.address2}</p> : null}
              <p>
                {x.city}, {x.state} {x.zip}
              </p>
            </Kitchen>
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
