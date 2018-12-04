import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import Title from 'components/text/Title';
import TextInput from 'components/input/Text';
import Button from 'components/button/Button';
import Header from 'components/header';
import Section from 'components/section';

import Trip from 'models/trip';
import { history } from 'reducers';
import { CreateTrip } from 'reducers/trips';
import { GetEvent } from 'reducers/events';

import requireAuth from './requireAuth';

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {
        name: "",
        events: []
      },
      error: null,
    };

    if ([...this.props.query.keys()].includes('addEvent')) {
      this.props.getEvent(this.props.query.get('addEvent'), event => {
        this.handleChange('events', [event]);
        this.handleChange('date', event.startDate);
      });
    }
  }

  handleChange = (name, value) =>
    this.setState(prev => ({ trip: { ...prev.trip, [name]: value } }));

  createTrip = () => {
    if (!this.state.trip.name)
      return this.setState(prev => ({...prev, error: "Trip name must contain at least one character"}));
    if (!this.state.trip.description)
      return this.setState(prev => ({...prev, error: "Trip description must contain at least one character"}));
    this.props.createTrip(Trip.fromObject(this.state.trip), this.props.redirectTrip);
  };

  render() {   
    return (
    <div>
      <Header />
      <div className="container">
        <Title text="Create Trip" />
          <Section title="Trip Name">
            <TextInput name="name" onChange={this.handleChange} />
          </Section>

          <Section title="Trip Description">
            <TextInput name="description" onChange={this.handleChange} />
          </Section>

          {(this.state.error || this.props.error) &&
            <Section>
              <div className="error">{ this.state.error || this.props.error }</div>
            </Section>
          }

          <div className="buttons">
            <div className="left-button">
              <Button blue label="Create" onClick={this.createTrip} />
            </div>
            <div className="right-button">
              <Button gray label="Cancel" onClick={() => history.goBack()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  error: state.Trips.error,
  creatingTrip: state.Trips.creatingTrip,
  event: state.Events.event,
  gettingEvent: state.Events.gettingEvent,
});

const mapDispatchToProps = dispatch => ({
  createTrip: (trip, callback) => dispatch(CreateTrip(trip, callback)),
  redirectTrip: trip => dispatch(replace(`/trips/${trip.id}`)),
  getEvent: (id,callback) => dispatch(GetEvent(id, callback)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(CreateTripPage));
