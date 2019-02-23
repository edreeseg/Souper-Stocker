import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLocations } from '../../redux/actions';
import Kitchen from './Kitchen';

const Container = styled.section`
  min-height: calc(100% - 45px);
  width: 90%;
  margin: 0 auto;
  margin-bottom: 75px;
`;

const Kitchens = styled.section`
  display: flex;
  flex-direction: column;
  width: 36.5%;
`;

const TopSection = styled.section`
  display: flex;
  justify-content: space-between;
  height: 50%;
  margin-top: 20px;

  div {
    height: 100%;
    width: 45%;
    padding: 5% 0;
    text-align: center;

    h2 {
      font-size: 1.5em;
      font-weight: 300;
      margin-bottom: 20px;
    }
    p {
      font-size: 1.1em;
      font-weight: 300;
    }
  }

  img {
    align-self: center;
    width: 40.5%;
  }
`;

const MidSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;

  section {
    height: 100%;
    width: 40.5%;
  }

  img {
    max-height: 100%;
    width: 45%;
    align-self: flex-start;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  border-top: 2px solid #222;
  background: #464646;
  color: #eee;
  padding: 10px;

  section {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    div {
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      &:first-child {
        width: 60%;
      }
      &:last-child {
        width: 30%;
      }
    }
  }

  h3 {
    margin-bottom: 5px;
    font-size: 1.1em;
  }

  p {
    font-size: 0.7em;
    margin-bottom: 5px;
  }
`;

class Locations extends React.Component {
  state = {
    newsletter: '',
  };
  componentDidMount() {
    if (this.props.user) this.props.getLocations(this.props.user);
    else this.props.history.push('/');
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <>
        <Container>
          <TopSection>
            <div>
              <h2>Shine a Light</h2>
              <p>
                There's always something to be done for someone in need. Select
                a kitchen below and confirm your information to inquire about
                volunteer opportunities
              </p>
            </div>
            <img src="https://i.imgur.com/Xo9PMVY.jpg" alt="bowl of soup" />
          </TopSection>
          <MidSection>
            <img
              src="https://i.imgur.com/YzD6KiP.jpg"
              alt="greyscale img of boy"
            />
            <Kitchens>
              {this.props.locations.map(kitchen => (
                <Kitchen key={kitchen.id} data={kitchen} />
              ))}
            </Kitchens>
          </MidSection>
        </Container>
        <StyledFooter>
          <section>
            <div>
              <h3>Keep in Touch</h3>
              <p>
                Want to learn more about our program? Keep informed on volunteer
                opportunities? Need some good news in your inbox every now and
                then? Subscribe to our newsletter!
              </p>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  name="newsletter"
                  onChange={this.handleChange}
                  value={this.state.newsletter}
                />
                <button>Subscribe</button>
              </form>
            </div>
            <div>
              <address>
                <p>
                  Test Kitchen 1<br />
                  123 Lambda Way
                  <br />
                  San Francisco, CA 12000
                  <br />
                  (555) 555-5555
                </p>
              </address>
            </div>
          </section>
        </StyledFooter>
      </>
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
