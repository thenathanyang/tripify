import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { DeleteTrip, GetTrip, GetTrips } from 'reducers/trips';

import Button from 'components/button/Button';
import MemberTile from 'components/tile/Member';
import Paragraph from 'components/text/Paragraph';
import Subheading from 'components/text/Subheading';
import TimeRange from 'components/input/TimeRange';
import Title from 'components/text/Title';
import EventTile from 'components/tile/Event';
import Header from 'components/header';
import Section from 'components/section';

import requireAuth from './requireAuth';

class ViewTrip extends React.Component {
  componentDidMount() {
    this.props.getTrip(this.props.tripId);
  }

  getDefaultView() {
    return (
      <>
        <Header />
        <div className="container"></div>
      </>
    );
  }

  deleteTrip = () => {
    this.props.deleteTrip(this.props.trip.id, success => {
      const message = success ? "Successfully deleted the trip" : "Failed to delete the trip";
      const icon = success ? "check" : "exclamation-triangle";
      this.props.displayNotification(message, icon, success);
      this.props.getTrips();
    });
  }

  render() {
    const viewOnly = [...this.props.query.keys()].includes('viewOnly');
    if (!this.props.trip || this.props.trip.id !== this.props.tripId)
      return this.getDefaultView();

    const events =  this.props.trip.events
      .sort((a, b) => a.startDate > b.startDate);
    return (
      <div>
        <Header/>
        <div className="container">
          <Title text={this.props.trip.name}/>
          <div className="trip-header">
            <Title text={"$" + this.props.trip.price().toLocaleString('en-US', { maximumFractionDigits: 2 })}/>
            <Subheading text="per person"/>
            {!viewOnly &&
              <div id="trip-buttons">
                <div id="edit-trip-button">
                  <Link key={this.props.trip.id} to={`/trips/${this.props.trip.id}/editTrip`}><Button small blue label="Edit"/></Link>
                </div>
                <div id="delete-trip-button">
                  <Link to={'/trips'}><Button small red label="Delete" onClick={this.deleteTrip}/></Link>
                </div>
              </div>
            }
          </div>

          <Section title="Date & Time">
            <Paragraph text={this.props.trip.date.format('dddd, MMMM Do')} />
            { this.props.trip.events.length > 0 && <TimeRange disabled defaultEndTime={this.props.trip.endTime()} defaultStartTime={this.props.trip.startTime()} /> }
          </Section>

          <Section title="Description">
            <Paragraph text={this.props.trip.description}/>
          </Section>

          <Section title="Trip Members">
            {this.props.trip.members.length > 0 &&
              <div className="members-wrapper">
                {this.props.trip.members.map(member => <MemberTile key={member.id} member={member} />)}
              </div>
            }
            {!viewOnly &&
              <Link to={`/trips/${this.props.trip.id}/inviteMember`}>
                <Button blue small label="+ Invite Member" />
              </Link>
            }
          </Section>

          <Section title="Events">
            { this.props.trip.events.length > 0 && events.map(event =>
              <Link key={event.id} className="link" to={`/trips/${this.props.trip.id}/${event.id}`}>
                <EventTile
                  title={event.name}
                  background={event.images.length ? event.images[0] : null}
                  time={event.startDate}
                />
              </Link>
            )}
            {!viewOnly &&
              <Link to={`/trips/${this.props.trip.id}/createEvent`}>
                <Button blue small label="+ Add event"/>
              </Link>
            }
          </Section>
        </div>
      </div>
    );
  }
}

ViewTrip.propTypes = {
  viewOnly: PropTypes.bool,
};

ViewTrip.defaultProps = {
  viewOnly: false,
};

const mapStateToProps = state => ({
  trip: state.Trips.trip,
  gettingTrip: state.Trips.gettingTrip,
  deleteTripSuccess: state.Trips.deleteTripSuccess,
  deleteTripFailure: state.Trips.deleteTripFailure,
});

const mapDispatchToProps = dispatch => ({
  deleteTrip: (id, callback) => dispatch(DeleteTrip(id, callback)),
  getTrip: (id, callback) => dispatch(GetTrip(id, callback)),
  getTrips: () => dispatch(GetTrips()),
  redirectTrip: () => dispatch(replace(`/trips`)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(ViewTrip));
