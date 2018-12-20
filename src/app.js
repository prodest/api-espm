const config = require( './config/app' );
const dotenv = require('dotenv');
dotenv.config();

if ( config.env === 'production' ) {
    require( 'newrelic' );
}

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const apiMiddleware = require( 'node-mw-api-prodest' ).middleware;

let app = express();

// load our routes
app.use( apiMiddleware( {
    compress: true,
    cors: true
} ) );

require( './routes/about' )( app );
require( './routes/data-basic' )( app );

app.use( apiMiddleware( {
    authentication: {
        jwtPublicKey: config.jwtPublicKey
    }
} ) );

app.use( bodyParser() );

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
