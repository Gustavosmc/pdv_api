'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      variable_price: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      stock: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      tenant_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: 'Tenants',
          key: 'id'
        }
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
    return queryInterface.dropTable('Products');
  }
};