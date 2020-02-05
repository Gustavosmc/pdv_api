'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      foto: {
        type: Sequelize.STRING(140),
      },
      preco_variavel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tipo: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      estoque: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.TINYINT,
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
    return queryInterface.dropTable('Produtos');
  }
};