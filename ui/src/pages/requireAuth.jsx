import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

export default (ComposedComponent) => {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.redirectLogin();
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.authenticated) {
        this.props.redirectLogin();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.Users.authenticated,
  });

  const mapDispatchToProps = dispatch => ({
    redirectLogin: () => dispatch(replace('/login')),
  });

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}