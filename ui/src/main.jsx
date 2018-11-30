import 'main.scss';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {render} from 'react-dom';

import {store, history} from 'reducers';
import addNotification from 'pages/addNotification';

import CreateEvent from 'pages/CreateEvent';
import CreateTrip from 'pages/CreateTrip';
import InviteMember from 'pages/InviteMember';
import JoinTrip from 'pages/JoinTrip';
import ViewTrip from 'pages/ViewTrip';
import ViewTrips from 'pages/ViewTrips';
import ViewTripEvent from 'pages/ViewTripEvent';
import EditTrip from 'pages/EditTrip';
import DiscoverEvents from 'pages/DiscoverEvents';
import ViewDiscoverEvent from 'pages/ViewDiscoverEvent';
import EditEvent from 'pages/EditEvent';
import UserProfile from 'pages/UserProfile';

class _App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/trips" component={() => <ViewTrips displayNotification={this.props.displayNotification} />}/>
            <Route exact path="/trips/create" component={({location}) => <CreateTrip displayNotification={this.props.displayNotification} query={new URLSearchParams(location.search)}/>} />
            <Route exact path="/trips/:id" component={({match, location}) => <ViewTrip tripId={match.params.id} query={new URLSearchParams(location.search)} displayNotification={this.props.displayNotification} />} />
            <Route exact path="/trips/:id/editTrip" component={({match}) => <EditTrip tripId={match.params.id} displayNotification={this.props.displayNotification} />} />
            <Route exact path="/trips/:id/joinTrip" component={({match}) => <JoinTrip tripId={match.params.id} displayNotification={this.props.displayNotification} />} />
            <Route exact path="/trips/:id/createEvent" component={({match}) => <CreateEvent tripId={match.params.id} displayNotification={this.props.displayNotification} />} />
            <Route exact path="/trips/:id/inviteMember" component={({match}) => <InviteMember tripId={match.params.id} displayNotification={this.props.displayNotification} />} />
            <Route exact path="/trips/:id/:event" component={({match}) => <ViewTripEvent tripId={match.params.id} eventId={match.params.event} displayNotification={this.props.displayNotification} />} />
            <Route exact path="/trips/:id/:eventId/editEvent" component={({match}) => <EditEvent tripId={match.params.id} eventId={match.params.eventId} displayNotification={this.props.displayNotification} />} /> 
            <Route exact path="/events" component={() => <DiscoverEvents displayNotification={this.props.displayNotification} />}/>
            <Route exact path="/events/:id" component={({match}) => <ViewDiscoverEvent eventId={match.params.id} displayNotification={this.props.displayNotification}/>}/>
            <Route exact path="/user" component={UserProfile} />
            <Redirect to="/trips"/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

const App = addNotification(_App);

render(<App />, document.getElementById('root'));
