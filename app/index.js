import './main.css';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
// import component from './component';
const node = document.createElement('div');
node.setAttribute('id', 'node');
document.body.appendChild(node);

render(<App/>, node);
