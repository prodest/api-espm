const request = require( 'request-promise' );
const github = require( '../config/github' );

module.exports = () => {
    var aboutController = new Object();

    aboutController.getTeam = ( req, res, next ) => {

        const options = {
            uri: github.espmTeamMembers,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'api-espm'
            },
            json: true
        };

        return request( options )
        .then( response => {
            return res.json( response );
        } )
        .catch( err => next( err ) );
    };

    return aboutController;
};
