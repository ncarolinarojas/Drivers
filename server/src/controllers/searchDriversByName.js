const { Driver } = require('../db')
const Sequelize = require("sequelize")
const {getAllApiDrivers, cleanArray} = require('../controllers/getDrivers')

const getDriverByName = async (forename) => {
    const bddDrivers = await Driver.findAll({
      where: {
        forename: {
          [Sequelize.Op.iLike]: `%${forename}%`,
        },
      },
      limit: 15,
    });
  
    let apiDriversRow = await getAllApiDrivers();
  
    const apiDrivers = cleanArray(apiDriversRow);
  
    const filteredApi = apiDrivers.filter((driver) =>
      driver.forename.toLowerCase().includes(forename.toLowerCase())
    );
  
    const remainingSlots = Math.max(0, 15 - bddDrivers.length);
  
    const selectedApiDrivers = filteredApi.slice(0, remainingSlots);
  
    return [...bddDrivers, ...selectedApiDrivers];
  };

module.exports = {
    getDriverByName
}