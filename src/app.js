const config = require( './config/app' );

if ( config.env === 'production' ) {
    require( 'newrelic' );
}

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const apiMiddleware = require( 'node-mw-api-prodest' ).middleware;

let app = express();

app.use( apiMiddleware( {
    compress: true,
    cors: true,
    authentication: {
        jwtPublicKey: config.jwtPublicKey
    }
} ) );

app.use( bodyParser() );

// load our routes
require( './routes/about' )( app );
require( './routes/data' )( app );

app.use( apiMiddleware( {
    error: {
        notFound: true,
        debug: config.env === 'development'
    }
} ) );

let pathApp = express();

const path = config.path;
pathApp.use( path, app );

module.exports = pathApp;