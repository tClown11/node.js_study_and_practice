'use strict';
module.exports = (sequelize, DataTypes) => {
  const port = sequelize.define('port', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    content: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    timestamps:false
  });
  port.associate = function(models) {
    // associations can be defined here
  };
  return port;
};