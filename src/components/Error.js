import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { clearError } from '../redux/actions';

const ErrorContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(238, 238, 238, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledError = styled.div`
  position: relative;
  width: 40vw;
  height: 25vw;
  padding: 0 10px;
  text-align: center;
  background: rgba(238, 238, 238, 0.9);
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    position: absolute;
    top: 10px;
    left: 50%;
    font-size: 1.5em;
    transform: translateX(-50%);
  }

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5em;
    cursor: pointer;

    &:active {
      transform: translateY(2px);
    }
  }
`;

class Error extends React.Component {
  handleClearError = e => {
    this.props.clearError();
    this.props.history.push('/auth');
  };
  render() {
    return (
      <ErrorContainer>
        <StyledError>
          <span className="fas fa-times" onClick={this.handleClearError} />
          <h2>Error</h2>
          <p>
            {this.props.error.charAt(0).toUpperCase() +
              this.props.error.slice(1)}
          </p>
        </StyledError>
      </ErrorContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { clearError }
)(Error);
