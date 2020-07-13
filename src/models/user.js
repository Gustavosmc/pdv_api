'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    tenant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: DataTypes.VIRTUAL,

  }, {});

  User.associate = function(models) {
       User.hasMany(models.Sale, {as: 'sales', foreignKey: 'id'})
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  User.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  User.validPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
  }

  User.validatePasswordSize = (password) => {
    return password.length >= 8
  }

  User.beforeCreate((instance, options) => {
    if (instance.password && instance.password.length > 8)
      instance.password = User.generateHash(instance.password);
  })
  
  return User;
};