import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { GetTrips } from 'reducers/trips';

import Title from '../components/text/Title';
import Section from '../components/section/Section';
import Button from '../components/button/Button';
import TripTile from '../components/tile/Trip';
import Header from '../components/header';

class Home extends React.Component {
  componentWillMount() {
    this.props.getTrips();
  }

  getUpcomingTitle = () => {
    if (this.props.gettingTrips)
      return "Fetching Trips...";
    if (this.props.trips.length === 0)
      return "No Trips Found";
    return "Upcoming";
  }

  render() {
    const trips = this.props.trips.sort((a, b) => a.date < b.date);
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Your Trips" />
          <Link to="/trips/create"><Button blue label="Create New Trip" /></Link>
          <Section title={this.getUpcomingTitle()}>
            { trips.map(trip => <TripTile key={trip.id} title={trip.name} background={trip.background} />) }
          </Section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.Trips.trips,
  gettingTrips: state.Trips.gettingTrips,
});

const mapDispatchToProps = dispatch => ({
  getTrips: () => dispatch(GetTrips()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
