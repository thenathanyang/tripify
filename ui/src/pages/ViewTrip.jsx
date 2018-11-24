import React from 'react'; 
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Trip from 'models/trip';
import { GetTrip } from 'reducers/trips';

import Title from '../components/text/Title';
import Section from '../components/section/Section';
import TextInput from '../components/input/Text';
import Button from '../components/button/Button';
import DatePicker from '../components/input/DatePicker';
import Header from '../components/header';
import Paragraph from '../components/text/Paragraph';
import TimeRange from '../components/input/TimeRange';
import TripTile from '../components/tile/Trip';
import Subheader from '../components/text/Subheading';

import requireAuth from './requireAuth';

class ViewTrip extends React.Component {
  componentDidMount() {
    this.props.getTrip(this.props.id);
  }

  getTitle() {
    if (this.props.trip)
      return this.props.trip.name;
    if (this.props.gettingTrip)
      return "Fetching...";
    return "Error!";
  }

  render() {
    const trip = this.props.trip || new Trip("987654321","Kayaking Trip", moment(), "Fun Kayaking Trip!", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRTv1vUhVksy1zgscQp28LnKkO2gryPvDvkaaVZs_zCYVGlhH6Q");
    return (
      <div>
        <Header/>
        <div className="container">
          <div>
            <Title text={this.getTitle()}/>
            <div className="trip-header">
              <Title text={"$" + trip.price().toLocaleString('en-US', { maximumFractionDigits: 2 })}/>
              <Subheader text="per person"/>
              <div id="trip-buttons">
                <div id="edit-trip-button">
                  <Button small blue label="Edit"/>
                </div>
                <div id="delete-trip-button">
                  <Button small red label="Delete"/>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Section title="Date & Time">
              <Paragraph text={trip.date.format('dddd, MMMM Do')} />
              <TimeRange disabled endTime={trip.endTime()} startTime={trip.startTime()} />
            </Section>
          </div>

          <div>
            <Section title="Description">
              <Paragraph text={trip.description}/>
            </Section>
          </div>

          <div>
            <Section title="Events">
              { trip.events.length > 0 && trip.events.map(event =>
                <Link key={event.id} to={`/trips/${trip.id}/${event.id}`}>
                  <TripTile
                    title={event.name}
                    background={event.images.length ? event.images[0] : null}
                  />
                </Link>
              )}
              <Link to={`/trips/${trip.id}/createEvent`}><Button blue small label="+ Add event"/></Link>
            </Section>
          </div>
        </div>
      </div>
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

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(ViewTrip));
