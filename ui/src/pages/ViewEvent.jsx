import React from 'react'; 
import PropTypes from 'prop-types';

import Header from '../components/header';
import Button from '../components/button/Button';
import Section from '../components/section/Section';
import Paragraph from '../components/text/Paragraph';
import TimeRange from '../components/input/TimeRange';
import Image from '../components/image/Image';
import Title from '../components/text/Title';

class ViewEvent extends React.Component {

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
            <TimeRange endTime={event.endDate} startTime={event.startDate} />
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

export default ViewEvent;
