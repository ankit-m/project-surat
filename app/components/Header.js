import React from 'react';
import { Button } from 'react-bootstrap';

const headerStyle = {
  position: 'relative',
  padding: '10px',
  borderBottom: '1px solid',
  borderColor: 'grey',
};

const toggleMapStyle = {
  float: 'right',
};

const Header = (props) => (
  <div style={headerStyle} className="clearfix">
    <span>{props.location}</span>
    <Button style={toggleMapStyle}>
      <span className="glyphicon glyphicon-menu-hamburger" />
    </Button>
  </div>
);

Header.propTypes = {
  location: React.PropTypes.string.isRequired,
};

export default Header;
