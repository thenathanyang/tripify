import React from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils';

/**
 * A general FontAwesome Icon component. FontAwesome has two types
 * of icons (for free): solid and brand icons. If neither solid nor
 * brands is specified as a prop, solid is assumed. Otherwise, brands
 * takes precedence
 *  
 * Example:
 *  <Icon
 *    solid
 *    brands
 *    className="optional class name"
 *    color="optional color class (see style.scss)"
 *    icon="FontAwesome icon ID (without the fa- prefix)"
 *    id="optional id"
 *  />
 */
class Icon extends React.Component {
  /**
   * Handle the click functionality on the icon
   * 
   * @param icon The icon that is handling the click
   */
  handleClick = icon => this.props.onClick(this.props.className, icon);

  render() {
    const { brands, className, id, color, icon, solid } = this.props;
    const classes = {
      fas: solid && !brands,
      fab: brands,
      [`${className}`]: !!className,
      [`${color}`]: true,
      [`fa-${icon}`]: true,
    };
    return <span id={id} className={classnames(classes)} onClick={this.handleClick}/>;
  }
}

Icon.propTypes = {
  /** Whether the icon is a FontAwesome brand icon */
  brands: PropTypes.bool,
  /** Optional class name for the icon */
  className: PropTypes.string,
  /** Optional color class name (see icon style.scss) */
  color: PropTypes.string,
  /** FontAwesome icon ID (without the fa- prefix) */
  icon: PropTypes.string.isRequired,
  /** Optional element ID */
  id: PropTypes.string,
  /** Whether the icon is a FontAwesome solid style icon (default) */
  solid: PropTypes.bool,
  /** The click handler for the icon */
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  brands: false,
  className: null,
  color: 'black',
  id: null,
  solid: true,
};

export default Icon;