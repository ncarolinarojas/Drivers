const { Driver, Team } = require("../db");
const Sequelize = require("sequelize");
const axios = require("axios");

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

const getBddDrivers = async () => {
  const bddDrivers = await Driver.findAll();

  const driversMap = bddDrivers.map((driver) => {
    return {
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      created: true,
    };
  });

  return driversMap;
};

const getBddDriverById = async (id) => {
  const bddDriver = await Driver.findByPk(id, {
    include: [
      {
        model: Team,
        attributes: ["name"],
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
    teams: bddDriver.Teams.map((team) => team.teamName).join(", "),
    created: true,
  };
};

const getAllDrivers = async () => {
  const bddDrivers = await getBddDrivers();

  let apiDriversRow = await getAllApiDrivers();

  const apiDrivers = cleanArray(apiDriversRow);

  return [...bddDrivers, ...apiDrivers];
};

const getDriverById = async (source, id) => {
  const driver =
    source === "bdd"
      ? getBddDriverById(id)
      : (await axios.get(`http://localhost:5000/drivers/${id}`)).data;

  if (!driver) throw new Error("El driver no existe");
  return driver;
};

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

const createDriver = async (
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teamName
) => {
  const newDriver = await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  teamName.forEach(async (t) => {
    let teamsDB = await Team.findAll({ where: { teamName: t } });
    await newDriver.addTeams(teamsDB);
  });

  return newDriver;
};

module.exports = {
  getAllDrivers,
  getDriverByName,
  getDriverById,
  createDriver,
};