import 'main.scss';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {render} from 'react-dom';

import {store, history} from 'reducers';

import Home from 'pages/home';
import CreateTrip from 'pages/createTrip';
import CreateEvent from 'pages/createEvent';
import ViewEvent from 'pages/ViewEvent';
import ViewTrip from 'pages/ViewTrip';

class App extends React.Component {
	render(){
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/trips" component={Home}/>
						<Route path="/trips/create" component={CreateTrip} />
						<Route path="/event/create" component={CreateEvent}/>
						<Route path="/events" component={ViewEvent} />
						<Route path="/trips/:id" component={route => <ViewTrip route={route} />} />
						<Redirect to="/trips"/>
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}
}

render(<App />, document.getElementById('root'));
