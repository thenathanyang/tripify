import React from 'react'; 

import Header from '../components/header';
import Button from '../components/button/Button';
import Section from '../components/section/Section';
import Paragraph from '../components/text/Paragraph';
import TimeRange from '../components/input/TimeRange';
import Image from '../components/image/Image';
import Title from '../components/text/Title';

import moment from 'moment';

class ViewEvent extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Title text="Free Museum Day" />
        <div className="image-box">
          <Image src="https://washington-org.s3.amazonaws.com/s3fs-public/children-viewing-henry-the-elephant-at-natural-history-museum_credit-department-of-state-iip-photo-archive.jpg" width='100%' />
          <div className="attend-button">
            <Button blue label="Attend" onClick={() => console.log("Attend button clicked")} />
          </div>
        </div>
        <div className="container">
          <Section title="Location">
            <Paragraph text="1 Museum Way Los Angeles, CA 90043" />
          </Section>
          <Section title="Date and Time">
            <Paragraph text="Tuesday, November 14, 2018" />
            <TimeRange name="tripTimeRange" 
              defaultEndTime={moment('3:30', 'HH:mm a')} 
              defaultStartTime={moment('7:00', 'HH:mm a')}
              onChange={(name, start, end) => console.log(name, start, end)}
            />
          </Section>
          <Section title="Description">
            <Paragraph text="Attend this amazing opportunity to go to the museum!"></Paragraph>
          </Section>
        </div> 
      </>
    );
  }
}

export default ViewEvent;
