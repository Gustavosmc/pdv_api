'use strict';
const randomstring = require('randomstring')
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    current_update: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    user_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 9999
    },
    tenant_code: {
      type: DataTypes.STRING(10),
      unique: true
    },
    contract_expires: {
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {});

  Tenant.beforeCreate((instance, options) => {
      instance.tenant_code = randomstring.generate(10)
  })

  return Tenant;
};