import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import logo from '../../images/skiddle-logo-white-landscape.png';
import './Header.scss';

const Header = ({ location }) => {
  // Don't show the navbar if on the search page
  if (location.pathname === '/' || location.pathname === '/search') {
    return null;
  }
  return (
    <Navbar expand="md" collapseOnSelect onToggle={() => null} className="navbar">
      <Navbar.Brand
        as={() => (
          <Link to="/" className="nav-link navbar__link">
            <img src={logo} alt="Skiddle Logo" className="navbar__logo" />
          </Link>
        )}
      />
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <NavItem>
            <Link to="/search" className="nav-link navbar__link">
              Search
            </Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Header);
