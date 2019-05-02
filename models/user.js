"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Purchases);
    User.hasMany(models.Comments);
  };
  return User;
};
