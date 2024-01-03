const { Router } = require("express");
const {getAllDrivers, getDriverById, getDriverByName} = require('../controllers/driver')
const { postDriver } = require('../controllers/postDriver');
const { getTeams } = require('../controllers/getTeams');

const router = Router();

//Route get drivers
router.get('/drivers', async (req, res) => {
    try {
        await getAllDrivers()
            .then(driver => res.status(200).json(driver))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//Route get drivers by ID, incluye los datos de los teams que están asociados a él y toda la información de él 

router.get('/driver/:idDriver', async (req, res) => {
    const { idDriver } = req.params;
  
    const source = isNaN(idDriver) ? "bdd" : "api";
  
    try {
      const driver = await getDriverById(source, idDriver);
      res.status(200).json(driver);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})

//Route get by name and get the teams too
router.get('/drivers/name', async (req, res) => {
    try {
        const queryName = req.query.name;
        const drivers = await getDriverByName(queryName);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Post drivers
router.post('/postDriver', async (req, res) => {
    try {
        const { forename, surname, description, image, nacionality, birth, teams } = req.body

        const newDriver = await postDriver(
            forename,
            surname,
            description,
            image,
            nacionality,
            birth,
            teams
        )

        res.status(200).json(newDriver)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//get Teams
router.get('/teams', async (req, res) => {
    try {
        await getTeams()
            .then(teams => res.status(200).json(teams))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = router;
