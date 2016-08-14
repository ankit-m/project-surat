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

const Header = (props) => {
  if (!props.location || props.location.coords === null) {
    return (
      <div style={headerStyle} className="clearfix">
        <b style={titleStyle}>{props.place}</b>
        <Button style={toggleMapStyle}>
          <span className="glyphicon glyphicon-menu-hamburger" />
        </Button>
      </div>
    );
  }
  return (
    <div style={headerStyle} className="clearfix">
      <b style={titleStyle}>{props.place} | {props.location.coords[0]} , {props.location.coords[1]}</b>
      <Button style={toggleMapStyle}>
        <span className="glyphicon glyphicon-menu-hamburger" />
      </Button>
    </div>
  );
};

Header.propTypes = {
  place: React.PropTypes.string,
  location: React.PropTypes.array,
};

export default Header;
