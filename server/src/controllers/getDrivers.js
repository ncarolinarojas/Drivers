const { Driver } = require('../db')
const axios = require('axios')

const getAllApiDrivers = async () => {
    let drivers = [];

    let response = (await axios.get("http://localhost:5000/drivers")).data;

    drivers.push(response);

    const finalResult = [].concat.apply([], drivers);
    return finalResult;
};

const cleanArray = (arr) => {
    const clean = arr.map((elem) => {
        return {
            id: elem.id,
            forename: elem?.name?.forename,
            surname: elem?.name?.surname,
            description: elem?.description,
            image: elem?.image?.url,
            nationality: elem?.nationality,
            dob: elem?.dob,
            teams: elem?.teams,
            created: false,
        };
    });
    return clean;
};

const getDrivers = () => {
    const driversFound = Driver.findAll()
    return driversFound
}



const getAllDrivers = async () => {
    const bddDrivers = await getDrivers();

    let apiDriversRow = await getAllApiDrivers();

    const apiDrivers = cleanArray(apiDriversRow);

    return [...bddDrivers, ...apiDrivers];
};

module.exports = {
    getAllDrivers, 
    getAllApiDrivers,
    cleanArray
}