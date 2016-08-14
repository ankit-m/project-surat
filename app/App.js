import React from 'react';
import Header from './components/Header.js';
import NewBlob from './components/NewBlob';
import BlobList from './components/BlobList';
import Navigator from './components/Navigator';
import Map from './components/Map';
import './assets/css/bootstrap.min.css';
import File from './components/FileHandler';

export default () => (
  <div>
    <Header place="Project Surat" />
    <Navigator />
    <div className="clearfix">
      <div className="col-md-6" style={{ padding: '0' }}>
        <Map />
      </div>
      <div className="col-md-6" style={{ padding: '0 10px' }}>
        <BlobList />
        <NewBlob />
        <File />
      </div>
    </div>
  </div>
);
