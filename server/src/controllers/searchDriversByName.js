const { Driver, Teams } = require('../db');
const { Op } = require('sequelize');

const searchDriversByName = async (queryName) => {
    try {
        const drivers = await Driver.findAll({
            where: {
                forename: {
                    [Op.iLike]: `%${queryName}%` // Búsqueda case-insensitive
                }
            },
            include: [
                {
                    model: Teams,
                    through: 'driver_teams',
                    attributes: ['id', 'name']
                }
            ],
            limit: 15
        });

        if (drivers.length === 0) {
            throw new Error('No se encontraron drivers con ese nombre.');
        }

        return drivers;
    } catch (error) {
        throw new Error(`Error in searchDriversByName: ${error.message}`);
    }
};

module.exports = {
    searchDriversByName
};
