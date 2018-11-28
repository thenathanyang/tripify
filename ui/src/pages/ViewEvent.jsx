import React from 'react'; 
import PropTypes from 'prop-types';

import moment from 'moment';
import { connect } from 'react-redux';

import Trip from 'models/trip';
import { GetTrip } from 'reducers/trips';

import Button from '../components/button/Button';
import Paragraph from '../components/text/Paragraph';
import TimeRange from '../components/input/TimeRange';
import Image from '../components/image/Image';
import Title from '../components/text/Title';
import Header from '../components/header';
import Section from '../components/section';

import requireAuth from './requireAuth';

class ViewEvent extends React.Component {

  getErrorView() {
    return (
      <>
        <Header />
        <Section>
          <div className="error">"Error loading event"</div>
        </Section>
      </>
    );
  }

  render() {

    const event = this.props.event;

    if (!event)
      return this.getErrorView();

    return (
      <>
        <Header />
        <div className="container">
          <Title text={event.name} />
          <div className="image-box">
            <Image src={event.images[0]} />
            <div className="attend-button">
              { /* TODO @helenhyewonlee: only show the attend button if the event is not in the trip */ }
              <Button blue label="Attend" onClick={() => console.log("Attend button clicked")} />
            </div>
          </div>
          <Section title="Location">
            <Paragraph text={event.location} />
          </Section>
          <Section title="Date and Time">
            <Paragraph text={event.startDate.format('dddd, MMMM Do')} />
            <TimeRange disabled endTime={event.endDate} startTime={event.startDate} />
          </Section>
          <Section title="Price">
            <Paragraph text={"$" + event.price.toLocaleString('en-US', { maximumFractionDigits: 2 }) + " per person"}></Paragraph>
          </Section>
          <Section title="Description">
            <Paragraph text={event.description}></Paragraph>
          </Section>
        </div> 
      </>
    );
  }
}

ViewEvent.propTypes = {
    /** Event object */
    event: PropTypes.object.isRequired,
  };

export default requireAuth(ViewEvent);

