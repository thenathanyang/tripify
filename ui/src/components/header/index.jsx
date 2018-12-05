import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Icon from 'components/icon';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  getMenu = () => {
    return (
      <div className="header">
        <Link to="/trips" className="no-style"><div className="name">Tripify</div></Link>
        <div className="nav-icons">
          <NavLink to="/trips" activeClassName="icon-selected" className="no-style">
            <Icon icon="home" color="white" className="icon" />
          </NavLink>
          <NavLink to="/events" activeClassName="icon-selected" className="no-style">
            <Icon icon="compass" color="white" className="icon" />
          </NavLink>
          <NavLink to="/user" activeClassName="icon-selected" className="no-style">
            <Icon icon="user" color="white" className="icon" />
          </NavLink>
        </div>
      </div>
    );
  }

  render() {
    return this.getMenu();
  }
}

export default Header;
