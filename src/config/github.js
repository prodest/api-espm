const membersUri = process.env.MEMBERS_URI || 'https://api.github.com/teams/1973692/members';
const accessToken = process.env.ACCESS_TOKEN || '';

module.exports = {
    espmTeamMembers: membersUri + '?access_token=' + accessToken
};
