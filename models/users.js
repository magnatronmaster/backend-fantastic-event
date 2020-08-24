module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id_user: {
      type: type.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    email_user: {
      type: type.STRING(100),
      allowNull: false,
    },
    password_user: {
      type: type.STRING(200),
      allowNull: false,
    },
  });
};
