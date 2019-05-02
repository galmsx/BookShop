"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
      },
      descr : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue : ""
      }
    },
    {}
  );
  Book.associate = function(models) {
     Book.hasMany(models.Comments);
     Book.hasMany(models.Purchases);
     Book.belongsToMany(models.Genre,{through: "b_g"});
     Book.belongsToMany(models.Author,{through: "b_a"});
  };
  return Book;
};