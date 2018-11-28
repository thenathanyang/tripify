import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Subheading component used for bodies of text
 */
class Subheading extends React.Component {
  render() {
    return <h2>{this.props.text}</h2>;
  }
}

Subheading.propTypes = {
  /** The text to display in the subheading */
  text: PropTypes.string,
};

Subheading.defaultProps = {
  text: '',
};

export default Subheading;
