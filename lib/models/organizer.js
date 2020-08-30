const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const Organizer = sequelize.define(
  'organizer',
  {
    id_organizer: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email_organizer: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Organizer;
