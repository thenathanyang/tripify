import React from 'react';
import PropTypes from 'prop-types';

import Member from 'models/member';

class MemberTile extends React.Component {
  render() {
    return (
      <div class="member-tile">
        { this.props.member.name }
      </div>
    );
  }
}

MemberTile.propTypes = {
  member: PropTypes.instanceOf(Member).isRequired,
};

export default MemberTile;
