"use strict";
module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define(
    "Purchases",
    {
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      mark : {
        type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
          max : 10,
          min : 0
        }
      },
      BookId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true

      },
      UserId :{
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true
      }
    },
    {}
  );
  Purchases.associate = function(models) {
  };
  return Purchases;
};