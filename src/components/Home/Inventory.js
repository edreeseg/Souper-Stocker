import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import Item from './Item';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import inventoryBG from '../../assets/qbkls.png';

const Container = styled.section`
  height: calc(100% - 45px);
  width: 100%;
  display: flex;
  align-items: center;
  background: ${props => `url(${props.bg})`};
  /* Background pattern from Toptal Subtle Patterns */
`;

const StyledInventory = styled.section`
  width: 60%;
  min-height: 90%;
  margin: 0 auto;
  background: rgba(8, 43, 50, 0.8);
  border: 1px solid #222;
  padding: 20px;
  padding-top: 90px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;

  span {
    position: absolute;
    color: #eee;
    top: 10px;
    right: 10px;
    font-size: 3.5rem;
    cursor: pointer;

    &:active {
      transform: translateY(2px);
    }
  }
  /* React Transition Group styles */

  &.out-enter {
    * {
      opacity: 1;
      pointer-events: none;
    }
  }
  &.out-enter-active {
    * {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
  }
  &.out-enter-done {
    * {
      opacity: 0;
      pointer-events: none;
    }
  }
  .title {
    font-size: 6rem;
    color: #eee;
    position: absolute;
    top: 10px;
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 3px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
  }
`;

export const Card = styled.div`
  font-size: 2rem;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eee;
  min-height: 100px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid #222;
  cursor: pointer;

  &:hover {
    animation: hoverText 0.2s ease forwards;
  }

  @keyframes hoverText {
    100% {
      background: #363636;
      color: #eee;
    }
  }

  h2 {
    font-size: 3rem;
  }
`;

class Inventory extends React.Component {
  state = {
    current: null,
    changing: false,
  };
  handleSelection = category => e => {
    this.setState({ changing: true });
    setTimeout(() => {
      this.setState({ current: category, changing: false });
    }, 300);
  };
  render() {
    return (
      <Container bg={inventoryBG}>
        <CSSTransition in={this.state.changing} timeout={300} classNames="out">
          <StyledInventory>
            <h1 className="title">{this.state.current || 'Categories'}</h1>
            {this.props.loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Loading color="#eee" size="5rem" />
              </div>
            ) : this.state.current ? (
              <>
                <span
                  className="fas fa-undo-alt"
                  onClick={e => this.setState({ current: null })}
                />
                {this.props.inventory
                  .filter(x => x.category_id === this.state.current)
                  .map(x => (
                    <Item
                      key={x.id}
                      data={x}
                      updating={this.props.updating === x.id ? 1 : 0}
                    />
                  ))
                  .sort((a, b) =>
                    a.props.data.item.toLowerCase() >=
                    b.props.data.item.toLowerCase()
                      ? 1
                      : -1
                  )}
              </>
            ) : (
              this.props.categories.map(x => (
                <Card key={x} onClick={this.handleSelection(x)}>
                  <h2>{x}</h2>
                </Card>
              ))
            )}
          </StyledInventory>
        </CSSTransition>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    updating: state.updating,
  };
};

export default connect(mapStateToProps)(Inventory);
