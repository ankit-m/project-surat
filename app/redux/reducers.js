import { combineReducers } from 'redux';
import node from './node.reducer';
import firebase from './firebase.reducer'

export default combineReducers({ node, firebase });
