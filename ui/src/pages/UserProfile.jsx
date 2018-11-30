import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { GetUser, LogoutUser } from 'reducers/users';

import Button from 'components/button/Button';
import Header from 'components/header';
import Paragraph from 'components/text/Paragraph';
import Section from 'components/section';
import Title from 'components/text/Title';

import requireAuth from './requireAuth';

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.user.id);
  }

  logout = () => {
    this.props.logoutUser();
    this.props.redirectHome();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Profile" />
          <Section title="Name">
            <Paragraph text={this.props.user.name} />
          </Section>
          <Section title="Email">
            <Paragraph text={this.props.user.email} />
          </Section>
          <Button small blue label="Logout" onClick={this.logout} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Users.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: (id) => dispatch(GetUser(id)),
  logoutUser: () => dispatch(LogoutUser()),
  redirectHome: () => dispatch(replace(`/`)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
