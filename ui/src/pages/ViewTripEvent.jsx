import React from 'react'; 
import { connect } from 'react-redux';

import { GetTrip } from 'reducers/trips';

import ViewEvent from './ViewEvent';
import Header from '../components/header';
import Section from '../components/section/Section';
import Title from '../components/text/Title';

class ViewTripEvent extends React.Component {
  componentDidMount() {
    this.props.getTrip(this.props.tripId);
  }

  getDefaultView() {
    return (
      <> 
        <Header />
        <Title text="Fetching..." />
      </>
    )
  }

  getErrorView() {
    return (
      <>
        <Header />
        <Section title="">
          <div className="error">"Error loading event"</div>
        </Section>
      </>
    );
  }

  render() {
    if (!this.props.trip)
      return this.getDefaultView();

    const event = this.props.trip.events.find(event => event.id == this.props.eventId);

    if (!event)
      return this.getErrorView();

    return (
      <ViewEvent event = {event}/>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.Trips.trip,
  gettingTrip: state.Trips.gettingTrip,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id) => dispatch(GetTrip(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTripEvent);

