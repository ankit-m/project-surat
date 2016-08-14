import React from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { SLIDER_MAX, SLIDER_MIN, SLIDER_STEP } from '../Const';

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

const pullRight = {
  float: 'right',
  margin: 0,
  display: 'block',
};

const titleStyle = {
  fontSize: '22px',
};

@connect(mapStatetoProps, mapDispatchToProps)
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({ sliderValue: e.target.value });
  }
  render() {
    if (!this.props.location || this.props.location.coords === null) {
      return (
        <div style={headerStyle} className="clearfix">
          <b style={titleStyle}>{this.props.place}</b>
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
        <div style={pullRight}>
          <h6> Set Range! <span style= {{ backgroundColor: '#D3D3D3', borderRadius:'10px', padding: '5px' }}>{this.state.sliderValue}</span></h6>
          <input
            type="range"
            value={this.state.sliderValue}
            onChange={this.handleChange}
            step={SLIDER_STEP}
            max={SLIDER_MAX}
            min={SLIDER_MIN}
          />
        </div>
      </div>
      );
  }
}

Header.propTypes = {
  place: React.PropTypes.string,
  location: React.PropTypes.array,
};

export default Header;
