const { Driver } = require('../db');

const postDriver = async (forename, surname, description, image, nacionality, birth, teams) => {
    if (forename && surname && description && image && nacionality && birth && teams) {
        // Verifica si una actividad con el mismo nombre ya existe
        let existingDriver = await Activity.findOne({
            where: { forename },
        });

        if (existingDriver) {
            return existingDriver;
        }

        const newDriver = await Driver.create({
            forename, 
            surname, 
            description, 
            image, 
            nacionality, 
            birth, 
            teams
        });

        await newDriver.addTeams(teams);

        return newDriver;
    } else {
        throw new Error('Missing information');
    }
};

module.exports = {
    postDriver,
};