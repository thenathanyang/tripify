import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  render() {
    return (
      <div className='image'>
        <img src={this.props.src} title={this.props.title} height={this.props.height} width={this.props.width} />
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

export default Image;
