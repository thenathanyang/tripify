import React from 'react';
import { classnames } from 'utils';

class Button extends React.Component {
  render() {
    const classes = {
      'green-button': this.props.green,
      'red-button': this.props.red,
      'blue-button': this.props.blue,
      'gray-button': this.props.gray || this.props.grey,
      'disabled-button': this.props.disabled,
      'small': this.props.small
    };

    return (
      <button
        className={classnames(classes)}
        id={this.props.id}
        disabled={this.props.disabled}
        onClick = {() => this.props.onClick()}
      >
        {this.props.label}
      </button>
    );
  }
}

Button.defaultProps = {
  label: "",
  id: "",
  onClick: () => {},
};

export default Button;
