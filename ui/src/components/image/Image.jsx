import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  render() {
    return (
      <div>
        <img className='image' src={this.props.src} title={this.props.title} />
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Image.defaultProps = {
  title: "",
}

export default Image;
