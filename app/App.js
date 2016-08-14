import React from 'react';
import Header from './components/Header.js';
import NewBlob from './components/NewBlob';
import BlobList from './components/BlobList';
import Navigator from './components/Navigator';
import Map from './components/Map';
import './assets/css/bootstrap.min.css';
// import * as core from './core/NodeFunctions';
// window.core = core;

export default () => (
  <div>
    <Header place="Surat" />
    <Navigator />
    <div className="container">
      <BlobList />
      <NewBlob />
      <Map />
    </div>
  </div>
);
