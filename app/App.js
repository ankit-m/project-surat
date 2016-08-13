import React, { Component } from 'react';
import Blob from './components/Blob.js';
import Header from './components/Header.js';
import NewBlob from './components/NewBlob';
import BlobLoader from './components/BlobLoader';
import './assets/css/bootstrap.min.css';
import * as core from './core/NodeFunctions';

window.core = core;

export default class App extends Component {
  foo() {
    // foo
  }
  render() {
    return (
      <div>
        <Header location="Surat" />
        <div className="container">
          <Blob />
          <NewBlob />
        </div>
      </div>
    );
  }
}
