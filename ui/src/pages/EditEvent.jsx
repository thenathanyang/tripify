import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import * as Image from 'models/image';
import Trip from 'models/trip';
import Event from 'models/event';
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

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
    }
  }

  componentDidMount() {
    this.props.getTrip(this.props.tripId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getTripSuccess && (!this.state.event || this.state.event.id !== this.props.eventId)) {
      const event = this.props.trip.events.find(event => event.id == this.props.eventId);
      this.setState({ 
        event: {
          ...event,
          date: moment(event.startDate).startOf('day'),
        },
       });
    }
  }

  handleChange = (name, value) =>
    this.setState(prev => ({...prev, event: {...prev.event, [name]: value }}));

  handleTimeRangeChange = (name, startDate, endDate) => 
    this.setState(prev => ({...prev, event: {...prev.event, startDate, endDate}}));

  updateTrip = (trip, event) => {
    const newTrip = Trip.fromObject(trip.toObject());
    const eventIndex = newTrip.events.findIndex((event) => event.id == this.props.eventId);
    newTrip.events[eventIndex] = Event.fromObject(event);
    if (newTrip.background === Image.getBlackImage()) newTrip.background = event.images[0];
    this.props.updateTrip(trip.id, newTrip, () => this.props.redirectTrip(trip.id));
  }

  editEvent = () => {
    const event = {
      ...this.state.event,
      price: parseFloat(this.state.event.price),
      startDate:
        moment(this.state.event.date)
          .hour(moment(this.state.event.startDate).hour())
          .minute(moment(this.state.event.startDate).minute()),
      endDate:
        moment(this.state.event.date)
          .hour(moment(this.state.event.endDate).hour())
          .minute(moment(this.state.event.endDate).minute()),
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

  getDefaultView = () => <><Header /><div className="container"></div></>

  render() {
    if (!this.state.event)
      return this.getDefaultView();

    return (
      <div>
        <Header/>
        <div className="container">
          <Title text="Edit Event" />
          <Section title="Event Name">
            <TextInput 
              name="name" 
              defaultValue={this.state.event.name} 
              onChange={this.handleChange} 
            />
          </Section>

          <Section title="Event Date">
            <DatePicker
              name="date" 
              defaultValue={this.state.event.startDate}
              onChange={this.handleChange}
            />  
          </Section>

          <Section title="Event Time">
            <TimeRange
              name="eventTimeRange" 
              defaultStartTime={this.state.event.startDate}
              defaultEndTime={this.state.event.endDate}  
              onChange={this.handleTimeRangeChange}
            />
          </Section>

          <Section title="Event Location">
            <TextInput 
              name="location" 
              defaultValue={this.state.event.location}
              onChange={this.handleChange} 
            />
          </Section>

          <Section title="Event Price">
            <TextInput 
              name="price" 
              defaultValue={this.state.event.price.toString()}
              onChange={this.handleChange} 
            />
          </Section>

          { (this.state.error || this.props.error) &&
            <Section>
              <div className="error">{ this.state.error || this.props.error }</div>
            </Section>
          }

          <div className="left-button">
            <Button blue label="Save Changes" onClick={this.editEvent} />
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
  getTripSuccess: state.Trips.getTripSuccess,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id, callback) => dispatch(GetTrip(id, callback)),
  updateTrip: (id, trip, callback) => dispatch(UpdateTrip(id, trip, callback)),
  redirectTrip: tripId => dispatch(replace(`/trips/${tripId}`)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(EditEvent));
