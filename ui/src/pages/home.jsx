import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../components/text/Title';
import Section from '../components/section/Section';
import Button from '../components/button/Button';
import TripTile from '../components/tile/Trip';
import Header from '../components/header';
import Paragraph from 'components/text/Paragraph';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Your Trips" />
          <Link to="/trips/create"><Button blue label="Create New Trip" /></Link>
          <Section title="Upcoming">
            <TripTile title="Kayaking Trip" />
          </Section>
          <Section title="Past">
            <TripTile title="Sunday Brunch" />
            <TripTile title="Beach Day" />
          </Section>
        </div>
      </div>
    );
  }
}
