import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon/index';
import Subheading from 'components/text/Subheading';

import { classnames } from 'utils';
import { history } from 'reducers';

/**
 * Notification is a component that allows a small yellow popup to 
 * appear above the header. 
 * 
 * Example:
 *  <Notification 
 *    name="popup-notification"
 *    popupText="Success!"
 *    icon="check" 
 *    success="true"
 *    transitionTime=2500>
 * 
 */

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
  }

  componentDidMount() {
    this.showPopupTimer = setTimeout(() => {
      this.setState({display: true})}, 200);
    this.hidePopupTimer = setTimeout(() => {
      this.setState({ display: false });
    }, this.props.transitionTime);
  }

  componentWillUnmount() {
    clearInterval(this.showPopupTimer);
    clearInterval(this.hidePopupTimer);    
  }

  closePopup = () => {
    this.setState({ display: false });
    clearInterval(this.hidePopupTimer);
  }
  
  render() {
    const { icon, popupText } = this.props;
    const popupClasses = {
      popup: true,
      showing: this.state.display,
      'popup-success': this.props.success,
    };
    return (
      <div className="fading-popup">
        <div className={classnames(popupClasses)} > 
          { (icon) && <Icon className="popup-icon" icon={icon} /> }
          <Subheading text={popupText} />
          <Icon className="close-popup" icon="times" onClick={this.closePopup}></Icon>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  /** The HTML name for the popup */
  name: PropTypes.string.isRequired,
  /** Text to display on the notification */
  popupText: PropTypes.string,
  /** Icon to display on the notification */
  icon: PropTypes.string, 
  /** Background color for the notification */
  success: PropTypes.bool.isRequired, 
  /** Amount of time to display the popup (in ms) */
  transitionTime: PropTypes.number,
}

Notification.defaultProps = {
  transitionTime: 2500,
  popupText: '',
}

export default Notification;
