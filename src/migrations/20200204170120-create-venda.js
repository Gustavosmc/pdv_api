'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desconto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      tipo_pagamento: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      valor_credito: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      valor_debito: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      valor_dinheiro: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: 'Usuarios',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vendas');
  }
};