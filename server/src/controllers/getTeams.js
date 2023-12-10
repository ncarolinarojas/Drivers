const { Team } = require('../db')

const getTeams = () => {
    const teamsFound = Team.findAll()
    return teamsFound
}

module.exports = {
    getTeams
}