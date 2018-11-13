import React from 'react';
import PropTypes from 'prop-types';

/**
 * The maxmimum height of a tile
 */
const TILE_HEIGHT = 180;

/**
 * BaseTile is the base tile used in all the other specific tiles
 * 
 * @author nkansal96
 * @version 1.0.0
 */
class BaseTile extends React.Component {
  render() {
    const style = {
      width: `${100 * this.props.width}%`,
      height: `${TILE_HEIGHT * this.props.height}px`,
    }
    return (
      <div className="base-tile" style={style}>
        {this.props.children}
      </div>
    )
  }
}

BaseTile.propTypes = {
  /** Width ratios for the base tile */
  width: PropTypes.oneOf([0.5, 0.75, 1.0]),
  /** Height ratios for the base tile */
  height: PropTypes.oneOf([0.5, 1.0]),
};

BaseTile.defaultProps = {
  width: 1.0,
  height: 1.0,
};

export default BaseTile;
