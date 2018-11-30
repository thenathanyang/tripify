import React from 'react'; 
import { connect } from 'react-redux';

import { GetEvent } from 'reducers/events';

import ViewEvent from './ViewEvent';
import Title from 'components/text/Title';
import Header from 'components/header';
import Section from 'components/section';

import requireAuth from './requireAuth';

class ViewDiscoverEvent extends React.Component {
  componentDidMount() {
    this.props.getEvent(this.props.eventId);
  }

  getDefaultView() {
    return (
      <> 
        <Header />
        <Title text="Fetching..." />
      </>
    )
  }

  getErrorView() {
    return (
      <>
        <Header />
        <Section title="">
          <div className="error">"Error loading event"</div>
        </Section>
      </>
    );
  }

  render() {
    if (this.props.gettingEvent)
      return this.getDefaultView();

    if (!this.props.event)
      return this.getErrorView();

    return (
      <ViewEvent event = {this.props.event} />
    );
  }
}

const mapStateToProps = state => ({
  event: state.Events.event,
  gettingEvent: state.Events.gettingEvent,
});

const mapDispatchToProps = dispatch => ({
  getEvent: (id) => dispatch(GetEvent(id)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(ViewDiscoverEvent));


