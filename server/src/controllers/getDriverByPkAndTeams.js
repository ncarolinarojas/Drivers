const { Driver, Teams } = require('../db')

const getDriverByPkAndTeams = async (idDriver) => {
    const driverDetail = await Driver.findByPk(idDriver, {
        include: [
            {
                model: Teams,
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