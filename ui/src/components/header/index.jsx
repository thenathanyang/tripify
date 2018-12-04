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
        <Link className="no-style" to="/"><div className="name">Tripify</div></Link>
        <div className="nav-icons">
          <Link to="/" className="no-style">
            <Icon icon="home" color="white" className="icon" />
          </Link>
          <Link to="/events" className="no-style">
            <Icon icon="compass" color="white" className="icon" />
          </Link>
          <Link to="/user" className="no-style">
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
