module.exports = app => {

    const dataController = require( '../controllers/dataController' )();

    app.post( '/data/favoriteBusLines', dataController.saveFavoriteBusLines );
    app.get( '/data/favoriteBusLines', dataController.getFavoriteBusLines );

    app.post( '/data/settings', dataController.saveSettings );
    app.get( '/data/settings', dataController.getSettings );

    app.post( '/data/vehicles', dataController.saveVehicles );
    app.get( '/data/vehicles', dataController.getVehicles );

    return app;
};
