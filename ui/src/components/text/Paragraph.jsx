import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Paragraph component used for bodies of text
 */
class Paragraph extends React.Component {
  render() {
    return <p>{this.props.text}</p>;
  }
}

Paragraph.propTypes = {
  /** The text to display in the paragraph */
  text: PropTypes.string.isRequired,
};

export default Paragraph;
