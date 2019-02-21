import React from 'react';
import styled from 'styled-components';

const StyledLoad = styled.h1`
  color: ${props => props.color || 'inherit'};
  font-size: ${props => props.size || 'inherit'};
  font-weight: 300;
`;

class Loading extends React.Component {
  state = {
    text: 'Loading',
  };
  componentDidMount() {
    this.animation = setInterval(
      () =>
        this.setState(prevState => {
          return {
            text: prevState.text.includes('...')
              ? 'Loading'
              : prevState.text + '.',
          };
        }),
      300
    );
  }
  componentWillUnmount() {
    clearInterval(this.animation);
  }
  render() {
    return (
      <StyledLoad color={this.props.color} size={this.props.size}>
        {this.state.text}
      </StyledLoad>
    );
  }
}

export default Loading;
