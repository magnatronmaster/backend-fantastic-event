const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const Register = sequelize.define(
  'Register',
  {
    // Model attributes are defined here
    id_register: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email_register: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_event: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {}
);

module.exports = Register;
