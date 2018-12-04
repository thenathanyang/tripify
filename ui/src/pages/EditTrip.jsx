import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import Title from 'components/text/Title';
import TextInput from 'components/input/Text';
import Button from 'components/button/Button';
import Header from 'components/header';
import Section from 'components/section';

import Trip from 'models/trip';
import { history } from 'reducers';
import { GetTrip, UpdateTrip } from 'reducers/trips';

import requireAuth from './requireAuth';

class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      error: null,
    };
  }

  componentDidMount() {
    this.props.getTrip(this.props.tripId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getTripSuccess && (!this.state.trip || this.state.trip.id !== this.props.tripId)) {
      this.setState({ trip: this.props.trip.toObject() });
    }
  }

  getDefaultView = () => <><Header /><div className="container" /></>

  handleChange = (name, value) =>
    this.setState(prev => ({ trip: { ...prev.trip, [name]: value } }));

  updateTrip = () => {
    if (!this.state.trip.name)
      return this.setState(prev => ({...prev, error: "Trip name must contain at least one character"}));
    if (!this.state.trip.description)
      return this.setState(prev => ({...prev, error: "Trip description must contain at least one character"}));
    this.props.updateTrip(this.state.trip.id, Trip.fromObject(this.state.trip), (updatedTrip, success) => {
      const message = success ? "Successfully updated the trip" : "Failed to update the trip";
      const icon = success ? "check" : "exclamation-triangle";
      this.props.displayNotification(message, icon, success);
      this.props.redirectTrip(this.state.trip.id);
    });
  };

  render() {
    if (!this.state.trip)
      return this.getDefaultView();

    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Edit Trip" />
          <Section title="Trip Name">
            <TextInput name="name" defaultValue={this.state.trip.name} onChange={this.handleChange} />
          </Section>

          <Section title="Trip Description">
            <TextInput name="description" defaultValue={this.state.trip.description} onChange={this.handleChange} />
          </Section>

          {(this.state.error || this.props.error) &&
            <Section>
              <div className="error">{ this.state.error || this.props.error }</div>
            </Section>
          }

          <div className="buttons">
            <div className="left-button">
              <Button blue label="Save Changes" onClick={this.updateTrip} />
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
  trip: state.Trips.trip,
  error: state.Trips.error,
  getTripSuccess: state.Trips.getTripSuccess,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id) => dispatch(GetTrip(id)),
  updateTrip: (id, trip, callback) => dispatch(UpdateTrip(id, trip, callback)),
  redirectTrip: tripId => dispatch(replace(`/trips/${tripId}`)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(EditTrip));
