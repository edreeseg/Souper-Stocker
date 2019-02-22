import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledKitchen = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #464646;
  color: #eee;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    animation: kitchenHover 0.2s ease forwards;
  }

  @keyframes kitchenHover {
    100% {
      background: #535353;
    }
  }

  h2 {
    font-size: 2rem;
  }
`;

class Kitchen extends React.Component {
  state = {
    signedUp: false,
  };
  handleSignUp = e => {
    this.setState({ signedUp: true });
    setTimeout(() => this.setState({ signedUp: false }), 7000);
  };
  render() {
    return this.state.signedUp ? (
      <StyledKitchen>
        <h2>
          {this.props.user.name},<br />
          Thank you for your generosity. An email has been sent to the address
          associated with "{this.props.user.username}" containing further
          instructions.
        </h2>
      </StyledKitchen>
    ) : (
      <StyledKitchen onClick={this.handleSignUp}>
        <h4>{this.props.data.name}</h4>
        <p>{this.props.data.address}</p>
        {this.props.data.address2 ? <p>{this.props.data.address2}</p> : null}
        <p>
          {this.props.data.city}, {this.props.data.state} {this.props.data.zip}
        </p>
      </StyledKitchen>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Kitchen);
