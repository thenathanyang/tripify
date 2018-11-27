import React from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils';

export default class Tab extends React.Component {
  render() {
    const classes = classnames({
      tab: true,
      selected: this.props.selected
    });
    return (
      <div
        className={classes}
        onClick={this.props.onClick}
      >
        {this.props.name}
      </div>
    )
  }
}
