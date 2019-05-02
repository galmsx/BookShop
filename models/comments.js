"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Comments.associate = function(models) {

    
  };
  return Comments;
};