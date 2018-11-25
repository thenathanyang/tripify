import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { Link } from 'react-router-dom';

import Title from 'components/text/Title';
import Paragraph from 'components/text/Paragraph';
import Section from 'components/section/Section';
import TextInput from 'components/input/Text';
import Button from 'components/button/Button';
import DatePicker from 'components/input/DatePicker';
import Header from 'components/header';

import Trip from 'models/trip';
import { history } from 'reducers';
import { GetTrip, UpdateTrip } from 'reducers/trips';

class UpdateTripPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {
        name: "",
        date: moment(),
        price: "$20",
        background: "https://washington-org.s3.amazonaws.com/s3fs-public/children-viewing-henry-the-elephant-at-natural-history-museum_credit-department-of-state-iip-photo-archive.jpg",
      },
      error: null,
    };
  }

  componentDidMount() {
    this.props.getTrip(this.props.id);
    this.setState({ trip: this.props.trip });
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

  handleChange = (name, value) =>
    this.setState(prev => ({ trip: { ...prev.trip, [name]: value } }));

  updateTrip = () => {
    if (!this.state.trip.name)
      return this.setState(prev => ({...prev, error: "Trip name must contain at least one character"}));
    if (this.state.trip.date < moment().startOf('day'))
      return this.setState(prev => ({...prev, error: "Trip date cannot be in the past"}));
    console.log("received trip: ");
    console.log(Trip.fromObject(this.state.trip));
    this.props.updateTrip(Trip.fromObject(this.state.trip), this.props.redirectTrip);
  };

  render() {
    if (!this.props.trip)
      return this.getDefaultView();

    return (
    <div>
      <Header />
      <div className="container">
        <Title text="Update Trip" />
          <Section title="Trip Name">
            <TextInput name="name" defaultValue={this.state.trip.name} onChange={this.handleChange} />
          </Section>

          <Section title="Trip Date">
            <DatePicker name="date" defaultValue={this.state.trip.date} onChange={this.handleChange} />
          </Section>

          <Section title="Trip Description">
            <TextInput name="description" defaultValue={this.state.trip.description} onChange={this.handleChange} />
          </Section>

          { (this.state.error || this.props.error) &&
            <Section title="">
              <div className="error">{ this.state.error || this.props.error }</div>
            </Section>
          }

          <div className="buttons">
            <div className="create-button">
              <Button blue label="Save Changes" onClick={this.updateTrip} />
            </div>
            <div className="cancel-button">
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
  updatingTrip: state.Trips.updatingTrip,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id) => dispatch(GetTrip(id)),
  updateTrip: (trip, callback) => dispatch(UpdateTrip(trip, callback)),
  redirectTrip: trip => dispatch(replace(`/trips/${trip.id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTripPage);