const configRethinkDB = require( '../config/rethinkdb' );
const thinky = require( 'thinky' )( configRethinkDB );
const r = thinky.r;
const type = thinky.type;

const FavoriteBusLines = baseModel( 'favoriteBusLines' );
const Settings = baseModel( 'settings' );
const Vehicles = baseModel( 'vehicles' );

/**
 * Creates the base model for a table
 *
 * @param {any} tableName Name of the table
 * @return {any} Base model
 */
function baseModel( tableName ) {
    thinky.createModel( tableName, {
        id: type.number(),
        date: type.date().default( r.now() )
    } );
}

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

        return Model.get( data.id ).run()
        .then( res => {
            if ( data.date > res.date ) {
                return Model.get( data.id ).replace( data ).execute();
            } else {
                return res;
            }
        } )
        .catch( err => {
            if ( err.name === 'DocumentNotFoundError' ) {
                const obj = new Model( data );
                return obj.save();
            } else {
                throw err;
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
