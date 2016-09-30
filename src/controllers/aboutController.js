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

    let lista = [
        { nome: 'Baiano', idade: 33 }
    ];

    aboutController.getTesteCache = ( req, res ) => {

        let ret = lista;
        for ( let i = 0; i < ( new Date().getSeconds() / 5 ); i++ ) {
            ret = ret.concat( lista );
        }

        return res.json( ret );
    };

    return aboutController;
};
