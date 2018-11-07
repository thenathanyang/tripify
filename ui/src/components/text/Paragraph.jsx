import React from 'react';

export default class Paragraph extends React.Component {
  render() {
    return <p>{this.props.text}</p>;
  }
}
