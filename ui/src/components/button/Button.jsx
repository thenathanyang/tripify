import React from 'react';

export default class Button extends React.Component {
    render() {
        return (
        <button 
            style = {{backgroundColor:this.props.color, width: this.props.width}}
            onClick = {() => this.props.onClick()}
        >
            {this.props.label}
        </button>
        );
      }
}
