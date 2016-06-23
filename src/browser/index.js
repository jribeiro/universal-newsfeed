
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './app/App.js';
import app from '../common/app/reducer';
import thunk from 'redux-thunk';
import { toImmutable } from '../common/newsfeed/service';

const rootElement = document.getElementById('app');

/** create store with the state rendered on the server. */
const store = createStore(
    app,
    toImmutable(window.__INITIAL_STATE__),
    applyMiddleware(thunk)
);

/**
 * Starts the browser application
 */
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);
