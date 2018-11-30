import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import * as Image from 'models/image';
import Trip from 'models/trip';
import { history } from 'reducers';
import { GetTrip, UpdateTrip } from 'reducers/trips';

import Title from 'components/text/Title';
import TextInput from 'components/input/Text';
import Button from 'components/button/Button';
import DatePicker from 'components/input/DatePicker';
import TimeRange from 'components/input/TimeRange';
import Header from 'components/header';
import Section from 'components/section';

import requireAuth from './requireAuth';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    const now = moment().startOf('minute').add(15 - (moment().minute() % 15), 'minutes');
    this.state = {
      id: (''+Math.random()).split('.')[1],
      description: "Test Event",
      images: [Image.getRandomImage()],
      name: "",
      date: now,
      start: now,
      end: now,
      location: "",
      price: 0,
      error: null,
    }
  }

  handleChange = (name, value) =>
    this.setState(prev => ({...prev, [name]: value}));

  handleTimeRangeChange = (name, start, end) =>
    this.setState(prev => ({...prev, start, end}));

  updateTrip = (trip, event) => {
    const newTrip = Trip.fromObject(trip.toObject());
    newTrip.events.push(event);
    if (newTrip.background === Image.getBlackImage()) newTrip.background = event.images[0];
    this.props.updateTrip(trip.id, newTrip, () => this.props.redirectTrip(trip.id));
  }

  createEvent = () => {
    const event = {
      ...this.state,
      price: parseFloat(this.state.price),
      startDate: moment(this.state.date).hour(moment(this.state.start).hour()).minute(moment(this.state.start).minute()),
      endDate: moment(this.state.date).hour(moment(this.state.end).hour()).minute(moment(this.state.end).minute()),
    };
    
    if (!event.name)
      return this.setState(prev => ({...prev, error: "The event name cannot be empty"}));
    if (!event.location)
      return this.setState(prev => ({...prev, error: "The event location cannot be empty"}));
    if (isNaN(event.price) || event.price < 0)
      return this.setState(prev => ({...prev, error: "The event price must be a number at least 0"}));
    if (event.startDate < moment())
      return this.setState(prev => ({...prev, error: "The start date cannot be in the past"}));
    if (event.endDate < moment())
      return this.setState(prev => ({...prev, error: "The end date cannot be in the past"}));
    if (event.endDate < event.startDate)
      return this.setState(prev => ({...prev, error: "The end date cannot be before the start date"}));
    
    if (this.props.trip && this.props.trip.id === this.props.tripId) {
      this.updateTrip(this.props.trip, event);
    } else {
      this.props.getTrip(this.props.tripId, trip => this.updateTrip(trip, event));
    }
  }

  render() {
    const now = moment().startOf('minute').add(15 - (moment().minute() % 15), 'minutes');
    return(
      <div>
        <Header/>
        <div className="container">
          <Title text="Create an Event" />
          <Section title="Event Name">
            <TextInput name="name" onChange={this.handleChange} />
          </Section>

          <Section title="Event Date">
            <DatePicker
              name="date" 
              defaultValue={now}
              onChange={this.handleChange}
            />  
          </Section>

          <Section title="Event Time">
            <TimeRange
              name="eventTimeRange" 
              defaultEndTime={now}
              defaultStartTime={now}
              onChange={this.handleTimeRangeChange}
            />
          </Section>

          <Section title="Event Location">
            <TextInput name="location" onChange={this.handleChange} />
          </Section>

          <Section title="Event Price">
            <TextInput name="price" onChange={this.handleChange} />
          </Section>

          { (this.state.error || this.props.error) &&
            <Section>
              <div className="error">{ this.state.error || this.props.error }</div>
            </Section>
          }

          <div className="left-button">
            <Button blue label="Create" onClick={this.createEvent} />
          </div>
          <div className="right-button">
            <Button grey label="Cancel" onClick={() => history.goBack()} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.Trips.trip,
  error: state.Trips.error,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id, callback) => dispatch(GetTrip(id, callback)),
  updateTrip: (id, trip, callback) => dispatch(UpdateTrip(id, trip, callback)),
  redirectTrip: tripId => dispatch(replace(`/trips/${tripId}`)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));
