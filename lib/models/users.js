const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const Event = require('./events');
const UserEvent = require('./usersevents');

const User = sequelize.define('users', {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  },
  email_user: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password_user: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

// User.belongsToMany(Event, {
//   through: UserEvent,
//   unique: false,
//   foreignKey: 'id_event',
// });

module.exports = User;
