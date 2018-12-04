import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { replace } from 'connected-react-router';
import { connect } from 'react-redux';

import { GetUser } from 'reducers/users';
import { GetTrip, UpdateTrip, RSVPTrip } from 'reducers/trips';

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

  rsvp = accepted => () =>
    this.props.rsvpTrip(this.props.tripId, accepted, () => {
      // TODO: add notification based on `accepted`
      this.props.redirectTrip();
    });

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Join Trip" />
          <Paragraph text="You've been invited to a trip! You can see the trip details and then return to this screen and choose whether to accept or decline the invitation." />

          <Section title="Trip">
            {this.props.trip && <Paragraph text={this.props.trip.name} />}
            {this.props.trip && <Link to={`/trips/${this.props.tripId}?viewOnly`}><Button small blue label="View Trip" /></Link>}
          </Section>

          <Section title="RSVP">
            <div className="buttons">
              <div className="left-button">
                <Button blue small label="Accept" onClick={this.rsvp(true)} />
              </div>
              <div className="right-button">
                <Button gray small label="Decline" onClick={this.rsvp(false)} />
              </div>
            </div>
          </Section>

          {(this.props.rsvpFailure && this.props.error) &&
            <Section><div className="error">{this.props.error}</div></Section>
          }
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
  error: state.Trips.error,
  rsvpFailure: state.Trips.rsvpFailure,
});

const mapDispatchToProps = dispatch => ({
  getUser: (id) => dispatch(GetUser(id)),
  getTrip: (id) => dispatch(GetTrip(id)),
  rsvpTrip: (id, accepted, callback) => dispatch(RSVPTrip(id, accepted, callback)),
  updateTrip: (trip, callback) => dispatch(UpdateTrip(trip, callback)),
  redirectTrip: () => dispatch(replace(`/trips`)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(JoinTrip));
