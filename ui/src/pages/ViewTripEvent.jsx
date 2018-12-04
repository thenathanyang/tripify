import React from 'react'; 
import { connect } from 'react-redux';

import { GetTrip } from 'reducers/trips';

import ViewEvent from './ViewEvent';
import Header from 'components/header';

import requireAuth from './requireAuth';

class ViewTripEvent extends React.Component {
  componentDidMount() {
    this.props.getTrip(this.props.tripId);
  }

  getDefaultView = () => <><Header /><div className="container" /></>

  render() {
    if (!this.props.trip)
      return this.getDefaultView();

    const event = this.props.trip.events.find(event => event.id == this.props.eventId);
    return (
      <ViewEvent 
        event={event} 
        trip={this.props.trip}
        displayNotification={this.props.displayNotification}
      />
    );
  }
}

const mapStateToProps = state => ({
  trip: state.Trips.trip,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id) => dispatch(GetTrip(id)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(ViewTripEvent));
