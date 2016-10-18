module.exports = app => {

    const dataController = require( '../controllers/dataController' )();

    app.post( '/data/favoriteBusLines', dataController.saveFavoriteBusLines );
    app.get( '/data/favoriteBusLines', dataController.getFavoriteBusLines );
    app.post( '/ceturb/data/favorite', dataController.saveFavoriteBusLines );
    app.get( '/ceturb/data/favorite', dataController.getFavoriteBusLines );

    app.post( '/data/settings', dataController.saveSettings );
    app.get( '/data/settings', dataController.getSettings );

    app.post( '/data/vehicles', dataController.saveVehicles );
    app.get( '/data/vehicles', dataController.getVehicles );
    app.post( '/detran/data/vehicles', dataController.saveVehicles );
    app.get( '/detran/data/vehicles', dataController.getVehicles );

    return app;
};
