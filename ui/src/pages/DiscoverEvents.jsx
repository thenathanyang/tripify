import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { GetEvents } from 'reducers/events';

import Header from '../components/header';
import Title from '../components/text/Title';
import Section from '../components/section/Section';
import EventTile from '../components/tile/Event';

class DiscoverEvents extends React.Component{

  componentWillMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <Title text="Discover"/>
          <Section title="Nearby Events">
            {this.props.events.map(event => <Link key={event.id} className="link" to={`/events/${event.id}`}><EventTile title={event.name} background={event.images[0]} time={event.startDate}/> </Link>)}
          </Section>
        </div>
     </div>
    );
  }
}



const mapStateToProps = state => ({
  error: state.Events.error,
  events: state.Events.events,
  gettingEvent: state.Events.gettingEvents,
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(GetEvents()),
});


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverEvents);

