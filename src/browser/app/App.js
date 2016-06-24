
import React from 'react';
import Newsfeed from '../newsfeed/Newsfeed';

console.info(process.env.BROWSER)

if (process.env.BROWSER) {
    require('./skeleton.css');
    require('./app.css');
}

/**
 * Renders the application
 * @constructor
 */
const App = () => (
    <div className="container">
        <Newsfeed />
    </div>
);

export default App;
