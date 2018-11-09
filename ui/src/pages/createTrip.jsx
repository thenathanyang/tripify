import React from 'react';
import Title from '../components/text/Title';
import Section from '../components/section/Section';
import TextInput from '../components/input/Text';
import Button from '../components/button/Button';
import DatePicker from '../components/input/DatePicker';
import Header from '../components/header';

export default class CreateTrip extends React.Component {
  render() {
    return (
    <div>
      <Header />
      <div className="container">
        <Title text="Create Trip" />
          <Section title="TRIP NAME">
            <TextInput name = "tripName" onChange={(name, value) => console.log(name, value)} />
          </Section>

          <Section title="TRIP DATE">
            <DatePicker name = "tripDate" onChange={(name, value) => console.log(name, value)} />
          </Section>

          <div className="buttons">
            <div id="create-button">
              <Button blue label="Create" />
            </div>
            <div id="cancel-button">
              <Button gray label="Cancel"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}