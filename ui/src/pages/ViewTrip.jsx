import React from 'react'; 
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { Link } from 'react-router-dom';

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
import moment from 'moment';

import Trip from 'models/trip';
import { DeleteTrip, GetTrip, GetTrips } from 'reducers/trips';

class ViewTrip extends React.Component {
  componentDidMount() {
    this.props.getTrip(this.props.id);
  }

  getDefaultView() {
    return (
      <> 
        <Header />
        <Title text="Fetching..." />
      </>
    )
  }

  deleteTrip = () => {
    this.props.deleteTrip(this.props.trip.id, this.props.getTrips);
  }

  render() {
    if (!this.props.trip)
      return this.getDefaultView();
    return (
      <div>
        <Header/>
        <div className="container">
          <div>
            <Title text={this.props.trip.name}/>
            <div className="trip-header">
              <Title text={"$" + this.props.trip.price().toLocaleString('en-US', { maximumFractionDigits: 2 })}/>
              <Subheader text="per person"/>
              <div id="trip-buttons">
                <div id="edit-trip-button">
                  <Link key={this.props.trip.id} to={`/trips/${this.props.trip.id}/editTrip`}><Button small blue label="Edit"/></Link>
                </div>
                <div id="delete-trip-button">
                  <Link to={'/trips'}><Button small red label="Delete" onClick={this.deleteTrip}/></Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Section title="Date & Time">
              <Paragraph text={this.props.trip.date.format('dddd, MMMM Do')} />
              <TimeRange endTime={this.props.trip.endTime()} startTime={this.props.trip.startTime()} />
            </Section>
          </div>

          <div>
            <Section title="Description">
              <Paragraph text={this.props.trip.description}/>
            </Section>
          </div>

          <div>
            <Section title="Events">
              { this.props.trip.events.length > 0 && this.props.trip.events.map(event =>
                <Link key={event.id} to={`/trips/${this.props.trip.id}/${event.id}`}>
                  <TripTile
                    title={event.name}
                    background={event.images.length ? event.images[0] : null}
                  />
                </Link>
              )}
              <Link to={`/trips/${this.props.trip.id}/createEvent`}><Button blue small label="+ Add event"/></Link>
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
  deleteTrip: (id, callback) => dispatch(DeleteTrip(id, callback)),
  getTrip: (id) => dispatch(GetTrip(id)),
  getTrips: () => dispatch(GetTrips()),
  redirectTrip: () => dispatch(replace(`/trips`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTrip);
