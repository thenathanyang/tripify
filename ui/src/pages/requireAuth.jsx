import React from 'react';
import { connect } from 'react-redux';

import Login from './Login';

export default (ComposedComponent) => {
  class RequireAuth extends React.Component {
    render() {
      return this.props.authenticated ?
        <ComposedComponent {...this.props} /> :
        <Login {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.Users.authenticated,
  });

  return connect(mapStateToProps, () => ({}))(RequireAuth);
}
