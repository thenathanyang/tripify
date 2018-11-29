import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import { connect } from 'react-redux';

import { GetTrip } from 'reducers/trips';

import Title from 'components/text/Title';
import Paragraph from 'components/text/Paragraph';
import Button from 'components/button/Button';
import Header from 'components/header';
import Section from 'components/section';

import requireAuth from './requireAuth';

class InviteMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = { linkCopied: false };
  }

  componentDidMount() {
    this.props.getTrip(this.props.tripId);
  }

  getInviteLink = (trip = this.props.trip, loc = window.location) =>
    `${loc.protocol}//${loc.host}/#/trips/${trip.id}/joinTrip`;

  copyInviteLink = () =>
    this.setState({ linkCopied: true }, () => copy(this.getInviteLink()));

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Title text="Invite Member" />
          <Paragraph text="Copy the link below and send it to the people you want to invite to this trip. If they accept, they'll be able to view the trip." />
          
          <Section title="Trip Name">
            {this.props.trip && <Paragraph text={this.props.trip.name} />}
          </Section>

          <Section title="Trip Link">
            <Button small blue label="Copy Link" onClick={this.copyInviteLink} />
          </Section>

          {this.state.linkCopied &&
            <Section><div className="success">Link Copied!</div></Section>
          }
        </div> 
      </div>
    );
  }
}

InviteMember.propTypes = {
  tripId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  trip: state.Trips.trip,
});

const mapDispatchToProps = dispatch => ({
  getTrip: (id) => dispatch(GetTrip(id)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(InviteMember));