import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

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
    this.storageRef = firebase.storage().ref();
  }
  onDrop = (files) => {
    const uploadTask = firebase.storage().ref().child(`main/${files[0].name}`).put(files[0]);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED).then( // or 'state_changed'
        (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }, () => {
      // Upload successful
      const downloadURL = uploadTask.snapshot.downloadURL;
      const data = {
        type: 'file',
        content: downloadURL,
      };
      const coords = this.props.locations.coords;
      this.props.saveNode({
        data,
        range: null,
        password: null,
        expiry: null,
        coords,
        owner: 'Anonymous',
        isProtected: false,
      });
    }
      );
  }
  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
          <div>Try dropping a file here, or click to upload.</div>
        </Dropzone>
      </div>
    );
  }
}
