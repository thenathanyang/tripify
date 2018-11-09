import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/icon/index';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  getMenu = () => {
    const icon = this.state.open ? "times" : "bars";
    const iconClass = this.state.open ? "icon icon-selected" : "icon";
    const overlayClass = this.state.open ? "dropdown-overlay showing" : "dropdown-overlay";
    const dropdownClass = this.state.open ? "dropdown-menu showing" : "dropdown-menu";
    return (
      <div className="header">
        Tripify
        <Icon className={iconClass} color="white" icon={icon} onClick={this.handleClick}/>
        <div className={overlayClass}></div>
        <div className={dropdownClass}>
          <Link to="/" className="link">
            <div className="item">
              <Icon icon="map-marked-alt" color="blue" className="nav-icon" />
              VIEW TRIPS
            </div>
          </Link>
          <div className="item">
            <Icon icon="calendar-alt" color="blue" className="nav-icon" />
            VIEW EVENTS
          </div>
        </div>
      </div>
    );
  }

  handleClick = () => this.setState(prev => ({open: !prev.open}));

  render() {
    return this.getMenu();
  }
}

export default Header;
