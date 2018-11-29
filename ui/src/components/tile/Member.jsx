import React from 'react';
import PropTypes from 'prop-types';

import Member from 'models/member';
import Icon from 'components/icon';
import { classnames } from 'utils';

class MemberTile extends React.Component {
  render() {
    const memberStateClasses = classnames({
      "member-state": true,
      "accepted": this.props.member.accepted(),
      "declined": this.props.member.declined(),
    });
    return (
      <div className="member-tile">
        <div className="member-tile-inner">
          <div className="member-picture">
            <Icon icon="user-circle" />
          </div>
          <div className="member-details">
            <span className="member-name">{this.props.member.name}</span><br />
            <span className={memberStateClasses}>{this.props.member.state}</span>
          </div>
        </div>
      </div>
    );
  }
}

MemberTile.propTypes = {
  member: PropTypes.instanceOf(Member).isRequired,
};

export default MemberTile;
