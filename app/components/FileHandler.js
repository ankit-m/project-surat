import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { ProgressBar } from 'react-bootstrap';

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
    saveNode: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.storageRef = firebase.storage().ref();
    this.state = {
      isRunning: false,
      progress: 0,
    };
  }
  onDrop = (files) => {
    console.log(files[0]);
    const uploadTask = firebase.storage().ref().child(`main/${files[0].name}`).put(files[0]);
    uploadTask.on('state_changed', // or 'state_changed'
        (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = parseFloat(progress.toPrecision(2));
          this.setState({ isRunning: true, progress });
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
          this.setState({ isRunning: false });
          const downloadURL = uploadTask.snapshot.downloadURL;
          const data = {
            name: files[0].name,
            type: 'file',
            content: downloadURL,
          };
          const coords = this.props.location.coords;
          this.props.saveNode({
            data,
            range: null,
            password: null,
            expiry: null,
            coords,
            owner: 'Anonymous',
            isProtected: false,
          });
        });
  }
  render() {
    const display = (this.state.isRunning ? (<div> <p> Uploading... </p> <br/><ProgressBar striped now={this.state.progress} /></div>) : (<Dropzone ref="dropzone" onDrop={this.onDrop}>
      <div>Try dropping a file here, or click to upload.</div>
    </Dropzone>)
  );
    return (<div>
      { display }
    </div>
    );
  }
}
