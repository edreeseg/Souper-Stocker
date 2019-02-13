import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducer from './redux/reducers';
import './index.css';
import App from './App';

ReactDOM.render(
<Provider store={createStore(reducer, applyMiddleware(thunk, logger))}>
  <Router>
    <App />
  </Router>  
</Provider>, document.getElementById('root'));
