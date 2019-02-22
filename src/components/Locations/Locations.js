import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLocations } from '../../redux/actions';
import Kitchen from './Kitchen';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;
`;

const Kitchens = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const TopSection = styled.section`
  display: flex;
  justify-content: space-around;

  div {
    width: 40%;
    height: 200px;
    border: 1px solid black;
  }

  img {
    width: 40%;
    align-self: center;
  }
`;

class Locations extends React.Component {
  componentDidMount() {
    if (this.props.user) this.props.getLocations(this.props.user);
    else this.props.history.push('/');
  }
  render() {
    return (
      <Container>
        <TopSection>
          <div />
          <img src="https://i.imgur.com/Xo9PMVY.jpg" alt="bowl of soup" />
        </TopSection>
        <Kitchens>
          {this.props.locations.map(kitchen => (
            <Kitchen key={kitchen.id} data={kitchen} />
          ))}
        </Kitchens>
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
