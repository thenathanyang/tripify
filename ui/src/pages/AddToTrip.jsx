import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { GetTrips, GetTrip, UpdateTrip } from 'reducers/trips';

import Title from 'components/text/Title';
import Trip from 'models/trip';
import Section from 'components/section/index';
import Button from 'components/button/Button';
import TripTile from  'components/tile/Trip';

import requireAuth from './requireAuth';

class AddToTrip extends React.Component{
  componentWillMount() {
    this.props.getTrips();
  }

  updateTrip = (trip) => {
    const newTrip = Trip.fromObject(trip.toObject());
    newTrip.events.push(this.props.event);
    this.props.updateTrip(trip.id, newTrip);
  }

  handleClick = (id) =>
    this.props.getTrip(id, trip => this.updateTrip(trip));

  render() {
    return(
      <div>
        <div>
          <Title text="Add to A Trip" />
          <Link className="no-style" to={`/trips/create?addEvent=${this.props.event.id}`}>
            <Button blue label="+ New Trip"/>
          </Link>
          <Section title= "Your Trips">
          {this.props.trips.map(trip =>
            <Link className="no-style" key={trip.id} onClick={() => this.handleClick(trip.id)} to={`/trips/${trip.id}`}>
              <TripTile title={trip.name} background={trip.background()}/>
            </Link>
          )}
          </Section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trips: state.Trips.trips,
  gettingTrips: state.Trips.gettingTrips,
});
  
const mapDispatchToProps = dispatch => ({
  getTrips: () => dispatch(GetTrips()),
  getTrip: (id, callback) => dispatch(GetTrip(id, callback)),
  updateTrip: (id, trip, callback) => dispatch(UpdateTrip(id, trip, callback)),
});

AddToTrip.propTypes = {
  /** Event object */
  event: PropTypes.object.isRequired,
};

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(AddToTrip));
