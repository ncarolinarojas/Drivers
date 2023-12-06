const { Driver } = require('../db')

const getDrivers = () => {
    const driversFound = Driver.findAll()
    return driversFound
}

module.exports = {
    getDrivers
}