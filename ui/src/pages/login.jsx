import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

class Login extends React.Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.redirectHome();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.authenticated) {
      this.props.redirectHome();
    }
  }

  render() {
    return <h1>Login Page</h1>;
  }
}

const mapStateToProps = state => ({
  authenticated: state.Users.authenticated,
});

const mapDispatchToProps = dispatch => ({
  redirectHome: () => dispatch(replace('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
