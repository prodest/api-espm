module.exports = app => {

    const aboutController = require( '../controllers/aboutController' )();

    app.get( '/about/team', aboutController.getTeam );

    return app;
};
