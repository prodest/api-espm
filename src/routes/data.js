module.exports = app => {

    const dataController = require( '../controllers/dataController' )();

    app.post( '/data/favoriteBusLines', dataController.saveFavoriteBusLines );
    app.get( '/data/favoriteBusLines', dataController.getFavoriteBusLines );

    app.post( '/data/settings', dataController.saveVehicles );
    app.get( '/data/settings', dataController.getVehicles );

    app.post( '/data/vehicles', dataController.saveSettings );
    app.get( '/data/vehicles', dataController.getSettings );

    return app;
};
