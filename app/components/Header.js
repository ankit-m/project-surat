import React from 'react';
import { Button } from 'react-bootstrap';

const headerStyle = {
  position: 'relative',
  padding: '10px',
  borderBottom: '1px solid',
  borderColor: '#f0f0f0',
  paddingLeft: '20px',
};

const toggleMapStyle = {
  float: 'right',
};

const titleStyle = {
  fontSize: '22px',
};

const Header = (props) => (
  <div style={headerStyle} className="clearfix">
    <b style={titleStyle}>{props.location}</b>
    <Button style={toggleMapStyle}>
      <span className="glyphicon glyphicon-menu-hamburger" />
    </Button>
  </div>
);

Header.propTypes = {
  location: React.PropTypes.string.isRequired,
};

export default Header;
