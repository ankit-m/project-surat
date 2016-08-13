import React from 'react';
import render from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reduxLogger from 'redux-logger';

import App from './App';
import reducer from './redux/reducers';

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = reduxLogger();
  middleware = [...middleware, loggerMiddleware];
}

const store = createStore(
  combineReducers({
    reducer,
  }), undefined,
  compose(
    applyMiddleware(
      ...middleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
