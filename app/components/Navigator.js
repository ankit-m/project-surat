import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import firebase from '../firebase';

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}



@connect(mapStatetoProps, mapDispatchToProps)
export default class Navigator extends React.Component {
  static propTypes = {
    geoSuccess: React.PropTypes.func,
    geoError: React.PropTypes.func,
    getNodes: React.PropTypes.func,
    location: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };
    const geoSuccessCheck = (pos) => {
      const position = {
        coords: {
          latitude: pos.coords.latitude.toPrecision(8),
          longitude: pos.coords.longitude.toPrecision(8),
        },
      };
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      if (props.location.coords &&
          (lat === props.location.coords[0] && long === props.location.coords[1])) {
        return;
      }
      props.geoSuccess(position);
    };
    navigator.geolocation.watchPosition(geoSuccessCheck, props.geoError, geoOptions);
    firebase.database().ref('main').on('child_changed', this.handleSnap);
    firebase.database().ref('main').on('child_added', this.handleSnap);
    firebase.database().ref('main').on('child_removed', this.handleSnap);
  }
  handleSnap = () => {
    console.debug("handling change");
    this.props.getNodes(this.props.location.coords);
  }
  render() {
    return null;
  }
}
