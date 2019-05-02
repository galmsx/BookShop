"use strict";
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "Author",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Author.associate = function(models) {
    Author.belongsToMany(models.Book, { through: "b_a" });
  };
  return Author;
};
