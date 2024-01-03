const { Driver, Team } = require('../db');
const axios = require('axios');

const getBddDriverById = async (id) => {
    const bddDriver = await Driver.findByPk(id, {
        include: [
            {
                model: Team,
                attributes: ["teamName"],
                through: { attributes: [] },
            },
        ],
    });

    return {
        id: bddDriver.id,
        forename: bddDriver.forename,
        surname: bddDriver.surname,
        description: bddDriver.description,
        image: bddDriver.image,
        nationality: bddDriver.nationality,
        dob: bddDriver.dob,
        teams: bddDriver.Teams.map((team) => team.teamName).join(", ")
    };
};

const getDriverById = async (source, id) => {
    const driver =
        source === "bdd"
            ? await getBddDriverById(id)
            : (await axios.get(`http://localhost:5000/drivers/${id}`)).data;

    if (!driver) throw new Error("El driver no existe");
    return driver;
};

module.exports = {
    getDriverById
};
