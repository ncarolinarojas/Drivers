const axios = require('axios');
const { Driver, Teams } = require('../db');
const path = require('path')

const migrationData = async () => {
    try {
        const dataInDB = await Driver.count();
        const dataTeams = await Teams.count();

        if (!dataInDB) {
            const apiResponse = await axios.get("http://localhost:5000/drivers")
            const allApiDrivers = apiResponse.data.map((api) => {
                return {
                    id: api.id + '_cod',
                    forename: api.name.forename,
                    surname: api.name.surname,
                    description: api.description,
                    image: api.image.url ? api.image.url : path.join(__dirname, 'assets', 'DriverNotFound.png'),
                    nacionality: api.nationality,
                    birth: api.dob ? api.dob : "Unknown"
                }
            })
            for (const driverData of allApiDrivers) {
                try {
                    await Driver.create(driverData)
                    console.log('Data from API charging in data base');
                } catch (err) {
                    console.log('There is a problem', err)
                }
            }
        }

        if (!dataTeams) {
            const apiResponse2 = await axios.get("http://localhost:5000/drivers")
            const allTeams = apiResponse2.data.map((api) => {
                const teamName = api.teams && typeof api.teams === 'string' ? api.teams.split(',')[0] : null;

                return {
                    name: teamName
                }
            });

            for (const teamData of allTeams) {
                try {
                    // Verificar si el equipo ya existe en la base de datos
                    const existingTeam = await Teams.findOne({
                        where: {
                            name: teamData.name
                        }
                    });

                    if (!existingTeam) {
                        await Teams.create(teamData);
                        console.log(`Team '${teamData.name}' added to the database`);
                    } else {
                        console.log(`Team '${teamData.name}' already exists in the database`);
                    }
                } catch (err) {
                    console.log('There is a problem', err)
                }
            }
        }
    } catch (err) {
        console.error("Error fetching or processing data:", err.message);
        return err;
    }
}



module.exports = {
    migrationData
}