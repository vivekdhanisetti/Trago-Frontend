const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bus = sequelize.define('Bus', {
  busId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  routeId: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lng: {
    type: DataTypes.FLOAT,
  },
  speed: {
    type: DataTypes.FLOAT,
  },
  heading: {
    type: DataTypes.FLOAT,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Bus;
