const dataService = require( '../services/dataService' );

module.exports = () => {
    const dataController = new Object();

    function save( method, req, res, next ) {

        const data = req.body;
        data.userId = parseInt( req.decodedToken.sub );


        method( req.body )
        .then( result => {
            res.json( result );
        } )
        .catch( err => {
            next( err );
        } );
    }

    function get( method, req, res, next ) {

        method( parseInt( req.decodedToken.sub ) )
        .then( data => {
            res.json( data );
        } )
        .catch( err => {
            next( err );
        } );
    }

    // FavoriteBusLines
    dataController.saveFavoriteBusLines = ( req, res, next ) => {
        save( dataService().saveFavoriteBusLines, req, res, next );
    };

    dataController.getFavoriteBusLines = ( req, res, next ) => {
        get( dataService().getFavoriteBusLines, req, res, next );
    };

    // Settings
    dataController.saveSettings = ( req, res, next ) => {
        save( dataService().saveSettings, req, res, next );
    };

    dataController.getSettings = ( req, res, next ) => {
        get( dataService().getSettings, req, res, next );
    };

    // Vehicles
    dataController.saveVehicles = ( req, res, next ) => {
        save( dataService().saveVehicles, req, res, next );
    };

    dataController.getVehicles = ( req, res, next ) => {
        get( dataService().getVehicles, req, res, next );
    };

    return dataController;
};
