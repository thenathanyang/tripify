import React from 'react';
import PropTypes from 'prop-types';

import BaseTile from './base';

/**
 * TripTile is the component that displays a Trip on the Your Trips
 * page.
 * 
 * Example:
 *  <TripTile
 *    title="Trip Title"
 *    background="http://url.com/your-image"
 *  />
 *
 * @author nkansal96
 * @version 1.0.0
 */
class TripTile extends React.Component {
  render() {
    const { title, background } = this.props;
    const style = background ? { backgroundImage: `url(${background})` } : null;
    const inner = background ? (
      <div className="tile-inner-bg-gradient">
        <span>{title}</span>
      </div>
    ) : (
      <span>{title}</span>
    );

    return (
      <BaseTile>
        <div className="tile-inner-bg" style={style}>
          {inner}
        </div>
      </BaseTile>
    )
  }
}

TripTile.propTypes = {
  /** The title to display on the Trip tile */
  title: PropTypes.string.isRequired,
  /** The URL to the background image (optional) */
  background: PropTypes.string,
}

TripTile.defaultProps = {
  background: null,
};

export default TripTile;
