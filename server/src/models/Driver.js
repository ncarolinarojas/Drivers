const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => {
        // Genera un ID único que comienza con 'dri' y tiene un número incrementado automáticamente
        return `dri${Math.floor(1 + Math.random() * 900000)}`;
      }},
    forename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacionality: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    birth: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};