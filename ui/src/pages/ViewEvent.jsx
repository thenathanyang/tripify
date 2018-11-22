import React from 'react'; 
import moment from 'moment';
import { connect } from 'react-redux';

import Trip from 'models/trip';
import { GetTrip } from 'reducers/trips';

import Header from '../components/header';
import Button from '../components/button/Button';
import Section from '../components/section/Section';
import Paragraph from '../components/text/Paragraph';
import TimeRange from '../components/input/TimeRange';
import Image from '../components/image/Image';
import Title from '../components/text/Title';

import requireAuth from './requireAuth';

class ViewEvent extends React.Component {
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
      <>
        <Header />
        <div className="container">
          <Title text={event.name} />
          <div className="image-box">
            <Image src={event.images[0]} />
            <div className="attend-button">
              { /* TODO @helenhyewonlee: only show the attend button if the event is not in the trip */ }
              <Button blue label="Attend" onClick={() => console.log("Attend button clicked")} />
            </div>
          </div>
          <Section title="Location">
            <Paragraph text={event.location} />
          </Section>
          <Section title="Date and Time">
            <Paragraph text={event.startDate.format('dddd, MMMM Do')} />
            <TimeRange disabled endTime={event.endDate} startTime={event.startDate} />
          </Section>
          <Section title="Description">
            <Paragraph text={event.description}></Paragraph>
          </Section>
        </div> 
      </>
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

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(ViewEvent));
