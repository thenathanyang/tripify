import 'main.scss';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {render} from 'react-dom';

import {store, history} from 'reducers';

import CreateEvent from 'pages/createEvent';
import CreateTrip from 'pages/createTrip';
import ViewEvent from 'pages/ViewEvent';
import ViewTrip from 'pages/ViewTrip';
import ViewTrips from 'pages/home';

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/trips" component={ViewTrips}/>
            <Route exact path="/trips/create" component={CreateTrip} />
            <Route path="/trips/:id" component={({match}) => <ViewTrip id={match.params.id} />} />
            <Route exact path="/trips/:id/createEvent" component={({match}) => <CreateEvent tripId={match.params.id} />} />
            <Route path="/trips/:id/:event" component={({match}) => <ViewEvent tripId={match.params.id} eventId={match.params.event} />} />
            <Redirect to="/trips"/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
