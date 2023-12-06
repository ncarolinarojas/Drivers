const axios = require('axios');
const { Driver } = require('../db');
const path = require('path')

const migrationData = async () => {
    try {
        const dataInDB = await Driver.count();

        if (!dataInDB) {
            const apiResponse = await axios.get("http://localhost:5000/drivers")
            const allApiDrivers = apiResponse.data.map((api) => {
                return {
                    id: api.id + '_new',
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
                    console.log('There is a problem')
                }
            }
        }
    } catch (err) {
        console.error("Error fetching or processing data:", err.message);
        return err
    }
}


module.exports = {
    migrationData
}