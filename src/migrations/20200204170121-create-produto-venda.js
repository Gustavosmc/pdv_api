'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProdutoVendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: 'Produtos',
          key: 'id'
        }
      },
      venda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: 'Vendas',
          key: 'id'
        }
      },
      descricao: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      codigo: {
        type: Sequelize.STRING(140),
        allowNull: false,
        unique: true
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
    return queryInterface.dropTable('ProdutoVendas');
  }
};