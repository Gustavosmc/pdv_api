'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductSales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      description: {
        type: Sequelize.STRING(80),
        allowNull: false,
        defaultValue: ''
      },
      quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
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
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: 'Products',
          key: 'id'
        }
      },
      sale_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: 'Sales',
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
    return queryInterface.dropTable('ProductSales');
  }
};