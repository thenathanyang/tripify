import React from 'react'; 
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

import moment from 'moment';

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

  render() {
    if (this.props.trip == null) {
      return this.getDefaultView();
    }

    const events = this.props.trip.events;
    const event = events.find((event) => { return event.id == this.props.eventId});

    if (event == undefined) {
      return (
        <>
          <Header /> 
          <Section title="">
            <div className="error">"Error loading event"</div>
          </Section>
        </>
      );
    }

    return (
      <>
        <Header />
        <div className="container">
          <Title text={event.name} />
          <div className="image-box">
            <Image src={event.images[0]} />
            <div className="attend-button">
              <Button blue label="Attend" onClick={() => console.log("Attend button clicked")} />
            </div>
          </div>
          <Section title="Location">
            <Paragraph text={event.location} />
          </Section>
          <Section title="Date and Time">
            <Paragraph text={moment(event.startDate).format('dddd, MMMM Do')} />
            <TimeRange name="tripTimeRange" 
              defaultEndTime={moment(event.endDate, 'HH:mm a')} 
              defaultStartTime={moment(event.startDate, 'HH:mm a')}
              onChange={(name, start, end) => console.log(name, start, end)}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
// export default ViewEvent;
