import React from 'react';
import moment from 'moment';
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
    const now = moment().startOf('day');
    const pastTrips =
      this.props.trips
        .filter(trip => trip.date < now)
        .sort((a, b) => a.date > b.date);
    const upcomingTrips =
      this.props.trips
        .filter(trip => trip.date >= now)
        .sort((a, b) => a.date < b.date);
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Your Trips" />
          <Link to="/trips/create"><Button blue label="Create New Trip" /></Link>
          <Section title={this.getUpcomingTitle()}>
            { upcomingTrips.map(trip => <Link key={trip.id} to={`/trips/${trip.id}`}><TripTile title={trip.name} background={trip.background} /></Link>) }
          </Section>
          { pastTrips.length > 0 &&
            <Section title="Past">
              { pastTrips.map(trip => <Link key={trip.id} to={`/trips/${trip.id}`}><TripTile title={trip.name} background={trip.background} /></Link>) }
            </Section>
          }
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
