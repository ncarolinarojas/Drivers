const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { migrationData } = require('./src/controllers/migrationData.js')

conn.sync({ force: false }).then(async () => {
  await migrationData()
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
