import React from 'react';
import PropTypes from 'prop-types';

import BaseTile from './base';
import moment from 'moment';

class EventTile extends React.Component{
  render() {
    const { title, background } = this.props;
    const style = background ? { backgroundImage: `url(${background})`, width: '70%', float: 'left'} : {width: '70%', float:'left'};
    const inner = background ? (
      <div className="tile-inner-bg-gradient">
        <span>{title}</span>
      </div>
    ) : (
      <span>{title}</span>
    );

    return (
      <BaseTile height={0.5}>
        <div className="tile-inner-bg event-tile-inner-bg" style={style}>
          {inner}
        </div>
        <div className="event-date" >
          <div className="month">{moment.monthsShort(this.props.time.month())}</div>
          <div className="date">{this.props.time.date()}</div>
        </div>
      </BaseTile>
    );
  }
}

EventTile.propTypes = {
  /** The title to display on the Trip tile */
  title: PropTypes.string.isRequired,
  /** The URL to the background image (optional) */
  background: PropTypes.string,
  /** The datetime of the event */
  time: PropTypes.instanceOf(moment).isRequired,
}

EventTile.defaultProps = {
  background: null,
};

export default EventTile;