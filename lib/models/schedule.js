const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const Schedule = sequelize.define('Schedule', {
  id_schedule: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title_schedule: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description_schedule: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  datetime_start_schedule: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  datetime_end_schedule: {
    type: DataTypes.DATE,
  },
  id_event: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  id_speaker: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Schedule;
