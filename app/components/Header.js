import React from 'react';
import { Button } from 'react-bootstrap';

const headerStyle = {
  position: 'relative',
  padding: '10px',
  borderBottom: '1px solid',
  borderColor: '#f0f0f0',
};

const toggleMapStyle = {
  float: 'right',
};

const Header = (props) => (
  <div style={headerStyle} className="clearfix">
    <b style={{ fontSize: '22px' }}>{props.location}</b>
    <Button style={toggleMapStyle}>
      <span className="glyphicon glyphicon-menu-hamburger" />
    </Button>
  </div>
);

Header.propTypes = {
  location: React.PropTypes.string.isRequired,
};

export default Header;
