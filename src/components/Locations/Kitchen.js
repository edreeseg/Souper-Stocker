import React from 'react';
import styled from 'styled-components';

const StyledKitchen = styled.div`
  width: 30%;
  height: 100px;
  border: 1px solid black;
`;

class Kitchen extends React.Component {
  render() {
    return (
      <StyledKitchen>
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

export default Kitchen;
