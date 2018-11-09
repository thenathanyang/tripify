import React from 'react';
import Title from 'components/text/Title';
import Section from 'components/section/Section';
import Button from '../components/button/Button';
import TripTile from '../components/tile/Trip';

export default class Trips extends React.Component {
  render() {
    return (
      <div>
        <Title text="Your Trips" />
        <Button blue label="Create New Trip" onClick={() => console.log("Create New Trip button clicked")} />
        <Section title="Upcoming">
          <TripTile title="Kayaking Trip" />
        </Section>
        <Section title="Past">
          <TripTile title="Sunday Brunch" />
          <TripTile title="Beach Day" />
        </Section>
      </div>
    );
  }
}
