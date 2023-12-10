const { Driver } = require('../db')

const postDriver = async (forename, surname, description, image, nacionality, birth, teams) => {
    try {
        if (forename && surname) {
            let existingDrive = await Driver.findOne({
                where: { forename }
            })

            if (existingDrive) {
                return existingDrive
            }

            const newDriver = await Driver.create({
                forename,
                surname,
                description,
                image,
                nacionality,
                birth
            });

            await newDriver.addTeams(teams)

            return newDriver
        }

    } catch (error) {
        console.error({ error: error.message })
    }
}

module.exports = {
    postDriver
}