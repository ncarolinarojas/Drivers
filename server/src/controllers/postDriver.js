const {Driver} = require('../db')

const postDriver =  async (forename, surname, description, image, nacionality, birth, teams) => {
    if (forename && surname, description, image, nacionality) {
        let existingDrive = Driver.findOne({
            where: {forename}
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
        })

        await newDriver.addTeams(teams)

        return newDriver
    } else {
        throw new Error('missing information')
    }
}

module.exports = {
    postDriver
}