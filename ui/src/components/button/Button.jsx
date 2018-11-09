import React from 'react';
import { classnames } from 'utils';
export default class Button extends React.Component {
    
    render() {
        const classes ={
            'green-button': this.props.green,
            'red-button': this.props.red,
            'blue-button': this.props.blue,
            'grey-button': this.props.grey,
            'disabled-button': this.props.disabled
        };

        return (
        <button 
            className={classnames(classes)}
            disabled={this.props.disabled}
            onClick = {() => this.props.onClick()}
        >
            {this.props.label}
        </button>
        );
      }
}
