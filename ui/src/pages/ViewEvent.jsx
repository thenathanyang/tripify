import React from 'react'; 
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { UpdateTrip } from 'reducers/trips';
import Trip from 'models/trip';

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

  showAddPage = () => this.setState({ showAddPage: true });
  removeAddPage = () => this.setState({ showAddPage: false });
  getDefaultView = () => <><Header /><div className="container" /></>

  getEventLink = event =>
    `/trips/${this.props.trip.id}/${event.id}/editEvent`;

  getAddPage() {
    return (
      <div className="container">
        <AddToTrip event={this.props.event} />
        <Button small grey label="Cancel" onClick={this.removeAddPage} />
      </div>
    );
  }

  deleteEvent = () => {
    const newTrip = Trip.fromObject(this.props.trip.toObject());
    newTrip.events = newTrip.events.filter(event => event.id !== this.props.event.id);

    this.props.updateTrip(this.props.trip.id, newTrip, (updatedTrip, success) => {
      const message = success ? "Successfully deleted the event" : "Failed to delete the event";
      const icon = success ? "check" : "exclamation-triangle";
      this.props.displayNotification(message, icon, success);
      this.props.redirectTrip(this.props.trip.id);
    });
  }

  getEventPage(event) {
    return (
      <>
        <Header />
        <div className="container">
          <Title text={event.name} />
          <div className="image-box">
            <Image src={event.images[0]} />
            { !this.props.trip && 
              <div className="attend-button">
                <Button blue label="Attend" onClick={this.showAddPage} />
              </div> }
            { this.props.trip && 
              <div className="edit-delete-buttons"> 
                <div className="left-button">
                <Link key={event.id} to={this.getEventLink(event)}>
                  <Button blue label="Edit"/>
                </Link>
                </div>
                <div className="right-button">
                  <Button red label="Delete" onClick={this.deleteEvent} />
                </div>
              </div>
            }
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
    );
  }

  render() {
    if (!this.props.event)
      return this.getDefaultView();
    return this.state.showAddPage ? this.getAddPage() : this.getEventPage(this.props.event);
  }
}

ViewEvent.propTypes = {
  /** Event object */
  event: PropTypes.object,
  /** Trip if the event is associated with a trip */
  trip: PropTypes.object,
  /** DisplayNotification function that triggers a notification to display */
  displayNotification: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  updateTrip: (id, trip, callback) => dispatch(UpdateTrip(id, trip, callback)),
  redirectTrip: (tripId) => dispatch(replace(`/trips/${tripId}`)),
});

export default requireAuth(connect(() => ({}), mapDispatchToProps)(ViewEvent));
