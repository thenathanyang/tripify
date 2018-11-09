import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../components/text/Title';
import Section from '../components/section/Section';
import Button from '../components/button/Button';
import TripTile from '../components/tile/Trip';
import Header from '../components/header';

export default class Trips extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <Title text="Your Trips" />
          <Link to="/create"><Button blue label="Create New Trip" onClick={() => console.log("Create New Trip button clicked")} /></Link>
          <Section title="Upcoming">
            <TripTile title="Kayaking Trip" />
          </Section>
          <Section title="Past">
            <TripTile title="Sunday Brunch" />
            <TripTile title="Beach Day" />
          </Section>
        </div>
      </>
    );
  }
}
