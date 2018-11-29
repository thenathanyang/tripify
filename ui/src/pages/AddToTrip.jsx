import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Storage from "storage";

import { GetTrips, GetTrip, UpdateTrip } from 'reducers/trips';

import Title from 'components/text/Title';
import Trip from 'models/trip';
import * as Image from 'models/image';
import Section from 'components/section/index';
import Button from 'components/button/Button';
import TripTile from  'components/tile/Trip';

import requireAuth from './requireAuth';

class AddToTrip extends React.Component{
    componentWillMount() {
        this.props.getTrips();
      }
    
    getUpcomingTitle = () => {
        if (this.props.gettingTrips)
          return "Fetching Trips...";
        if (this.props.trips.length === 0)
          return "";
        return "Your Trips";
    }

    updateTrip = (trip) => {
        var event = this.props.event;
        const newTrip = Trip.fromObject(trip.toObject());
        newTrip.events.push(event);
        if (newTrip.background === Image.getBlackImage()) newTrip.background = event.images[0];
        this.props.updateTrip(trip.id, newTrip);
    }

    handleClick = (id) =>{
        this.props.getTrip(id, trip => this.updateTrip(trip));
    }


    render() {
        return(
            <div>
                <div>
                    <Title text="Add to A Trip"/>
                    <Link to={`/trips/create?addEvent=${this.props.event.id}`}><Button blue label="+ New Trip"/></Link>
                    <Section title={this.getUpcomingTitle()}>
                    { this.props.trips.map(trip =>
                        <Link className="link" onClick={() => this.handleClick(trip.id)} to={`/trips/${trip.id}`}>
                            <TripTile key={trip.id} title={trip.name} background={trip.background}/> 
                        </Link>
                    ) }
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