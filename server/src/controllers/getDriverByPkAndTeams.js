const { Driver, Team } = require('../db')

const getDriverByPkAndTeams = async (idDriver) => {
    const driverDetail = await Driver.findByPk(idDriver, {
        include: [
            {
                model: Team,
                through: 'driver_teams',
                attributes: ['id', 'name']
            }
        ]
    })

    return driverDetail
}

module.exports = {
    getDriverByPkAndTeams
}