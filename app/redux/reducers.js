import { combineReducers } from 'redux';
import node from './node.reducer';
import location from './location.reducer';

export default combineReducers({ node, location });
