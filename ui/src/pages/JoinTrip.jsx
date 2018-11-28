import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { GetUser } from 'reducers/users';
import { GetTrip, UpdateTrip } from 'reducers/trips';

import Button from 'components/button/Button';
import Paragraph from 'components/text/Paragraph';
import Title from 'components/text/Title';
import Header from 'components/header';
import Section from 'components/section';

import requireAuth from './requireAuth';

class JoinTrip extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.user.id);
    this.props.getTrip(this.props.tripId);
  }

  acceptInvite = () => null;
  declineInvite = () => null;

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Join Trip" />
          <Paragraph text="You've been invited to a trip! You can see the trip details and then return to this screen and choose whether to accept or decline the invitation." />
          
          <Section title="Trip">
            {this.props.trip && <Paragraph text={this.props.trip.name} />}
            {this.props.trip && <Link to={`/trips/${this.props.tripId}`}><Button small blue label="View Trip" /></Link>}
          </Section>

          <Section title="RSVP">
            <div className="buttons">
              <div className="left-button">
                <Button blue label="Attend" onClick={this.acceptInvite} />
              </div>
              <div className="right-button">
                <Button gray label="Decline" onClick={this.declineInvite} />
              </div>
            </div>
          </Section>
        </div> 
      </div>
    );
  }
}

JoinTrip.propTypes = {
  tripId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.Users.user,
  trip: state.Trips.trip,
});

const mapDispatchToProps = dispatch => ({
  getUser: (id) => dispatch(GetUser(id)),
  getTrip: (id) => dispatch(GetTrip(id)),
  updateTrip: (trip, callback) => dispatch(UpdateTrip(trip, callback)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(JoinTrip));