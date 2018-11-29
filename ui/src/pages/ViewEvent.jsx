import React from 'react'; 
import PropTypes from 'prop-types';

import Button from 'components/button/Button';
import Paragraph from 'components/text/Paragraph';
import TimeRange from 'components/input/TimeRange';
import Image from 'components/image/Image';
import Title from 'components/text/Title';
import Header from 'components/header';
import Section from 'components/section';
import AddToTrip from './AddToTrip';

import requireAuth from './requireAuth';

class ViewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPage: false
    };
  }

  getErrorView() {
    return (
      <>
        <Header />
        <Section>
          <div className="error">Error loading event</div>
        </Section>
      </>
    );
  }

  showAddPage = () => this.setState({ showAddPage: true });

  removeAddPage = () => this.setState({ showAddPage: false });

  getAddPage(){
    return (
      <div className="container">
      <AddToTrip event={this.props.event}/>
      <Button grey label="Cancel" onClick={this.removeAddPage} className="cancel-button"/>
      </div>
    )
  }

  getEventPage(event) {
    return (
      <>
        <Header />
        <div className="container">
          <Title text={event.name} />
          <div className="image-box">
            <Image src={event.images[0]} />
            { !this.props.isTripEvent && 
              <div className="attend-button">
                <Button blue label="Attend" onClick={() => console.log("Attend button clicked")} />
              </div> }
            { this.props.isTripEvent && 
              <div className="edit-delete-buttons"> 
                <div className="left-button">
                  <Button blue label="Edit"/>
                </div>
                <div className="right-button">
                  <Button gray label="Delete" />
                </div>
              </div>}
          </div>
          <Section title="Location">
            <Paragraph text={event.location} />
          </Section>
          <Section title="Date and Time">
            <Paragraph text={event.startDate.format('dddd, MMMM Do')} />
            <TimeRange disabled defaultEndTime={event.endDate} defaultStartTime={event.startDate} />
          </Section>
          <Section title="Price">
            <Paragraph text={"$" + event.price.toLocaleString('en-US', { maximumFractionDigits: 2 }) + " per person"}></Paragraph>
          </Section>
          <Section title="Description">
            <Paragraph text={event.description}></Paragraph>
          </Section>
        </div> 
      </>
    )
  }

  render() {
    const event = this.props.event;
    if (!event)
      return this.getErrorView();
    return this.state.showAddPage ? this.getAddPage() : this.getEventPage(event);
  }
}

ViewEvent.propTypes = {
  /** Event object */
  event: PropTypes.object.isRequired,
  /** Boolean value to represent whether the event is associated with a trip */
  isTripEvent: PropTypes.bool,
};

export default requireAuth(ViewEvent);

