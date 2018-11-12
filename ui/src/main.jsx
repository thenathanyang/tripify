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

class App extends React.Component {
	render(){
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/trip/create" component={CreateTrip} />
						<Redirect to="/"/>
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}
}

render(<App />, document.getElementById('root'));
