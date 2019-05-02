"use strict";
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Genre.associate = function(models) {
    Genre.belongsToMany(models.Book, { through: "b_g" });
  };
  return Genre;
};
