const apicache = require( 'apicache' ).options( { debug: false } ).middleware;

module.exports = app => {

    const aboutController = require( '../controllers/aboutController' )();

    app.get( '/about/team', apicache( '6 hours' ), aboutController.getTeam );

    app.get( '/about/testeCache', aboutController.getTesteCache );
};
