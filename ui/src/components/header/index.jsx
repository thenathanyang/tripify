import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to="/" className="link"><div className="name">Tripify</div></Link>
        <div className="nav-icons">
          <Link to="/" className="link">
            <Icon icon="home" color="white" className="icon" />
          </Link>
          <Link to="/events" className="link">
            <Icon icon="compass" color="white" className="icon" />
          </Link>
          <Link to="/user" className="link">
            <Icon icon="user" color="white" className="icon" />
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return this.getMenu();
  }
}

export default Header;
