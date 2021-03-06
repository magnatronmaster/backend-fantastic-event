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
    },
    photo_speaker: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Speaker.hasMany(Schedule, {
  as: 'Shedules',
  foreignKey: 'id_speaker',
  sourceKey: 'id_speaker',
});
Schedule.belongsTo(Speaker, {
  as: 'Speaker',
  foreignKey: 'id_speaker',
  targetKey: 'id_speaker',
});

module.exports = Speaker;
