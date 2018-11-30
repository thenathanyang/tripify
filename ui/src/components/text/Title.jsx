import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Paragraph component used for bodies of text
 */
class Title extends React.Component {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}

Title.propTypes = {
  /* The text to display in the subheading */
  text: PropTypes.string,
};

Title.defaultProps = {
  text: '',
};

export default Title;
