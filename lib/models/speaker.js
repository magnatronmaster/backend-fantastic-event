const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const Schedule = require('./schedule');

const Speaker = sequelize.define(
  'Speaker',
  {
    // Model attributes are defined here
    id_speaker: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name_speaker: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    biografhy_speaker: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    role_speaker: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    twitter_speaker: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    photo_speaker: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    id_event: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Speaker.hasMany(Schedule, {
  foreignKey: 'id_speaker',
  sourceKey: 'id_speaker',
});

module.exports = Speaker;
