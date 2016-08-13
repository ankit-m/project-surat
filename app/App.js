import React, { Component } from 'react';
import Blob from './components/Blob.js';
import Header from './components/Header.js';
import NewBlob from './components/NewBlob';
import './assets/css/bootstrap.min.css';

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
