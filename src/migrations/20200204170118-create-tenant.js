'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tenants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      current_update: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      user_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 9999
      },
      tenant_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      contract_expires: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: ""
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tenants');
  }
};