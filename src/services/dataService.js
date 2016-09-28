const configRethinkDB = require( '../config/rethinkdb' );
const thinky = require( 'thinky' )( configRethinkDB );
const type = thinky.type;

const FavoriteBusLines = thinky.createModel( 'favoriteBusLines', { id: type.number() } );
const Settings = thinky.createModel( 'settings', { id: type.number() } );
const Vehicles = thinky.createModel( 'vehicles', { id: type.number() } );

module.exports = () => {
    const dataService = new Object();

    /**
     * Generic save method
     *
     * @param {any} Model Rethink model
     * @param {any} data Object to be saved
     * @returns {any} Save result
     */
    function save( Model, data ) {
        data.id = data.userId;
        delete data.userId;

        return Model.filter( { id: data.id } ).count().execute()
        .then( count => {
            if ( count !== 0 ) {
                return Model.get( data.id ).replace( data ).execute();
            } else {
                const obj = new Model( data );
                return obj.save();
            }
        } );
    }

    // FavoriteBusLines
    dataService.saveFavoriteBusLines = function( data ) {
        return save( FavoriteBusLines, data );
    };

    dataService.getFavoriteBusLines = function( userId ) {
        return FavoriteBusLines.get( userId ).run();
    };

    // Settings
    dataService.saveSettings = function( data ) {
        return save( Settings, data );
    };

    dataService.getSettings = function( userId ) {
        return Settings.get( userId ).run();
    };

    // Vehicles
    dataService.saveVehicles = function( data ) {
        return save( Vehicles, data );
    };

    dataService.getVehicles = function( userId ) {
        return Vehicles.get( userId ).run();
    };

    return dataService;
};
