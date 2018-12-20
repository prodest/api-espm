const membersUri = process.env.MEMBERS_URI || 'https://api.github.com/teams/1973692/members';
const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN || '';

module.exports = {
    espmTeamMembers: membersUri + '?access_token=' + githubAccessToken
};
