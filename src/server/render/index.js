
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import appReducer from '../../common/app/reducer';
import App from '../../browser/app/App';
import thunk from 'redux-thunk';
import { name as appName } from '../../../package.json';

/**
 * Server side Rendering Middleware
 * @returns {String} HTML string
 */
export default function render (data) {
    let store = createStore(appReducer, data, applyMiddleware(thunk));
    let state = store.getState();

    // Render the component to a string
    let app = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${appName}</title>
        </head>
        <body class="">
            <div id="app">${app}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(state)}
            </script>
            <script src="http://localhost:8080/webpack-dev-server.js"></script>
            <script src="http://localhost:8080/assets/bundle.js"></script>
        </body
        `;
}
