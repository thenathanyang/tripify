import React from 'react';
import Subheading from '../text/Subheading';
import PropTypes from 'prop-types';

class Section extends React.Component {
  render() {
    return (
      <div className='section'>
        <Subheading className="section-subheading" text={this.props.title} />
        {this.props.children}
      </div>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Section;
