import React from 'react'; 
import { connect } from 'react-redux';

import { GetEvent } from 'reducers/events';
import ViewEvent from './ViewEvent';

import requireAuth from './requireAuth';

class ViewDiscoverEvent extends React.Component {
  componentDidMount() {
    this.props.getEvent(this.props.eventId);
  }

  render() {
    return <ViewEvent event={this.props.event} />;
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
