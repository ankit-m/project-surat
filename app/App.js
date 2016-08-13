import React, { Component } from 'react';
import Header from './components/Header.js';
import NewBlob from './components/NewBlob';
import BlobList from './components/BlobList';
import './assets/css/bootstrap.min.css';
import * as core from './core/NodeFunctions';

window.core = core;

export default class App extends Component {
  foo() {
    // foo
  }
  addBlob() {
  }
  render() {
    return (
      <div>
        <Header location="Surat" />
        <div className="container">
          <BlobList />
        </div>
      </div>
    );
  }
}
