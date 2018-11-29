import React from 'react';

import Notification from '../components/notification/Notification';

export default (ComposedComponent) => {
  class AddNotification extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        display: false,
        message: '',
        icon: '',
        success: true,
      }; 
    }

    displayNotification = (message, icon, success = true) => {
      this.setState({ 
        display: true,
        message: message,
        icon: icon,
        success: true,
      });
      setTimeout(() => {
        this.setState({display: false})}, 2800);
    }

    render() {
      return (
        <>
          {this.state.display && <Notification name="notification" popupText={this.state.message} icon={this.state.icon} success={this.state.success}/>}
          <ComposedComponent {...this.props} displayNotification={this.displayNotification} />
        </>
      );
    }
  }

  return AddNotification;
}