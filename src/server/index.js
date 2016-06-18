
// register babel hooks
require('babel-core/register')();
require("babel-polyfill");

const mascot = require('mascot');
const server = require('./server');

console.log(mascot.space);

if (!process.env.NODE_ENV || !process.env.PORT) {

    throw new Error('Environment variable NODE_ENV and PORT must be set. Please check npm run prod script');
}

server.start();
