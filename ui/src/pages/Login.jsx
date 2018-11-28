import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { LoginUser, CreateUser } from 'reducers/users';

import TabController from 'components/tabs/TabController';
import TextInput from 'components/input/Text';
import PasswordInput from 'components/input/Password';
import Section from 'components/section/Section';
import Button from 'components/button/Button';
import Header from 'components/header';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logInView: true,
      user: {},
    };
  }

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

  handleTabUpdate = i => {
    this.setState(prev => ({...prev, logInView: i === 0}));
  }

  handleChange = (name, value) => {
    this.setState(prev => ({...prev, user: {...prev.user, [name]: value }}));
  }

  logIn = () => this.props.loginUser(this.state.user.email, this.state.user.password);
  signUp = () => this.props.createUser(this.state.user.name, this.state.user.email, this.state.user.password);

  getLoginView = () => {
    return (
      <div>
        <Section title="Email Address">
          <TextInput name="email" onChange={this.handleChange} />
        </Section>
        <Section title="Password">
          <PasswordInput name="password" onChange={this.handleChange} />
        </Section>
        <Section title="">
          <Button blue label="Log In" onClick={this.logIn} />
        </Section>
      </div>
    );
  }

  getSignUpView = () => {
    return (
      <div>
        <Section title="Email Address">
          <TextInput name="email" onChange={this.handleChange} />
        </Section>
        <Section title="Full Name">
          <TextInput name="name" onChange={this.handleChange} />
        </Section>
        <Section title="Password">
          <PasswordInput name="password" onChange={this.handleChange} />
        </Section>
        <Section title="">
          <Button blue label="Sign Up" onClick={this.signUp} />
        </Section>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <TabController tabs={["Log In", "Sign Up"]} onChange={this.handleTabUpdate} />
          { this.state.logInView ? this.getLoginView() : this.getSignUpView() }
          { ((this.props.logInFailure || this.props.createUserFailure) && this.props.error) && 
            <Section title="">
              <div className="error">{ this.props.error }</div>
            </Section>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.Users.authenticated,
  error: state.Users.error,
  logInFailure: state.Users.logInFailure,
  createUserFailure: state.Users.createUserFailure,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(LoginUser(email, password)),
  createUser: (name, email, password) => dispatch(CreateUser(name, email, password)),
  redirectHome: () => dispatch(replace('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
