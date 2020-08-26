const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');

const Schedule = sequelize.define('Schedule', {
  id_schedule: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title_schedule: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description_shedule: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  datetime_start_shedule: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  datetime_end_shedule: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idEvent: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  idSpeaker: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Schedule;
