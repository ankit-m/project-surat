import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


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

@connect(mapStatetoProps, mapDispatchToProps)
class Header extends React.Component {
  render() {
    if (!this.props.location || this.props.location.coords === null) {
      return (
        <div style={headerStyle} className="clearfix">
          <b style={titleStyle}>{this.props.place}</b>
          <Button style={toggleMapStyle}>
            <span className="glyphicon glyphicon-menu-hamburger" />
          </Button>
        </div>
      );
    }
    return (
      <div style={headerStyle} className="clearfix">
        <b style={titleStyle}>{this.props.place}</b>
        <small className="text-muted">
          {'  ('}
          {this.props.location.coords[0].toPrecision(3)},
          {' '}
          {this.props.location.coords[1].toPrecision(3)}
          {')'}
        </small>
        <Button style={toggleMapStyle}>
          <span className="glyphicon glyphicon-menu-hamburger" />
        </Button>
      </div>
    );
  }
}

Header.propTypes = {
  place: React.PropTypes.string,
  location: React.PropTypes.array,
};

export default Header;
