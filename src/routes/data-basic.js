const config = require( '../config/app' );

const verifyBasicAuthentication = ( req, res, next ) => {
    const authorizationHeader = req.get( 'Authorization' );
    if ( !authorizationHeader || authorizationHeader !== config.apiAccessToken ) {
        res.statusCode = 401;
        res.send( 'Access denied' );
    } else {
        next();
    }
};

module.exports = app => {

    const dataController = require( '../controllers/dataController' )();

    app.get( '/sep/data/favorite/:number/users', verifyBasicAuthentication, dataController.getUsersByFavoriteSepProtocol );

    app.get( '/detran/data/vehicles/:plate/users', verifyBasicAuthentication, dataController.getUsersByVehiclePlate );

    return app;
};
